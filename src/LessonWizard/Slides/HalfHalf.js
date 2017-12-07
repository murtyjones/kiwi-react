import React, { Component } from 'react'
import * as T from 'prop-types'

import CodeEditor from '../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../constants'
import { titleStyle, slideContent } from './commonSlideStyles'

const styles = {
  left: {
    float: 'left'
    , width: '50%'
    , boxSizing: 'border-box'
    , display: 'inline-block'
  },
  right: {
    float: 'left'
    , width: '50%'
    , display: 'inline-block'
  }
}

const codeEditorStyles = {
  editorInputContainerStyle: {
    width: '100%'
    , display: 'block'
  },
  editorOutputContainerStyle: {
    width: '100%'
    , display: 'block'
  },
  editorContainerStyle: {
    minHeight: '300px'
  },
  editorOutputStyle: {
    borderBottomRightRadius: '10px'
    , borderBottomLeftRadius: '10px'
    , border: '1px solid #CCC'
    , borderTop: 0
    , minHeight: '300px'
  }
}

class HalfHalf extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
    , input: T.object
    , setToViewed: T.func.isRequired
  }

  componentWillMount() {
    this.props.setToViewed()
  }

  render() {
    const { slideData, className, input } = this.props
    return [
      <div className={ className }>
        <div style={ slideContent }>
          <div style={ titleStyle }>{ slideData.title }</div>
        </div>
      </div>
      ,
      <div
        className='halfHalfLeftSide instructions'
        style={ styles.left }
        dangerouslySetInnerHTML={ { __html: slideData.instructions } }
      />
      ,
      <div style={ styles.right }>
        <CodeEditor
          className='lessonHalfSizeEditorRight'
          layoutType={ LESSON_SLIDE_TYPES.HALF_HALF }
          editorStyle={ codeEditorStyles }
          editorInput={ input.value || slideData.editorInput }
          onChange={ input.onChange }
        />
      </div>

    ]
  }
}

export default HalfHalf