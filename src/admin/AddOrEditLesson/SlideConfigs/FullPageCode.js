import React, { Component, Fragment } from 'react'
import { Field, FieldArray } from 'redux-form'
import renderTextField from '../../../common/renderTextField'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import renderRichCodeTextEditor from '../../../common/renderRichCodeTextEditor'
import CodeEditor from '../../../CodeEditor/CodeEditor'
import { LESSON_SLIDE_TYPES } from '../../../constants'
import insertIf from '../../../utils/insertIf'
import { Toggle } from 'redux-form-material-ui'
import InputSuccessCriteria from './InputSuccessCriteria'
import OutputSuccessCriteria from './OutputSuccessCriteria'

import '../../../common/flex.css'

const renderCodeEditor = ({ input, ...rest }) =>
  <div className='flex flexFlowColumn' style={ styles.codeEditorContainer }>
    <CodeEditor
      key='lessonFullSizeEditor'
      className='lessonFullSizeEditor flexOneOneAuto'
      editorInput={ input.value || '' }
      onChange={ input.onChange }
      { ...rest }
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
  }
}

const SuccessCriteria = ({ slideRef, slideValues }) =>
  <div style={ { position: 'relative', minHeight: '200px' } }>
    <FieldArray
      name={`${slideRef}.inputSuccessCriteria` }
      label='Input Success Criteria'
      component={ InputSuccessCriteria }
      slideValues={ slideValues }
    />
    <FieldArray
      name={`${slideRef}.outputSuccessCriteria` }
      label='Output Success Criteria'
      component={ OutputSuccessCriteria }
      slideValues={ slideValues }
    />
  </div>


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
          style={ { width: 'auto' } }
        />
        { slideValues.hasExample &&
          <Field
            name={`${slideRef}.example` }
            label='Example Code'
            component={ renderRichCodeTextEditor }
          />
        }
        <Field
          name={`${slideRef}.shouldIncludeSuccessCriteria` }
          label="Include Success Criteria?"
          component={ Toggle }
          style={ { width: 'auto' } }
        />
        { slideValues.shouldIncludeSuccessCriteria &&
          <SuccessCriteria
            slideRef={ slideRef }
            slideValues={ slideValues }
          />
        }
        <Field
          name={ `${slideRef}.editorInput` }
          label={ 'Editor Input' }
          component={ renderCodeEditor }
          includeCheckAnswer={ slideValues.shouldIncludeSuccessCriteria }
        />
      </div>
    )
  }
}

export default FullPageCode