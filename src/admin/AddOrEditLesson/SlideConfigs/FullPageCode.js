import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'


import KiwiTextField from '../../../common/form/KiwiTextField'
import RichTextEditor from '../../../common/RichTextEditor'
import CodeEditor from '../../../CodeEditor/CodeEditor'
import {CODE_CONCEPTS, LESSON_SLIDE_TYPES} from '../../../constants'
import { Toggle } from 'redux-form-material-ui'

import InputSuccessCriteria from './InputSuccessCriteria'
import OutputSuccessCriteria from './OutputSuccessCriteria'
import ResultCard from '../../../common/ResultCard/ResultCard'


const renderCodeEditor = ({ input, ...rest }) =>
  <div style={ styles.codeEditorContainer }>
    <CodeEditor
      key='lessonFullSizeEditor'
      className='lessonFullSizeEditor'
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

const SuccessCriteria = ({ slideRef, slideValues, variableOptions }) =>
  <div style={ { alignItems: 'stretch', display: 'flex', minHeight: '200px' } }>
    <FieldArray
      name={`${slideRef}.inputSuccessCriteria` }
      label='Input Success Criteria'
      component={ InputSuccessCriteria }
      slideValues={ slideValues }
      variableOptions={ variableOptions }
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
      , globalVariables: []
    }
  }

  static propTypes = {
    slideRef: T.string.isRequired
    , slideValues: T.object.isRequired
    , variableOptions: T.array.isRequired
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  handleCheckAnswer = async (answer, codeOutput) => {
    const { slideValues: { inputSuccessCriteria, outputSuccessCriteria } } = this.props
    const { globalVariables } = this.state
    const params = { answer, codeOutput }
    if(inputSuccessCriteria)
      params.inputSuccessCriteria = inputSuccessCriteria
    if(outputSuccessCriteria)
      params.outputSuccessCriteria = outputSuccessCriteria
    if(!isEmpty(globalVariables))
      params.variables = globalVariables
    this.setStateAsync({ showResultCard: false })
    const result = await this.props.postTestCheckAnswer(params)
    this.setState({
      showResultCard: true,
      isAnsweredCorrectly: result.success,
      hintToDisplay: result.hintToDisplay,
      globalVariables: []
    })
  }

  setFormGlobalVariable = (_, { variableId, value }) => {
    const { globalVariables } = this.state
    const position = (globalVariables.variables || []).length
    this.setState({
      globalVariables: update(globalVariables, {
        $splice: [[ position, 0, { value, variableId } ]]
      })
    })
  }

  render() {
    const { slideRef, slideValues, variableOptions } = this.props
    const { showResultCard, isAnsweredCorrectly, hintToDisplay } = this.state

    const currentLessonSlide = {
      successHeadline: slideValues.successHeadline
      , successExplanation: slideValues.successExplanation
      , failureHeadline: slideValues.failureHeadline
      , failureExplanation: slideValues.failureExplanation
    }

    // this differs from the methodology in the student version of this slide,
    // because we want to account for the local changes not saved to the server.
    const variablesToComplete = (slideValues.inputSuccessCriteria || [])
      .filter(each => each.codingConcept === CODE_CONCEPTS.USER_GLOBAL_VARIABLE)

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
          name={ `${slideRef}.promptLabel` }
          label='Prompt Box Label'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.promptPictureUrl` }
          label='Prompt Picture URL'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.prompt` }
          label='Prompt'
          component={ RichTextEditor }
          variableOptions={ variableOptions }
        />
        <Field
          name={`${slideRef}.hasHint` }
          label='Include hint?'
          component={ Toggle }
          style={ { width: 'auto' } }
        />
        { slideValues.hasHint &&
          <Fragment>
            <Field
              name={`${slideRef}.hint` }
              label='Example Code'
              component={ RichTextEditor }
              variableOptions={ variableOptions }
            />
          </Fragment>
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
              label='Success Headline'
              component={ KiwiTextField }
            />
            <Field
              name={ `${slideRef}.successExplanation` }
              label='Success Explanation'
              component={ KiwiTextField }
            />
            <Field
              name={ `${slideRef}.failureHeadline` }
              label='Failure Headline'
              component={ KiwiTextField }
            />
            <Field
              name={ `${slideRef}.failureExplanation` }
              label='Failure Explanation'
              component={ KiwiTextField }
            />
            <SuccessCriteria
              slideRef={ slideRef }
              slideValues={ slideValues }
              variableOptions={ variableOptions }
            />
          </Fragment>
        }
        <Field
          name={ `${slideRef}.editorInput` }
          label={ 'Editor Input' }
          component={ renderCodeEditor }
          includeCheckAnswer={ slideValues.shouldIncludeSuccessCriteria }
          onCheckAnswer={ this.handleCheckAnswer }
          variableOptions={ variableOptions }
          variablesToComplete={ variablesToComplete }
          setFormGlobalVariable={ this.setFormGlobalVariable }
        />
      </div>
    )
  }
}

export default FullPageCode
