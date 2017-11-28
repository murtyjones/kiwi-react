import React, { Component } from 'react'
import * as T from 'prop-types'

import CodeEditor from '../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../constants'

const styles = {
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
    const { style, slideData } = this.props
    return [
      <div dangerouslySetInnerHTML={ { __html: slideData.instructions } } />
      ,
      <CodeEditor
        layoutType={ LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR }
        editorContainerStyle={ styles.editorContainerStyle }
        editorInputContainerStyle={ styles.editorInputContainerStyle }
        editorOutputContainerStyle={ styles.editorOutputContainerStyle }
        editorOutputStyle={ styles.editorOutputStyle }
        editorInput={ slideData.editorInput }
      />
    ]
  }
}

export default FullPageCodeEditor