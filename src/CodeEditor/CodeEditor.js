import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import update from 'immutability-helper'
import cns from 'classnames'
import skulpt from 'skulpt'
import EditorOutput from './EditorOutput'
import EditorInput from './EditorInput'
import Tools from './Tools'
import BluebirdPromise from 'bluebird'
import find from 'lodash/find'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import withStyles from '@material-ui/core/styles/withStyles'
import { CSSTransition } from 'react-transition-group'
import { offWhite } from '../colors'


import './overrides.css'

const defaultOptions = {
  mode: 'text/x-python',
  lineNumbers: true,
  lineWrapping: false,
  indentUnit: 4
}

const styles = theme => ({
  container: {
    position: 'absolute'
    , bottom: '0'
    , right: '0'
    , left: '0'
    , top: '0'
    , zIndex: 100000
    , overflow: 'hidden'
  },
  hint: {
    overflow: 'scroll',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    zIndex: 100001,
    padding: 20,
    backgroundColor: offWhite,
    borderRadius: 10,
    '& p, strong, b, i, u, span': {
      margin: 0
    }
  },
  x: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 100001
  }
})

const defaultInput = ''

let codeOutput = ''

class CodeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codeIsRunning: false
      , editorInput: props.editorInput || defaultInput
      , editorOutput: ''
      , answer: ''
      , prompt: ''
      , rawInputValue: ''
      , rawInputResolve: null
      , variablesCompleted: []
    }
    this.codeMirror = null
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.editorInput !== nextProps.editorInput) {
      this.updateInput(nextProps.editorInput)
    }
  }

  async UNSAFE_componentWillUpdate(nextProps, nextState) {
    const { afterRunCode } = nextProps
    if (this.state.errorLine) {
      this.codeMirror.removeLineClass((this.state.errorLine - 1), 'wrap', 'errorLine')
    }

    if (nextState.errorLine) {
      this.codeMirror.addLineClass((nextState.errorLine - 1), 'wrap', 'errorLine')
      // when UserLessonWizard sees that there is no codeOutput,
      // it will know to NOT submitCurrentValues for checking
      // correctness, because there was an error.
      if (afterRunCode) afterRunCode(true, null)
    }

    // if runCode prop was turned on, run code, get the new output,
    // and bubble it up to the UserLessonWizard to populate the codeOutput field
    if (!this.props.runCode && nextProps.runCode) {
      await this.runCode()
      const { editorOutput } = this.state
      if (afterRunCode) afterRunCode(null, editorOutput || '')
    }
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  getChildRef = (c) => {
    this.inputText = c
  }

  focusOnInputRef = () => {
    this.inputText.focus()
  }

  updateInput = (v) => {
    const { onChange } = this.props
    this.setEditorInput(v)
    if (onChange) onChange(v)
  }

  setEditorInput = (v) =>
    this.setState({ editorInput: v })

  addToOutput = (text) => {
    codeOutput = codeOutput + text
  }

  builtinRead = (x) => {
    if (skulpt.builtinFiles === undefined || skulpt.builtinFiles["files"][x] === undefined) {
      this.setState({
        errorMsg: 'Something Went Wrong! Please Refresh!',
      })
    }
    return skulpt.builtinFiles["files"][x]
  }

  handleChange = (v) => {
    const { onChange } = this.props
    if (onChange) onChange(v)

  }

  handleBeforeChange = (v) => {
    this.setState({
      errorMsg: ''
      , errorLine: null
      , tabFocus: 'output'
    })
    this.setEditorInput(v)
  }

  rawInputListener = async (e) => {
    const { rawInputResolve } = this.state
    if ((e.keyCode || e.which) === 13) {
      const answerArray = e.target.value.split("\n")
      const answer = answerArray[answerArray.length-2]
      this.setState({ prompt: '', rawInputValue: '', rawInputResolve: null })
      this.inputText.blur()
      this.addToOutput(answer + "\n")
      await this.handleVariableAnswer(answer)
      rawInputResolve(answer)
    }
  }

  handleVariableAnswer = async value => {
    const { variablesCompleted, editorInput } = this.state
    const { setFormGlobalVariable, variableOptions, upsertUserVariable, variablesToComplete = [] } = this.props

    if (!isEmpty(variablesToComplete)) {
      // allows answering multiple times.
      const variablesCompletedLengthMod = variablesCompleted.length % variablesToComplete.length
      // sorts variables by appearance in the editorInput
      const sortedVariablesToComplete = variablesToComplete.sort((a, b) => {
        const aName = get(find(variableOptions, { _id: a.variableId }), 'name', '')
        const bName = get(find(variableOptions, { _id: b.variableId }), 'name', '')
        return editorInput.indexOf(aName) > editorInput.indexOf(bName)
      })
      const { variableId } = sortedVariablesToComplete[variablesCompletedLengthMod]
      const varRef = `variables[${variablesCompletedLengthMod}]`
      setFormGlobalVariable(varRef, {variableId, value})
      await this.addCompletedVariable(variablesCompleted.length, 0, { variableId, value })
      if (upsertUserVariable) upsertUserVariable({variableId, value})
    }
  }

  addCompletedVariable = async (slideIndex, spliceBy, value) => {
    const { variablesCompleted } = this.state
    await this.setState({
      variablesCompleted: update(variablesCompleted, { $splice: [[slideIndex, spliceBy, value]] })
    })
  }

  runCode = () => {
    const { editorInput, editorOutput } = this.state
    return new BluebirdPromise(async (resolve, reject) => {
      await this.setStateAsync({ codeIsRunning: true })
      codeOutput = '' // reset each time
      skulpt.canvas = 'mycanvas'
      skulpt.pre = 'output'
      skulpt.configure({
        inputfun: (prompt) => {
          if (prompt) {
            this.addToOutput(`${prompt} `)
          }
          this.setState({ editorOutput: codeOutput })
          return new Promise(async (resolve, reject) => {
            this.setState({ prompt, rawInputResolve: resolve })
            const elem = this.inputText
            this.inputText.focus()
            // When adding the event listener, to prevent multiple
            // firings, the callback argument below should be done
            // without including any args, which is why we
            // pass the resolve function to state.
            // reference:  https://stackoverflow.com/questions/26146108/addeventlistener-firing-multiple-times-for-the-same-handle-when-passing-in-argum
            elem.addEventListener('keyup', this.rawInputListener, true)
          })
        }
        , inputfunTakesPrompt: true
        , output: this.addToOutput
        , read: this.builtinRead
      })

      const myPromise = skulpt.misceval.asyncToPromise(() => skulpt.importMainWithBody("<stdin>", false, editorInput, true))
      myPromise.then(async () => {
        await this.setStateAsync({ editorOutput: codeOutput, codeIsRunning: false })
        return resolve()
      }, async (e) => {
        await this.setState({
          errorMsg: e.toString(),
          errorLine: e.traceback[0].lineno,
          editorOutput: '',
          codeIsRunning: false
        })
        return reject()
      })
    })
  }

  handleSave = () => {
    this.props.onSave(this.state.editorInput)
  }

  handleCheckAnswer = async () => {
    const { editorInput, editorOutput } = this.state
    this.props.onCheckAnswer(editorInput, editorOutput)
  }

  static propTypes = {
    editorInput: T.string.isRequired
    , options: T.object
    , className: T.string
    , onSave: T.func
    , onChange: T.func
    , runCode: T.bool
    , afterRunCode: T.func
    , showRunButton: T.bool
    , variableOptions: T.array
    , variablesToComplete: T.array
    , setFormGlobalVariable: T.func
    , upsertUserVariable: T.func
    , toggleIsExampleActive: T.func
    , hintHTML: T.string
    , isHintActive: T.bool
    , classes: T.object
    , includeCheckAnswer: T.bool
    , onCheckAnswer: T.func
  }

  render() {
    const { toggleIsExampleActive, hintHTML, isHintActive, className, classes, options, onSave, variablesToComplete, includeCheckAnswer = false, showRunButton = true } = this.props
    const { editorOutput, errorMsg, prompt, rawInputValue, editorInput, codeIsRunning } = this.state
    const showTools = onSave || showRunButton || includeCheckAnswer

    return (
      <div id='codeEditor' className={ className }>
        <div className={ classes.container }>
          <CSSTransition
            in={ hintHTML && isHintActive }
            classNames='slideUp'
            timeout={ 300 }
            mountOnEnter={ true }
            unmountOnExit={ true }
          >
            <div
              className={ classes.hint }
              style={ { visibility: hintHTML && isHintActive ? 'visible' : 'hidden' } }
            >
              <div dangerouslySetInnerHTML={ { __html: hintHTML } } />
              <div className={ cns('x-sm x-black', classes.x) } onClick={ toggleIsExampleActive } />
            </div>
          </CSSTransition>
          <EditorInput
            editorDidMount={ editor => { this.codeMirror = editor } }
            className={ cns('CodeMirrorFull', { 'error': errorMsg }) }
            value={ editorInput }
            onBeforeChange={ (editor, data, value) => {
              this.handleBeforeChange(value)
            } }
            onChange={ (editor, data, value) => {
              this.handleChange(value)
            } }
            options={ options || defaultOptions }
          />
          <EditorOutput
            editorOutput={ editorOutput }
            editorInput={ editorInput }
            errorMsg={ errorMsg }
            prompt={ prompt }
            value={ rawInputValue }
            inputDisabled={ !codeIsRunning }
            setInputRef={ this.getChildRef }
            focusOnInputRef={ this.focusOnInputRef }
            variablesToComplete={ variablesToComplete }
          />
          { showTools &&
            <Tools
              onSave={ onSave ? this.handleSave : null }
              onRun={ showRunButton ? this.runCode : null }
              onCheckAnswer={ includeCheckAnswer ? this.handleCheckAnswer : null }
            />
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CodeEditor)
