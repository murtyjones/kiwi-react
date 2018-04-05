import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import cns from 'classnames'

import { isPrevDisabled, isNextDisabled, isFinalSlide } from '../utils/lessonWizardUtils'
import { LESSON_SLIDE_TYPES } from '../constants'
import ActionBar from './ActionBar'
import { LessonTheme, LessonThemeBackground, sortAssetsByQuadrant } from './LessonTheme'

// import slides
import FullPageText from './Slides/FullPageText'
import FullPageCodeEditor from './Slides/FullPageCodeEditor'
import FullPageCodeExample from './Slides/FullPageCodeExample'
import Title from './Slides/Title'
import MultipleChoice from './Slides/MultipleChoice'

import './overrides.css'
import '../common/flex.css'

const formName = 'userLesson'

const defaultBackgroundClassName = 'lessonLargeBackground'
const defaultWidth = '600px'

const styles = {
  lessonWizardForm: {
    height:'100%'
    , overflow: 'auto'
    , position: 'absolute'
    , top: 0
  }
}

const availableSlideTypes = {
  [LESSON_SLIDE_TYPES.FULL_PAGE_TEXT]: {
    component: FullPageText
    , backgroundClassName: 'lessonSmallBackground'
    , width: '600px' // redundant, but needed for background assets width
  },
  [LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EXAMPLE]: {
    component: FullPageCodeExample
    , backgroundClassName: 'lessonSmallBackground'
    , width: '600px' // redundant, but needed for background assets width
  },
  [LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR]: {
    component: FullPageCodeEditor
    , backgroundClassName: 'lessonLargeBackground'
    , width: '1000px' // redundant, but needed for background assets width
    , includeRunButton: true
  },
  [LESSON_SLIDE_TYPES.TITLE]: {
    component: Title
    , backgroundClassName: 'lessonSmallBackground'
    , width: '600px' // redundant, but needed for background assets width
  },
  [LESSON_SLIDE_TYPES.MULTIPLE_CHOICE]: {
    component: MultipleChoice
    , backgroundClassName: 'lessonLargeBackground'
    , width: '1000px' // redundant, but needed for background assets width
    , includeCheckAnswerButton: true
  }
}

class UserLessonWizardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideObject: null
      , themeAssetsByQuadrant: null
      , prevDisabled: null
      , nextDisabled: null
      , isFinal: null
      , runCode: false
      , setChosenAnswerIndex: null
    }
  }

  static propTypes = {
    onSubmit: T.func.isRequired
    , activeSlideIndex: T.number.isRequired
    , lesson: T.object.isRequired
    , lessonTheme: T.object.isRequired
    , globalColors: T.object.isRequired
    , formValues: T.object.isRequired
    , goToNextSlide: T.func.isRequired
    , goToPrevSlide: T.func.isRequired
    , handleSubmit: T.func.isRequired
    , dispatch: T.func.isRequired
    , onFinalSlideNextClick: T.func.isRequired
    , currentValues: T.object.isRequired
    , isFetchingUserLessons: T.bool.isRequired
  }

  componentWillMount() {
    const { lesson, activeSlideIndex, lessonTheme, isFetchingUserLessons } = this.props
    this.setActiveSlideObject(activeSlideIndex, lesson)
    if(lessonTheme) this.setThemeAssetsByQuadrant(lessonTheme)
    this.setPrevDisabled(activeSlideIndex, lesson)
    this.setNextDisabled(activeSlideIndex, lesson, isFetchingUserLessons)
    this.setIsFinal(activeSlideIndex, lesson)
  }

  componentWillReceiveProps(nextProps) {
    const { lesson, activeSlideIndex, lessonTheme, isFetchingUserLessons } = this.props
      , { lesson: nextLesson, activeSlideIndex: nextActiveSlideIndex, lessonTheme: nextLessonTheme, isFetchingUserLessons: nextIsFetchingUserLessons } = nextProps
      , lessonHasChanged = !isEqual(nextLesson, lesson)
      , activeSlideIndexHasChanged = nextActiveSlideIndex !== activeSlideIndex
      , themeHasChanged = !isEqual(nextLessonTheme, lessonTheme)
      , isFetchingUserLessonsHasChanged = !isEqual(nextIsFetchingUserLessons, isFetchingUserLessons)

    if(lessonHasChanged || activeSlideIndexHasChanged) {
      this.setActiveSlideObject(nextActiveSlideIndex, nextLesson)
      this.setIsFinal(nextActiveSlideIndex, nextLesson)
      this.setPrevDisabled(nextActiveSlideIndex, nextLesson)
      this.setRunCode(false)
    }

    if(lessonHasChanged || activeSlideIndexHasChanged || isFetchingUserLessonsHasChanged) {
      this.setNextDisabled(nextActiveSlideIndex, nextLesson, nextIsFetchingUserLessons)
    }

    if(themeHasChanged) {
      this.setThemeAssetsByQuadrant(nextLessonTheme)
    }
  }

  setActiveSlideObject = (activeSlideIndex, lesson) =>
    this.setState({ activeSlideObject: lesson.slides[activeSlideIndex] })

  setThemeAssetsByQuadrant = lessonTheme =>
    this.setState({ themeAssetsByQuadrant: sortAssetsByQuadrant(lessonTheme) })

  setPrevDisabled = (activeSlideIndex, lesson) =>
    this.setState({ prevDisabled: isPrevDisabled(activeSlideIndex, lesson) })

  setNextDisabled = (activeSlideIndex, lesson, isFetchingUserLessons) =>
    this.setState({ nextDisabled: isNextDisabled(activeSlideIndex, lesson, isFetchingUserLessons) })

  setIsFinal = (activeSlideIndex, lesson) =>
    this.setState({ isFinal: isFinalSlide(activeSlideIndex, lesson) })

  setRunCode = flag => this.setState({ runCode: flag })

  setCheckAnswer = flag => this.setState({ checkAnswer: flag })

  setToViewed = ref => {
    this.props.dispatch(change(formName, `${ref}.isViewed`, true))
  }

  onPrev = () => {
    const { goToPrevSlide } = this.props
    goToPrevSlide()
  }

  submitCurrentValues = () => {
    const { onSubmit, currentValues } = this.props
    onSubmit(currentValues)
  }


  onNext = params => {
    this.props.goToNextSlide()
    this.submitCurrentValues()
  }

  onFinalNext = params => {
    this.submitCurrentValues()
    this.props.onFinalSlideNextClick()
  }

  renderSlide = ({ fields }) => {
    // this method should be kept outside of
    // the render method! otherwise child
    // components will remount on each rendering!
    const { activeSlideIndex, lesson, globalColors } = this.props
        , { activeSlideObject, runCode } = this.state
        , ActiveSlideComponent = availableSlideTypes[activeSlideObject.type].component
    return fields.map((name, i) =>
      i === activeSlideIndex
        ? (
          <Field
            key={ `${name}.answer` }
            name={ `${name}.answer` }
            component={ ActiveSlideComponent }
            runCode={ runCode }
            afterRunCode={ () => this.setRunCode(false) }
            className='lessonWizardFormContent flexZeroOneAuto'
            globalColors={ globalColors }
            slideData={ activeSlideObject }
            setToViewed={ () => this.setToViewed(name) }
            setChosenAnswerIndex={ this.setChosenAnswerIndex }
          />
        ) : null
    )
  }

  setChosenAnswerIndex = chosenAnswerIndex => this.setState({ chosenAnswerIndex })

  render() {
    const { handleSubmit, lessonTheme, globalColors } = this.props
        , { activeSlideObject, themeAssetsByQuadrant, prevDisabled, nextDisabled, isFinal, runCode, chosenAnswerIndex } = this.state
        , hasActiveSlideObjectType = activeSlideObject && activeSlideObject.type
        , activeSlideBackgroundClassName = hasActiveSlideObjectType ? availableSlideTypes[activeSlideObject.type].backgroundClassName : defaultBackgroundClassName
        , activeSlideWidth = hasActiveSlideObjectType ? availableSlideTypes[activeSlideObject.type].width : defaultWidth
        , includeRunButton = availableSlideTypes[activeSlideObject.type].includeRunButton
        , includeCheckAnswerButton = availableSlideTypes[activeSlideObject.type].includeCheckAnswerButton
        , onPrevClick = !prevDisabled ? this.onPrev : null
        , onNextClick = !nextDisabled ? isFinal ? this.onFinalNext : this.onNext : null

    return [
      <Fragment key='userLessonWizardForm'>
        <form
          className='lessonWizardForm flex flexFlowColumn'
          style={ styles.lessonWizardForm }
          onSubmit={ handleSubmit }
        >
          <FieldArray
            name='answerData'
            component={ this.renderSlide }
            // this line is needed so that child components
            // update when run code is set to true
            runCode={ runCode }
          />
        </form>
        <ActionBar
          onPrevClick={ onPrevClick }
          onNextClick={ onNextClick }
          onRunCode={ includeRunButton ? () => this.setRunCode(true) : null }
          onCheckAnswer={ includeCheckAnswerButton ? this.submitCurrentValues : null }
          chosenAnswerIndex={ chosenAnswerIndex }
          globalColors={ globalColors }
        />
        <LessonThemeBackground className={ activeSlideBackgroundClassName } />
        <LessonTheme
          lessonTheme={ lessonTheme }
          themeAssetsByQuadrant={ themeAssetsByQuadrant }
          activeSlideWidth={ activeSlideWidth }
        />
      </Fragment>
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