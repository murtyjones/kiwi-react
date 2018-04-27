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
import ResultCard from '../../../common/ResultCard/ResultCard'

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
  <div style={ { alignItems: 'stretch', display: 'flex', minHeight: '200px' } }>
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
    this.state = {
      showResultCard: false
      , isAnsweredCorrectly: null
    }
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  handleCheckAnswer = async (answer, codeOutput) => {
    const { slideValues: { inputSuccessCriteria, outputSuccessCriteria } } = this.props
    const params = { answer, codeOutput }
    if(inputSuccessCriteria)
      params.inputSuccessCriteria = inputSuccessCriteria
    if(outputSuccessCriteria)
      params.outputSuccessCriteria = outputSuccessCriteria
    this.setStateAsync({ showResultCard: false })
    const result = await this.props.postTestCheckAnswer(params)
    this.setState({
      showResultCard: true,
      isAnsweredCorrectly: result.success,
      hintToDisplay: result.hintToDisplay
    })
  }

  render() {
    const { slideRef, slideValues } = this.props
    const { showResultCard, isAnsweredCorrectly, hintToDisplay } = this.state

    const currentLessonSlide = {
      successHeadline: slideValues.successHeadline
      , successExplanation: slideValues.successExplanation
      , failureHeadline: slideValues.failureHeadline
      , failureExplanation: slideValues.failureExplanation
    }
    return (
      <div>
        <ResultCard
          slideAnswerData={ { isAnsweredCorrectly, hintToDisplay } }
          currentLessonSlide={ currentLessonSlide }
          includePaddingForActionBar={ false }
          showResultCard={ showResultCard }
          toggleShowResultCard={ () => this.setState({ showResultCard: false }) }
        />
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
          <Fragment>
            <Field
              name={ `${slideRef}.successHeadline` }
              hintText='Success Headline'
              component={ renderTextField }
            />
            <Field
              name={ `${slideRef}.successExplanation` }
              hintText='Success Explanation'
              component={ renderTextField }
            />
            <Field
              name={ `${slideRef}.failureHeadline` }
              hintText='Failure Headline'
              component={ renderTextField }
            />
            <Field
              name={ `${slideRef}.failureExplanation` }
              hintText='Failure Explanation'
              component={ renderTextField }
            />
            <SuccessCriteria
              slideRef={ slideRef }
              slideValues={ slideValues }
            />
          </Fragment>
        }
        <Field
          name={ `${slideRef}.editorInput` }
          label={ 'Editor Input' }
          component={ renderCodeEditor }
          includeCheckAnswer={ slideValues.shouldIncludeSuccessCriteria }
          onCheckAnswer={ this.handleCheckAnswer }
        />
      </div>
    )
  }
}

export default FullPageCode