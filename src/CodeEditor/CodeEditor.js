import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import { GridList, GridTile } from 'material-ui'
//import CodeMirror from 'react-codemirror'
import { Controlled as CodeMirror } from 'react-codemirror2'
import skulpt from 'skulpt'
import EditorOutput from './EditorOutput'
import Tools from './Tools'

import { LESSON_SLIDE_TYPES } from '../constants'


require('./editorOverrides.css')
import '../common/flex.css'

const defaultCodeEditorStyles = {
  editorInputContainerStyle: {
    position: 'absolute'
    , bottom: '0'
    , right: '50%'
    , left: '0'
    , top: '0'
  },
  editorOutputContainerStyle: {
    position: 'absolute'
    , bottom: '0'
    , right: '0'
    , left: '50%'
    , top: '0'
  },
  editorContainerStyle: {
    position: 'absolute'
    , bottom: 'calc(20px + 50px)' // leave room for ActionBar
    , right: '0'
    , left: '0'
    , top: '0'
  },
  editorOutputStyle: {
    border: '1px solid #CCC'
    , borderLeft: 0
    , borderTopRightRadius: '10px'
    , borderBottomRightRadius: '10px'
  }
}

const defaultOptions = {
  lineNumbers: true
  , lineWrapping: false
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
    this.codeMirror = null
  }

  static propTypes = {
    editorInput: T.string.isRequired
    , editorStyle: T.object
    , options: T.object
    , layoutType: T.string
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
    
    if(!this.props.runCode && nextProps.runCode) {
      this.runCode()
      nextProps.afterRunCode()
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.errorLine) {
      this.codeMirror.removeLineClass((this.state.errorLine - 1), 'wrap', 'errorLine')
    }
    if(nextState.errorLine) {
      this.codeMirror.addLineClass((nextState.errorLine - 1), 'wrap', 'errorLine')
    }
  }

  setStateAsync = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, resolve)
    });
  }

  getChildRef = (c) => {
    this.inputText = c
  }

  updateInput = (v) => {
    const { onChange } = this.props
    // state should be fully up to date before
    // hitting shouldComponentUpdate.
    // Hence the 'await' statement here
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
    codeOutput = '' // reset each time
    skulpt.canvas = 'mycanvas'
    skulpt.pre = 'output'
    skulpt.configure({
      inputfun: (prompt) => {
        if(prompt) {
          this.addToOutput(`${prompt} `)
        }
        this.setState({ editorOutput: codeOutput })
        return new Promise(async(resolve, reject) => {
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
      })
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
    const { className, options, onSave, editorStyle = defaultCodeEditorStyles, showRunButton = true, layoutType = LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR } = this.props
    const { editorOutput, errorMsg, prompt, rawInputValue, editorInput } = this.state
      , isFullSized = layoutType === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR

    return (
      <div className={ className }>
        <div style={ editorStyle.editorContainerStyle } className={ cns({ flex: isFullSized }) }>
          <div style={ editorStyle.editorInputContainerStyle }>
            <CodeMirror
              editorDidMount={ editor => { this.codeMirror = editor } }
              className={ isFullSized ? 'CodeMirrorFull' : 'CodeMirrorHalf' }
              style={ styles.editor }
              value={ editorInput }
              onBeforeChange={ (editor, data, value) => {
                this.handleBeforeChange(value)
              } }
              onChange={ (editor, data, value) => {
                this.handleChange(value)
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
              setInputRef={ this.getChildRef }
            />
          </div>
        </div>
        <Tools
          onSave={ onSave ? this.handleSave : null }
          onRun={ showRunButton ? this.runCode : null }
        />
      </div>
    )
  }
}

export default CodeEditor