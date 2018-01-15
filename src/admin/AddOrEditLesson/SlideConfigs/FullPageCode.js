import React, { Component } from 'react'
import { Field } from 'redux-form'
import renderTextField from '../../../common/renderTextField'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import renderRichCodeTextEditor from '../../../common/renderRichCodeTextEditor'
import CodeEditor from '../../../CodeEditorV2/CodeEditorV2'
import { LESSON_SLIDE_TYPES } from '../../../constants'
import insertIf from '../../../utils/insertIf'
import { Toggle } from 'redux-form-material-ui'

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

const renderCodeEditor = ({input}) =>
  <CodeEditor
    key='lessonFullSizeEditor'
    className='lessonFullSizeEditor'
    layoutType={ LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR }
    editorStyle={ codeEditorStyles }
    editorInput={ input.value || '' }
    onChange={ input.onChange }
  />

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