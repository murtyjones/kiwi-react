import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import skulpt from 'skulpt'
import { Row, Col } from 'react-grid-system'
import { introJs } from 'intro.js'
import 'intro.js/introjs.css'
import 'intro.js/themes/introjs-flattener.css'
import BluebirdPromise from 'bluebird'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import EditorControls from './EditorControls'
import EditorInput from './EditorInput'
import EditorOutput from './EditorOutput'
import Resources from './Resources'
import renderIf from 'render-if'
import { Tabs, Tab } from 'material-ui/Tabs'


let codeOutput = ''

class CodeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorInput: props.codeInput.code || '# Write Your Code Here'
      , editorOutput: ''
      , errorMsg: ''
      , errorLine: null
      , isResourcesShowing: false
      , changeInput: false
      , tabFocus: 'input'
      , answer: ''
      , prompt: ''
      , rawInputValue: ''
      , rawInputResolve: null
      , modalOpen: false
    }
  }

  getChildRef = (input) => {
    this.inputText = input
  }

  componentDidMount() {
    if (window.location.pathname === '/tutorial') {
      this.runIntro()
    }
  }

  //modal handler being added to deal with code name modal

  handleModalOpen = () => {
    this.setState({modalOpen: true})
  }

  handleModalClose = () => {
    this.setState({modalOpen: false})
    this.props.saveHandler(this.state.editorInput)
  }

  forceUpdateHandler(){
    let savetext = localStorage.getItem('retrievedText')
    if (savetext){
      this.setState({
          editorInput: savetext,
          changeInput: true
        }
        , () =>{
          // this.forceUpdate()
          localStorage.removeItem('retrievedText')
          setTimeout(()=>{
            this.setState({
              changeInput: false
            })
          }, 1000)
        })
    }
  }


  handleEditorChange = (value) => {
    this.setState({ editorInput: value })
  }

  handleFocusChange = (focused) => {
    const tabFocus = focused ? "input" : "output"
    this.setState({
      tabFocus: tabFocus
    })
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
    const programToRun = this.state.editorInput
    skulpt.canvas = "mycanvas"
    skulpt.pre = "output"
    skulpt.configure({
      inputfun: (prompt) => {
        if(prompt) this.addToOutput(`${prompt} `)
        this.setState({ editorOutput: codeOutput })
        return new Promise((resolve,reject) => {
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
      },
      inputfunTakesPrompt: true,
      output:this.addToOutput,
      read:this.builtinRead
    })
    let myPromise = skulpt.misceval.asyncToPromise(function() {
      return skulpt.importMainWithBody("<stdin>", false, programToRun, true)
    })
    myPromise.then(() => {
      this.setState({
        editorOutput: codeOutput,
        errorMsg: '',
        errorLine: null,
        tabFocus: 'output'
      })
      codeOutput = ''
    }, (e) => {
      this.setState({
        errorMsg: e.toString(),
        errorLine: e.traceback[0].lineno,
        editorOutput: '',
        tabFocus: 'output'
      })
      codeOutput = ''
    })
  }

  runIntro = () => {
    introJs().start()
  }

  toggleResources = () => {
    this.setState({
      isResourcesShowing: !this.state.isResourcesShowing,
    })
  }

  render() {
    const { changeInput, editorInput, editorOutput, errorMsg, errorLine, isResourcesShowing, tabFocus, rawInputValue, prompt } = this.state

    const inputLabel = tabFocus === 'input' ? "Enter your Python code on here, then click 'START'" : ''
    const outputLabel = tabFocus === 'output' ? 'Check out the results of your Python code here.' : ''

    return (
      <div>
        <Resources
          show={ isResourcesShowing }
          hide={ this.toggleResources }
        />
        <Row>
          <Col md={ 12 }>
            {/*handleSave hooks to saveHandler in userProjects --Peter*/}
            <EditorControls
              handleSave={ e => { this.props.saveHandler(this.state.editorInput) } }
              runCode={ this.runCode }
              forceUpdate = { this.forceUpdateHandler.bind(this) }
              editorInput={ editorInput }
              runIntro={ this.runIntro }
              showResources={ this.toggleResources }
            />
          </Col>
          <Col md={ 12 }>
            <Tabs
              value={ tabFocus }
              onChange={ this.handleChange }
            >
              <Tab label={ inputLabel } value="input"  />
              <Tab label={ outputLabel } value="output" />
            </Tabs>
            <Col md={ 6 }>
              <EditorInput
                editorInput={ editorInput }
                updateFocus={ !changeInput ? this.handleFocusChange : null }
                updateInput={ !changeInput ? this.handleEditorChange : null }
                errorLine={ errorLine }
              />
            </Col>
            <Col md={ 6 }>
              <EditorOutput
                editorOutput={ editorOutput }
                errorMsg={ errorMsg }
                prompt={ prompt }
                value={ rawInputValue }
                currentInputRef={ this.inputText }
                setInputRef={ this.getChildRef }
              />
            </Col>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CodeEditor
