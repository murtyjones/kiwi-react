import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { get, find, isEqual } from 'lodash'
import { connect } from 'react-redux'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import cns from 'classnames'


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

const circleSize = 60

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
  },
  prevButton: {
    height: `${circleSize*2}px`
    , width: `${circleSize}px`
    , borderBottomRightRadius: `${circleSize*2}px`
    , borderTopRightRadius: `${circleSize*2}px`
    , position: 'absolute'
    , left: 0
    , top: '50%'
    , marginTop: `-${circleSize}px`
  },
  leftArrowStyle: {
    height: 50
    , width: 50
    , position: 'absolute'
    , left: 0
    , top: '50%'
    , marginTop: `-${circleSize/2}px`
  },
  nextButton: {
    height: `${circleSize*2}px`
    , width: `${circleSize}px`
    , borderBottomLeftRadius: `${circleSize*2}px`
    , borderTopLeftRadius: `${circleSize*2}px`
    , position: 'absolute'
    , right: 0
    , top: '50%'
    , marginTop: `-${circleSize}px`
  },
  rightArrowStyle: {
    height: 50
    , width: 50
    , position: 'absolute'
    , right: 0
    , top: '50%'
    , marginTop: `-${circleSize/2}px`
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
      , ActiveSlideComponent = availableSlideTypes[activeSlideObject.type].component
      , prevDisabled = isPrevDisabled(activeSlideIndex, lesson)
      , nextDisabled = isNextDisabled(activeSlideIndex, lesson)
      , onPrevClick = prevDisabled ? null : goToPrevSlide
      , onNextClick = nextDisabled ? null : goToNextSlide && handleSubmit

    return [
      <form className='lessonWizardForm' style={ styles.lessonWizardForm }  onSubmit={ handleSubmit }>
        <ActiveSlideComponent
          className={ 'lessonWizardFormContent' }
          slideData={ activeSlideObject }
        />
      </form>
      ,
      <div
        className={ cns('backButton', { 'disabled': prevDisabled }) }
        style={ styles.prevButton }
        onClick={ onPrevClick }
      >
        <KeyboardArrowLeft
          className={ cns('leftArrow', { 'disabled': prevDisabled }) }
          style={ styles.leftArrowStyle }
          onClick={ onPrevClick }
        />
      </div>
      ,
      <div
        className={ cns('nextButton', { 'disabled': nextDisabled }) }
        style={ styles.nextButton }
        onClick={ onNextClick }
      >
        <KeyboardArrowRight
          className={ cns('rightArrow', { 'disabled': nextDisabled }) }
          style={ styles.rightArrowStyle }
          onClick={ onNextClick }
        />
      </div>
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