import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import skulpt from 'skulpt'
import EditorOutput from './EditorOutput'
import EditorInput from './EditorInput'
import Tools from './Tools'
import BluebirdPromise from 'bluebird'


import './overrides.css'
import '../common/flex.css'

const defaultOptions = {
  lineNumbers: true
  , lineWrapping: false
  , mode: 'text/x-python'
}

const styles = {
  container: {
    position: 'absolute'
    , bottom: 'calc(20px + 50px)' // leave room for ActionBar
    , right: '0'
    , left: '0'
    , top: '0'
  }
}

const defaultInput = '# Write some code!'

let codeOutput = ''

class CodeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorInput: props.editorInput || defaultInput
      , editorOutput: ''
      , answer: ''
      , prompt: ''
      , rawInputValue: ''
      , rawInputResolve: null
    }
    this.codeMirror = null
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
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.editorInput !== nextProps.editorInput) {
      this.updateInput(nextProps.editorInput)
    }
  }

  async componentWillUpdate(nextProps, nextState) {
    const { afterRunCode } = nextProps
    if(this.state.errorLine) {
      this.codeMirror.removeLineClass((this.state.errorLine - 1), 'wrap', 'errorLine')
    }

    if(nextState.errorLine) {
      this.codeMirror.addLineClass((nextState.errorLine - 1), 'wrap', 'errorLine')
      // when UserLessonWizard sees that there is no codeOutput,
      // it will know to NOT submitCurrentValues for checking
      // correctness, because there was an error.
      if(afterRunCode) afterRunCode('')
    }

    // if runCode prop was turned on, run code, get the new output,
    // and bubble it up to the UserLessonWizard to populate the codeOutput field
    if(!this.props.runCode && nextProps.runCode) {
      await this.runCode()
      const { editorOutput } = this.state
      if(afterRunCode) afterRunCode(editorOutput)
    }
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  getChildRef = (c) => {
    this.inputText = c
  }

  updateInput = (v) => {
    const { onChange } = this.props
    this.setEditorInput(v)
    if(onChange) onChange(v)
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
    if(onChange) onChange(v)

  }

  handleBeforeChange = (v) => {
    this.setState({
      errorMsg: ''
      , errorLine: null
      , tabFocus: 'output'
    })
    this.setEditorInput(v)
  }

  rawInputListener = (e) => {
    const { rawInputResolve } = this.state
    if((e.keyCode || e.which) === 13) {
      const answerArray = e.target.value.split("\n")
      const answer = answerArray[answerArray.length-2]
      this.setState({ prompt: '', rawInputValue: '', rawInputResolve: null })
      this.inputText.blur()
      this.addToOutput(answer + "\n")
      rawInputResolve(answer)
    }
  }

  runCode = () => {
    const { editorInput, editorOutput } = this.state
    return new BluebirdPromise((resolve, reject) => {
      codeOutput = '' // reset each time
      skulpt.canvas = 'mycanvas'
      skulpt.pre = 'output'
      skulpt.configure({
        inputfun: (prompt) => {
          if (prompt) {
            this.addToOutput(`${prompt} `)
          }
          this.setState({editorOutput: codeOutput})
          return new Promise(async (resolve, reject) => {
            this.setState({prompt, rawInputResolve: resolve})
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
        await this.setStateAsync({ editorOutput: codeOutput })
        return resolve()
      }, async (e) => {
        await this.setState({ errorMsg: e.toString(), errorLine: e.traceback[0].lineno, editorOutput: '' })
        return reject()
      })
    })
  }

  handleSave = () => {
    this.props.onSave(this.state.editorInput)
  }

  handleCheckAnswer = async () => {
    await this.runCode()
    const { editorInput, editorOutput } = this.state
    this.props.onCheckAnswer(editorInput, editorOutput)
  }

  render() {
    const { className, options, onSave, includeCheckAnswer = false, showRunButton = true } = this.props
    const { editorOutput, errorMsg, prompt, rawInputValue, editorInput } = this.state

    return (
      <div className={ className } >
        <div className='flex' style={ styles.container }>
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
            setInputRef={ this.getChildRef }
          />
          <Tools
            onSave={ onSave ? this.handleSave : null }
            onRun={ showRunButton ? this.runCode : null }
            onCheckAnswer={ includeCheckAnswer ? this.handleCheckAnswer : null }
          />
        </div>
      </div>
    )
  }
}

export default CodeEditor