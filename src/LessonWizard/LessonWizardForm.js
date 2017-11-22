import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { get, find, isEqual } from 'lodash'
import { connect } from 'react-redux'


class LessonWizardForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    onSubmit: T.func.isRequired
    , activeSlideIndex: T.number.isRequired
    , lesson: T.object.isRequired
    , goToNextSlide: T.func.isRequired
    , goToPrevSlide: T.func.isRequired
  }

  render() {
    const { handleSubmit, activeSlideIndex, lesson, goToNextSlide, goToPrevSlide } = this.props
    return (
      <form onSubmit={ handleSubmit }>
        { lesson.slides[activeSlideIndex].text }
        <div>
          <button type="button" className="previous" onClick={ goToPrevSlide }>Previous</button>
          <button type="submit" className="next" onClick={ goToNextSlide }>Next</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'userLesson'
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
})(LessonWizardForm)