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

const styles = theme => ({
  dabblewopper: {
    height: '100%',
    width: '100%',
    zIndex: 99999,
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1531090895/dabblewopper_o4g2bm.svg)',
    backgroundPosition: 'center bottom',
    backgroundSize: 'calc(100% - 20px)'
  },
  speechBubble: {
    margin: '5% auto 0 auto',
    width: '50%'
  },
  dabblewopperId: {
    position: 'absolute',
    bottom: '100px',
    left: '70px',
    backgroundColor: '#2e0402',
    transform: 'rotate(270deg)',
    height: '30px',
    lineHeight: '30px',
    width: '80px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: '5px'
  },
  dabblewopperSideButtonContainer: {
    position: 'absolute',
    right: '4px',
    bottom: '40px',
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
    height: '280px',
    bottom: '60px',
    position: 'absolute',
    left: '177px',
    right: '141px',
    borderRadius: '15px',
    border: '5px solid #debd5b',
    zIndex: 100001,
    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      top: -15,
      bottom: -15,
      left: -15,
      right: -15,
      borderRadius: '25px',
      border: '10px solid #2e0402',
    }
  },
  dabblewopperControls: {
    position: 'absolute',
    bottom: '20px',
    width: '400px',
    right: '50%',
    marginRight: '-100px',
    '& button': {
      cursor: 'pointer',
      display: 'inline-block',
      backgroundColor: '#debd5b',
      color: 'white',
      margin: '10px auto',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: 'none',
      '&.run': {
        width: '100px'
      },
      '&.hint': {
        width: '50px'
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
    const { classes, slideData, input, runCode, afterRunCode, variablesWithUserValues, setFormGlobalVariable } = this.props
    const { isExampleActive } = this.state

    const variableValues = createVariableNameValuePair(variablesWithUserValues)
    const prompt = template(slideData.prompt, variableValues)
    const example = template(slideData.example, variableValues)
    const { carlImage, promptLabel } = slideData

    const variablesToComplete = slideData.variablesToComplete || []

    return (
      <Fragment>
        <div className={ classes.dabblewopper }>
          <SpeechBubble
            className={ classes.speechBubble }
            label={ promptLabel }
            htmlContent={ prompt }
            cornerImage={ carlImage }
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
            <button className='run'>Run Code</button>
            <button
              className='hint'
              onClick={ this.toggleIsExampleActive }
            >
              Hint
            </button>
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
          exampleHTML={ example }
          closeExample={ this.toggleIsExampleActive }
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
