import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import template from 'es6-template-strings'
import withRouter from 'react-router-dom/withRouter'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import find from 'lodash/find'

import CodeEditor from '../../CodeEditor/CodeEditor'
import SpeechBubble from '../SpeechBubble'
import { titleStyle, slideContentFlexibleHeight, example as exampleStyle } from './commonSlideStyles'
import { createVariableNameValuePair } from '../../utils/templateUtils'
import { postUserVariable, putUserVariable } from '../../actions'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'

const defaultExampleHtml = 'Example'

const codeEditorHeight = 'calc(50vh - 200px)'

const styles = theme => ({
  dabblewopper: {
    height: '100%',
    width: '100%',
    zIndex: 99999
  },
  dabblewopperHead: {
    position: 'absolute',
    bottom: codeEditorHeight,
    height: '400px',
    width: '100%',
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1531777332/Dabblewopper/dabblewopper_top_2.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    backgroundSize: '100%'
  },
  dabblewopperBody: {
    position: 'absolute',
    bottom: 0,
    height: codeEditorHeight,
    width: '100%',
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1531777299/Dabblewopper/dabblewopper_bottom_3_3.svg)',
    backgroundRepeat: 'repeat-y',
    backgroundPosition: '0.48px bottom',
    backgroundSize: '1300px 6px'
  },
  speechBubble: {
    margin: '5% auto 0 auto',
    width: '50%'
  },
  dabblewopperId: {
    position: 'absolute',
    bottom: '15%',
    left: '65px',
    backgroundColor: '#2e0402',
    transform: 'rotate(270deg)',
    height: '45px',
    lineHeight: '45px',
    width: '120px',
    color: 'white',
    textAlign: '-webkit-center',
    fontWeight: 'bold',
    borderRadius: '5px',
    fontSize: '16pt'
  },
  dabblewopperSideButtonContainer: {
    position: 'absolute',
    right: '4px',
    bottom: '5%',
    backgroundColor: '#2e0402',
    width: '120px',
    borderRadius: '5px',
    '& button': {
      backgroundColor: '#debd5b',
      color: 'white',
      width: '80%',
      margin: '10px auto',
      display: 'block',
      fontFamily: 'cursive',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: 'none'
    }
  },
  codeEditor: {
    margin: '0 auto',
    height: codeEditorHeight,
    minHeight: '100px',
    bottom: '60px',
    position: 'absolute',
    left: '177px',
    right: '141px',
    borderRadius: '20px',
    border: '10px solid #debd5b',
    zIndex: 100001,
    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      top: -10,
      bottom: -10,
      left: -10,
      right: -10,
      borderRadius: '20px',
      border: '2px solid #2e0402',
    }
  },
  dabblewopperControls: {
    width: 300,
    right: 'calc(50% - 150px)',
    bottom: 20,
    position: 'absolute',
    textAlign: '-webkit-center',
    '& div': {
      cursor: 'pointer',
      display: 'inline',
      color: 'white',
      margin: '10px auto',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: '2px solid rgba(0,0,0,0.5)',
      padding: '10px 20px',
      marginRight: 20,
      opacity: 0.85,
      '&:hover': {
        opacity: 1
      },
      '&:active': {
        boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)'
      },
      '&.dabblewopperRun': {
        backgroundColor: '#ad3e3c',
      },
      '&.dabblewopperHint': {
        backgroundColor: '#debd5b',
      }
    }
  },
  example: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
})

class FullPageCodeEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isExampleActive: false
    }
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
    , input: T.object
    , setFormGlobalVariable: T.func.isRequired
    , postUserVariable: T.func.isRequired
    , putUserVariable: T.func.isRequired
    , afterRunCode: T.func.isRequired
    , userId: T.string.isRequired
    , onRunCode: T.func.isRequired
    , classes: T.object.isRequired
    , runCode: T.bool.isRequired
    , variablesWithUserValues: T.array
    , userVariables: T.array
  }

  toggleIsExampleActive = () =>
    this.setState({ isExampleActive: !this.state.isExampleActive })

  upsertUserVariable = ({ variableId, value }) => {
    const { userVariables, userId } = this.props
    const userVariable = find(userVariables, { variableId }) || {}
    const params = Object.assign({}, userVariable, {
      value, variableId, userId
    })
    return params._id
      ? this.props.putUserVariable(params)
      : this.props.postUserVariable(params)
  }

  render() {
    const { onRunCode, classes, slideData, input, runCode, afterRunCode, variablesWithUserValues, setFormGlobalVariable } = this.props
    const { isExampleActive } = this.state

    const variableValues = createVariableNameValuePair(variablesWithUserValues)
    const prompt = template(slideData.prompt, variableValues)
    const hint = template(slideData.hint, variableValues)
    const { promptPictureUrl, promptLabel } = slideData

    const variablesToComplete = slideData.variablesToComplete || []

    return (
      <Fragment>
        <div className={ classes.dabblewopper }>
          <div className={ classes.dabblewopperHead } />
          <div className={ classes.dabblewopperBody } />
          <SpeechBubble
            className={ classes.speechBubble }
            label={ promptLabel }
            htmlContent={ prompt }
            cornerImageUrl={ promptPictureUrl }
          />
          <div className={ classes.dabblewopperId }>
            #0123
          </div>
          <div className={ classes.dabblewopperSideButtonContainer }>
            <button disabled={ true }>#</button>
            <button disabled={ true }>:</button>
            <button disabled={ true }>( )</button>
            <button disabled={ true }>""</button>
          </div>
          <div className={ classes.dabblewopperControls }>
            <div className='dabblewopperRun'
              onClick={ onRunCode }
            >
              Run Code
            </div>
            { slideData.hasHint &&
              <div className='dabblewopperHint'
                onClick={ this.toggleIsExampleActive }
              >
                Hint
              </div>
            }
          </div>
        </div>
        <CodeEditor
          className={ classes.codeEditor }
          editorInput={ input.value }
          onChange={ answer => input.onChange(answer) }
          runCode={ runCode }
          afterRunCode={ (...params) => afterRunCode(...params) }
          showRunButton={ false }
          variablesToComplete={ variablesToComplete }
          variableOptions={ variablesWithUserValues }
          setFormGlobalVariable={ setFormGlobalVariable }
          upsertUserVariable={ this.upsertUserVariable }
          isExampleActive={ isExampleActive }
          hintHTML={ hint }
          toggleIsExampleActive={ this.toggleIsExampleActive }
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, userVariables: { userVariablesById } } = state
  const userVariables = Object.values(userVariablesById)

  return {
    userVariables
    , userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postUserVariable: params => dispatch(postUserVariable(params))
    , putUserVariable: params => dispatch(putUserVariable(params))
  }
}

FullPageCodeEditor = withStyles(styles, { withTheme: true })(FullPageCodeEditor)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPageCodeEditor))
