import React, { Component } from 'react'
import * as T from 'prop-types'
import { GridList, GridTile } from 'material-ui'
import CodeMirror from 'react-codemirror'
import skulpt from 'skulpt'
import EditorOutput from './EditorOutput'
import Tools from './Tools'

import { LESSON_SLIDE_TYPES } from '../constants'

require('./editorOverrides.css')

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
    , saveHandler: T.func
    , onChange: T.func
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.editorInput !== nextProps.editorInput) {
      this.forceInputUpdate(nextProps.editorInput)
    }
  }

  getChildRef = (input) => {
    this.inputText = input
  }

  updateInput = (newCode) => {
    this.setState({ editorInput: newCode })
    if(this.props.onChange) {
      this.props.onChange(newCode)
    }
  }

  forceInputUpdate = (nextEditorInput) => {
    this.setState({ editorInput: nextEditorInput })
    this.codeMirror.getCodeMirror().setValue(nextEditorInput)
  }

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
      codeOutput = ''
    }, (e) => {
      this.setState({
        errorMsg: e.toString()
        , errorLine: e.traceback[0].lineno
        , editorOutput: ''
      })
      codeOutput = ''
    })
  }

  saveCode = () => {
    this.props.saveHandler(this.state.editorInput)
  }

  render() {
    const { className, options, editorStyle, saveHandler, layoutType = LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR } = this.props
    const { editorInput, editorOutput, errorMsg, prompt, rawInputValue } = this.state

    return (
      <div className={ className }>
        <div style={ editorStyle.editorContainerStyle }>
          <div style={ editorStyle.editorInputContainerStyle }>
            <CodeMirror
              ref={ (c) => { this.codeMirror = c } }
              className={ layoutType === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR ? 'CodeMirrorFull' : 'CodeMirrorHalf' }
              style={ styles.editor }
              value={ editorInput }
              onChange={ this.updateInput }
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
          onSaveClick={ saveHandler ? this.saveCode : null }
          onRunClick={ this.runCode }
        />
      </div>
    )
  }
}

export default CodeEditor