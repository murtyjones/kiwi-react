import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import template from 'es6-template-strings'
import withRouter from 'react-router-dom/withRouter'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import find from 'lodash/find'

import CodeEditor from '../../CodeEditor/CodeEditor'
import { titleStyle, slideContentFlexibleHeight, example as exampleStyle } from './commonSlideStyles'
import { createVariableNameValuePair } from '../../utils/templateUtils'
import { postUserVariable, putUserVariable } from '../../actions'

import './overrides.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'

const defaultExampleHtml = 'Example'

const styles = theme => ({
  dabblewopper: {
    zIndex: 99999,
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1531090895/dabblewopper_o4g2bm.svg)',
    backgroundPosition: 'center 121px',
    backgroundSize: '100%'
  },
  codeEditor: {
    width: '80%',
    margin: '0 auto',
    height: '50%',
    position: 'absolute',
    bottom: 0
  }
})

class FullPageCodeEditor extends PureComponent {
  constructor(props) {
    super(props)
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

    const variableValues = createVariableNameValuePair(variablesWithUserValues)
    const prompt = template(slideData.prompt, variableValues)
    const example = template(slideData.example, variableValues)

    const variablesToComplete = slideData.variablesToComplete || []

    return (
      <Fragment>
        <div className={ classes.dabblewopper }>
          {/*<div*/}
            {/*key='title'*/}
            {/*id='title'*/}
            {/*style={ {*/}
              {/*...titleStyle*/}
              {/*, color: globalColors.quaternaryColor*/}
            {/*} }*/}
            {/*>*/}
            {/*{ slideData.title }*/}
          {/*</div>*/}
          <div
            key='prompt'
            id='prompt'
            className='prompt'
            dangerouslySetInnerHTML={ { __html: prompt } }
          />
          { slideData.hasExample &&
            <div
              key='exampleButton'
              className='exampleButton'
            >
              <div className="exampleHeader">Example</div>
              <div
                className="exampleText"
                style={ exampleStyle }
                dangerouslySetInnerHTML={ { __html: example } }
              />
            </div>
          }
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
