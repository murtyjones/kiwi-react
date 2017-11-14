import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValueSelector } from 'redux-form'

import { RaisedButton } from 'material-ui'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import KiwiToggleField from '../../common/KiwiToggleField'

import Slides from './Slides'

let formName = 'lesson'

class LessonForm extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  getAllCurrentSlideTypes = () => {
    const { initialValues } = this.props
    console.log(initialValues)
  }

  static propTypes = {
    initialValues: T.object
    , slideTypes: T.array
  }

  render() {
    const { handleSubmit, submitting, slideTypes } = this.props
    return (
      <form onSubmit={ handleSubmit } style={ { width: "100%", height: "100%" } }>
        <Field
          name={ 'title' }
          label={ 'Title' }
          component={ renderTextField }
        />
        <Field
          name={ 'subtitle' }
          label={ 'Subtitle' }
          component={ renderTextField }
        />
        <Field
          name={ 'minutesToComplete' }
          label={ 'Minutes to Complete' }
          component={ KiwiSliderField }
          defaultValue={ 1 }
          min={ 1 }
          step={ 1 }
          max={ 100 }
        />
        <Field
          name={ 'isPublished' }
          label={ 'Is live?' }
          component={ KiwiToggleField }
        />
        <FieldArray
          name="slides"
          component={ Slides }
          selectedSlideTypes={ slideTypes }
        />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

LessonForm = reduxForm({
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(LessonForm)

const selector = formValueSelector(formName)
const mapStateToProps = (state, ownProps) => {
  const slideTypes = selector(state, 'slides')
  const initialValues = ownProps.initialValues
  if(!initialValues.isPublished)
    initialValues.isPublished = false

  return {
    slideTypes,
  }
}


export default withRouter(connect(mapStateToProps, null)(LessonForm))
