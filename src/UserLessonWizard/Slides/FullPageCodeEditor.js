import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'

import CodeEditor from '../../CodeEditor/CodeEditor'
import { CODE_CONCEPTS, LESSON_SLIDE_TYPES } from '../../constants'
import { titleStyle, slideContentFlexibleHeight, example } from './commonSlideStyles'

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
    , setToViewed: T.func.isRequired
    , setGlobalVariable: T.func.isRequired
  }

  componentDidMount() {
    this.props.setToViewed()
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.input.isViewed) {
      nextProps.setToViewed()
    }
  }

  render() {
    const { slideData, className, input, runCode, afterRunCode, globalColors, variableOptions, setGlobalVariable } = this.props

    const variablesToComplete = (slideData.inputSuccessCriteria || [])
      .filter(each => each.codingConcept === CODE_CONCEPTS.USER_GLOBAL_VARIABLE)

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
          dangerouslySetInnerHTML={ { __html: slideData.prompt } }
        />
        { slideData.hasExample &&
          <div
            key='exampleButton'
            className='exampleButton'
          >
            <div className="exampleHeader">Example</div>
            <div
              className="exampleText"
              style={ example }
              dangerouslySetInnerHTML={ { __html: slideData.example } }
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
        variableOptions={ variableOptions }
        setGlobalVariable={ setGlobalVariable }
      />
    ]
  }
}

export default FullPageCodeEditor