import React, { Component } from 'react'
import { Field } from 'redux-form'
import renderTextField from '../../../common/renderTextField'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import renderRichCodeTextEditor from '../../../common/renderRichCodeTextEditor'
import CodeEditor from '../../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../../constants'
import insertIf from '../../../utils/insertIf'
import { Toggle } from 'redux-form-material-ui'

const renderCodeEditor = ({input}) =>
  <div style={ styles.codeEditorContainer }>
    <CodeEditor
      key='lessonFullSizeEditor'
      className='lessonFullSizeEditor'
      editorInput={ input.value || '' }
      onChange={ input.onChange }
    />
  </div>


const styles = {
  prompt: {
    border: '1px solid #ccc',
    height: '100px',
    width: '100%'
  },
  textArea: {
    border: '1px solid #ccc',
    height: '500px',
    width: '100%'
  },
  codeEditorContainer: {
    height: '500px'
    , width: '100%'
    , overflow: 'auto'
    , display: 'flex'
    , flexFlow: 'column'
  }
}

class FullPageCode extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef, slideValues } = this.props
    return (
      <div>
        <Field
          name={ `${slideRef}.prompt` }
          label='Prompt'
          component={ renderRichTextEditor }
        />
        <Field
          name={`${slideRef}.hasExample` }
          label='Include example?'
          component={ Toggle }
        />
        { slideValues.hasExample &&
          <Field
            name={`${slideRef}.example` }
            label='Example Code'
            component={ renderRichCodeTextEditor }
          />
        }
        <Field
          name={ `${slideRef}.editorInput` }
          label={ 'Editor Input' }
          component={ renderCodeEditor }
          multiLine={ true }
          underlineShow={ false }
          rows={ 20 }
          style={ styles.textArea }
        />
      </div>
    )
  }
}

export default FullPageCode