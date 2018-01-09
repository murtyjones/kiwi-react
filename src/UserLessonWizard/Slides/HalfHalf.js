import React, { PureComponent } from 'react'
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

class HalfHalf extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
    , input: T.object
    , setToViewed: T.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.input.isViewed) {
      this.props.setToViewed()
    }
  }

  render() {
    const { slideData, className, input } = this.props
    return [
      <div key='halfhalf-title-container' className={ className }>
        <div style={ slideContent }>
          <div
            key='title'
            id='title'
            style={ titleStyle }
          >
            { slideData.title }
          </div>
        </div>
      </div>
      ,
      <div
        key='halfhalf-instructions'
        id='halfhalf-instructions'
        className='halfHalfLeftSide instructions'
        style={ styles.left }
        dangerouslySetInnerHTML={ { __html: slideData.instructions } }
      />
      ,
      <div key='halfhalf-editor' style={ styles.right }>
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