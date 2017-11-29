import React, { Component } from 'react'
import * as T from 'prop-types'

import CodeEditor from '../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../constants'

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
    borderTopRightRadius: '10px'
    , borderBottomRightRadius: '10px'
  }
}

class FullPageCodeEditor extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
  }

  render() {
    const { slideData } = this.props
    return [
      <div dangerouslySetInnerHTML={ { __html: slideData.instructions } } />
      ,
      <CodeEditor
        layoutType={ LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR }
        editorStyle={ codeEditorStyles }
        editorInput={ slideData.editorInput }
      />
    ]
  }
}

export default FullPageCodeEditor