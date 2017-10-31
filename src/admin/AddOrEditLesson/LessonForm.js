import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValueSelector } from 'redux-form'

import { RaisedButton } from 'material-ui'

import renderKiwiTextField from '../../common/renderKiwiTextField'
import KiwiSliderField from '../../common/KiwiSliderField'
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
          component={ renderKiwiTextField }
        />
        <Field
          name={ 'subtitle' }
          label={ 'Subtitle' }
          component={ renderKiwiTextField }
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
        <FieldArray
          name="slides"
          component={ Slides }
          selectedSlideTypes={ slideTypes }
        />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
      </form>
    )
  }
}

LessonForm = reduxForm({
  form: formName
  , enableReinitialize: true
  // , destroyOnUnmount: !module.hot
})(LessonForm)

const selector = formValueSelector(formName) // <-- same as form name
const mapStateToProps = (state) => {
  const slideTypes = selector(state, 'slides')
  return {
    slideTypes
  }
}


export default withRouter(connect(mapStateToProps, null)(LessonForm))
