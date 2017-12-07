import React, { Component } from 'react'
import * as T from 'prop-types'

import CodeEditor from '../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../constants'
import { titleStyle, slideContent } from './commonSlideStyles'

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
    display: 'flex'
    , minHeight: '600px'
  },
  editorOutputStyle: {
    border: '1px solid #CCC'
    , borderLeft: 0
    , borderTopRightRadius: '10px'
    , borderBottomRightRadius: '10px'
  }
}

class FullPageCodeEditor extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
    , input: T.object
  }

  render() {
    const { slideData, className, input } = this.props
    console.log(this.props.input)
    return [
      <div key={ className } className={ className }>
        <div style={ slideContent }>
          <div style={ titleStyle }>{ slideData.title }</div>
          <div dangerouslySetInnerHTML={ { __html: slideData.prompt } } />
        </div>
      </div>
      ,
      <CodeEditor
        key='lessonFullSizeEditor'
        className='lessonFullSizeEditor'
        layoutType={ LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR }
        editorStyle={ codeEditorStyles }
        editorInput={ input.value || slideData.editorInput }
        onChange={ input.onChange }
      />
    ]
  }
}

export default FullPageCodeEditor