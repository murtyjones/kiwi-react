import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'

import CodeEditor from '../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../constants'
import { titleStyle, slideContent, example } from './commonSlideStyles'

import './overrides.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'

const codeEditorStyles = {
  editorInputContainerStyle: {
    width: '50%'
    , display: 'inline-block'
  },
  editorOutputContainerStyle: {
    width: '50%'
    , display: 'inline-block'
  },
  editorContainerStyle: {
    minHeight: '600px'
  },
  editorOutputStyle: {
    border: '1px solid #CCC'
    , borderLeft: 0
    , borderTopRightRadius: '10px'
    , borderBottomRightRadius: '10px'
  }
}

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
    , handleCodeSave: T.func.isRequired
  }

  componentDidMount() {
    this.props.setToViewed()
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.input.isViewed) {
      nextProps.setToViewed()
    }
  }

  handleSave = (v) => {
    this.props.handleCodeSave(v)
  }

  render() {
    const { slideData, className, input } = this.props

    return [
      <div key={ className } style={ slideContent } className={ className }>
        <div
          key='title'
          id='title'
          style={ titleStyle }
        >
          { slideData.title }
        </div>
        <div
          key='prompt'
          id='prompt'
          className='prompt'
          dangerouslySetInnerHTML={ { __html: slideData.prompt } }
        />
        { slideData.example &&
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
        className='lessonFullSizeEditor'
        layoutType={ LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR }
        editorStyle={ codeEditorStyles }
        editorInput={ input.value || slideData.editorInput }
        onChange={ input.onChange }
        onSave={ this.handleSave }
      />
    ]
  }
}

export default FullPageCodeEditor