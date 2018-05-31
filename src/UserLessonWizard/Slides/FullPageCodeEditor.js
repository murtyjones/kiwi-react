import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import template from 'es6-template-strings'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import find from 'lodash/find'

import CodeEditor from '../../CodeEditor/CodeEditor'
import { CODE_CONCEPTS, LESSON_SLIDE_TYPES } from '../../constants'
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
    const { slideData, className, input, runCode, afterRunCode, globalColors, variablesWithUserValues, setFormGlobalVariable } = this.props

    const variableValues = createVariableNameValuePair(variablesWithUserValues)
    const prompt = template(slideData.prompt, variableValues)
    const example = template(slideData.example, variableValues)

    const variablesToComplete = slideData.variablesToComplete || []

    return [
      <div key={ className } style={ slideContentFlexibleHeight } className={ className }>
        <div
          key='title'
          id='title'
          style={ {
            ...titleStyle
            , color: globalColors.quaternaryColor
          } }
          >
          { slideData.title }
        </div>
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
      ,
      <CodeEditor
        key='lessonFullSizeEditor'
        className='lessonFullSizeEditor flexOneOneAuto'
        editorInput={ input.value }
        onChange={ answer => input.onChange(answer) }
        runCode={ runCode }
        afterRunCode={ codeOutput => afterRunCode(codeOutput) }
        showRunButton={ false }
        variablesToComplete={ variablesToComplete }
        variableOptions={ variablesWithUserValues }
        setFormGlobalVariable={ setFormGlobalVariable }
        upsertUserVariable={ this.upsertUserVariable }
      />
    ]
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPageCodeEditor))
