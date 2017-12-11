import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import { connect } from 'react-redux'
import cns from 'classnames'
import { has } from 'lodash'
import { isPrevDisabled, isNextDisabled, isFinalSlide } from "../utils/lessonWizardUtils"
import { LESSON_SLIDE_TYPES } from '../constants'

// import slides
import FullPageText from './Slides/FullPageText'
import HalfHalf from './Slides/HalfHalf'
import FullPageCodeEditor from './Slides/FullPageCodeEditor'

import './overrides.css'

const formName = 'userLesson'

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

class UserLessonWizardForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    onSubmit: T.func.isRequired
    , activeSlideIndex: T.number.isRequired
    , lesson: T.object.isRequired
    , formValues: T.object.isRequired
    , goToNextSlide: T.func.isRequired
    , goToPrevSlide: T.func.isRequired
    , handleSubmit: T.func.isRequired
    , dispatch: T.func.isRequired
    , onFinalSlideNextClick: T.func.isRequired
    , currentValues: T.object.isRequired
  }

  setToViewed = (ref) => {
    console.log(`${ref}.isViewed`)
    this.props.dispatch(change(formName, `${ref}.isViewed`, true))
  }

  onPrev = () => {
    const { goToPrevSlide } = this.props
    goToPrevSlide()
  }

  onNext = (params) => {
    const { goToNextSlide, handleSubmit, currentValues } = this.props
    goToNextSlide()
    onSubmit(currentValues)
  }

  onFinalNext = (params) => {
    const { onFinalSlideNextClick, handleSubmit, currentValues, onSubmit } = this.props
    onSubmit(currentValues)
    onFinalSlideNextClick(params)
  }

  handleCodeSave = (v) => {
    const { onSubmit, activeSlideIndex, lesson, currentValues } = this.props
    onSubmit(currentValues)
  }

  renderSlide = ({ fields }) => {
    // this function should be kept outside the render method! otherwise child components will remount!!!
    const { activeSlideIndex, lesson } = this.props
    const activeSlideObject = lesson.slides[activeSlideIndex]
      , ActiveSlideComponent = availableSlideTypes[activeSlideObject.type].component

    return fields.map((name, i) => {
      return (i === activeSlideIndex) ? (
        <Field
          key={ `${name}.answer` }
          name={ `${name}.answer` }
          component={ ActiveSlideComponent }
          handleCodeSave={ this.handleCodeSave }
          className={ 'lessonWizardFormContent' }
          slideData={ activeSlideObject }
          setToViewed={ () => this.setToViewed(name) }
        />
      ) : null
    })
  }

  render() {
    const { handleSubmit, activeSlideIndex, lesson } = this.props

    const prevDisabled = isPrevDisabled(activeSlideIndex, lesson)
      , nextDisabled = isNextDisabled(activeSlideIndex, lesson)
      , onPrevClick = !prevDisabled ? this.onPrev : null
      , onNextClick = !nextDisabled ? isFinalSlide ? this.onFinalNext : this.onNext : null

    return [
      <form
        key='lessonWizardForm'
        className='lessonWizardForm'
        style={ styles.lessonWizardForm }
        onSubmit={ handleSubmit }
      >
        <FieldArray
          name='answerData'
          component={ this.renderSlide }
        />
      </form>
      ,
      <div
        key='backButton'
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
        key='nextButton'
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
      <div
        key='lessonBackground'
        className='lessonBackground'
        style={ styles.lessonBackground }
      />
    ]
  }
}





UserLessonWizardForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(UserLessonWizardForm)

export default reduxForm({
  form: formName
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
  , enableReinitialize: true
})(UserLessonWizardForm)