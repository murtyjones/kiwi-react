import React, { Component } from 'react'
import * as T from 'prop-types'

import CodeEditor from '../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../constants'

const styles = {
  left: {
    width: '50%'
    , display: 'inline-block'
  },
  right: {
    width: '50%'
    , display: 'inline-block'
  },
  editorInputContainerStyle: {
    width: '100%'
    , display: 'block'
  },
  editorOutputContainerStyle: {
    width: '100%'
    , display: 'block'
  }
}

class HalfHalf extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
  }

  render() {
    const { slideData } = this.props
    return [
      <div style={ styles.left }>
        <div dangerouslySetInnerHTML={ { __html: slideData.instructions } } />
      </div>
      ,
      <div style={ styles.left }>
        <CodeEditor
          layoutType={ LESSON_SLIDE_TYPES.HALF_HALF }
          editorInputContainerStyle={ styles.editorInputContainerStyle }
          editorOutputContainerStyle={ styles.editorOutputContainerStyle }
          editorInput={ slideData.editorInput }
        />
      </div>
    ]
  }
}

export default HalfHalf