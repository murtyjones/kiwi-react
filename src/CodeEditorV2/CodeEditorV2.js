import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import { GridList, GridTile } from 'material-ui'
//import CodeMirror from 'react-codemirror'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import skulpt from 'skulpt'
import EditorOutput from './EditorOutput'
import Tools from './Tools'

import { LESSON_SLIDE_TYPES } from '../constants'


require('./editorOverrides.css')
import '../common/flexOverride.css'

const defaultOptions = {
  lineNumbers: true
  , lineWrapping: true
  , mode: 'text/x-python'
}

const styles = {
  editor: {
    height: '100%'
  },
  baseEditorStyle: {
    backgroundColor: '#e6e6e6'
    , boxShadow: 'none'
    , borderRadius: 0
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
  }

  static propTypes = {
    editorInput: T.string.isRequired
    , editorStyle: T.object
    , options: T.object
    , layoutType: T.string.isRequired
    , className: T.string
    , onSave: T.func
    , onChange: T.func
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.editorInput !== nextProps.editorInput) {
      this.updateInput(nextProps.editorInput)
    }
  }

  shouldComponentUpdate(nextProps) {
    // only update is editorInput has changed
    return nextProps.editorInput !== this.state.editorInput
  }

  setStateAsync = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, resolve)
    });
  }

  getChildRef = (input) => {
    this.inputText = input
  }

  updateInput = async (value) => {
    const { onChange } = this.props
    // state should be fully up to date before
    // hitting shouldComponentUpdate.
    // Hence the 'await' statement here
    await this.setEditorInput(value)
    if(onChange) onChange(value)
  }

  setEditorInput = async (v) =>
    await this.setStateAsync({ editorInput: v })

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

  rawInputListener = (e) => {
    const { rawInputResolve } = this.state
    if ((e.keyCode || e.which) === 13) {
      let answer = e.target.value.split("\n")[0]
      this.setState({ prompt: '', rawInputValue: '', rawInputResolve: null })
      this.inputText.blur()
      this.addToOutput(answer + "\n")
      rawInputResolve(answer)
    }
  }

  runCode = () => {
    const { editorInput, editorOutput } = this.state
    codeOutput = '' // reset each time
    skulpt.canvas = 'mycanvas'
    skulpt.pre = 'output'
    skulpt.configure({
      inputfun: (prompt) => {
        if(prompt) {
          this.addToOutput(`${prompt} `)
        }
        this.setState({ editorOutput: codeOutput })
        return new Promise((resolve, reject) => {
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
    myPromise.then(() => {
      this.setState({
        editorOutput: codeOutput
        , errorMsg: ''
        , errorLine: null
        , tabFocus: 'output'
      })
      //codeOutput = ''
    }, (e) => {
      this.setState({
        errorMsg: e.toString()
        , errorLine: e.traceback[0].lineno
        , editorOutput: ''
      })
    })
  }

  handleSave = () => {
    this.props.onSave(this.state.editorInput)
  }

  render() {
    const { className, editorInput, options, editorStyle, onSave, layoutType = LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR } = this.props
    const { editorOutput, errorMsg, prompt, rawInputValue } = this.state
      , isFullSized = layoutType === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR

    return (
      <div className={ className }>
        <div style={ editorStyle.editorContainerStyle } className={ cns({ flexOverride: isFullSized }) }>
          <div style={ editorStyle.editorInputContainerStyle }>
            <CodeMirror
              className={ isFullSized ? 'CodeMirrorFull' : 'CodeMirrorHalf' }
              style={ styles.editor }
              value={ editorInput }
              onChange={ (editor, data, value) => {
                this.updateInput(value)
              } }
              options={ options || defaultOptions }
            />
          </div>
          <div style={ editorStyle.editorOutputContainerStyle }>
            <EditorOutput
              style={ { ...styles.baseEditorStyle, ...editorStyle.editorOutputStyle } }
              editorOutput={ editorOutput }
              errorMsg={ errorMsg }
              prompt={ prompt }
              value={ rawInputValue }
              refInput={ this.getChildRef }
            />
          </div>
        </div>
        <Tools
          onSave={ onSave ? this.handleSave : null }
          onRun={ this.runCode }
        />
      </div>
    )
  }
}

export default CodeEditor