import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { get, find, isEqual } from 'lodash'
import { connect } from 'react-redux'
import { isPrevDisabled, isNextDisabled } from "../utils/lessonWizardUtils"
import { LESSON_SLIDE_TYPES } from '../constants'

// import slides
import FullPageText from './Slides/FullPageText'
import HalfHalf from './Slides/HalfHalf'
import FullPageCodeEditor from './Slides/FullPageCodeEditor'

import './overrides.css'

const availableSlideTypes = {
  [LESSON_SLIDE_TYPES.FULL_PAGE_TEXT]: {
    component: FullPageText
  },
  [LESSON_SLIDE_TYPES.HALF_HALF]: {
    component: HalfHalf
  },
  [LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR]: {
    component: FullPageCodeEditor
  }
}

const styles = {
  header: {
    width: '100%'
  },
  lessonWizardForm: {
    height:'100%'
    , overflow: 'auto'
    , position: 'absolute'
    , top: 0
  },
  lessonBackground: {
    backgroundColor: 'white'
    , height:'100%'
    , position: 'absolute'
    , top: 0
    , zIndex: '-1'
  }
}

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
    const activeSlideObject = lesson.slides[activeSlideIndex]
    const ActiveSlideComponent = availableSlideTypes[activeSlideObject.type].component
    return [
      <form className='lessonWizardForm' style={ styles.lessonWizardForm }  onSubmit={ handleSubmit }>
        <ActiveSlideComponent
          className={ 'lessonWizardFormContent' }
          slideData={ activeSlideObject }
        />
        <div>
          <button
            type="button"
            className="previous"
            onClick={ goToPrevSlide }
            disabled={ isPrevDisabled(activeSlideIndex, lesson) }
          >
            Previous
          </button>
          <button
            type="submit"
            className="next"
            onClick={ goToNextSlide }
            disabled={ isNextDisabled(activeSlideIndex, lesson) }
          >
            Next
          </button>
        </div>
      </form>
      ,
      <div className='lessonBackground' style={ styles.lessonBackground } />
    ]
  }
}

export default reduxForm({
  form: 'userLesson'
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
})(LessonWizardForm)