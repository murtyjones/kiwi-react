import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

import { isPrevDisabled, isNextDisabled, isFinalSlide, viewedEqualsComplete } from '../utils/lessonWizardUtils'
import { LESSON_SLIDE_TYPES } from '../constants'
import ActionBar from './ActionBar'
import { LessonTheme, LessonThemeBackground, sortAssetsByQuadrant } from './LessonTheme'
import ResultCard from '../common/ResultCard/ResultCard'

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
      , showResultCard: false
      , checkAnswer: false
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
    , isFetchingUserLessons: T.bool.isRequired
    , variablesWithUserValues: T.array.isRequired
  }

  componentWillMount() {
    const { lesson, activeSlideIndex, lessonTheme, formValues, isFetchingUserLessons } = this.props
    this.setActiveSlideObject(activeSlideIndex, lesson)
    if(lessonTheme) this.setThemeAssetsByQuadrant(lessonTheme)
    this.setPrevDisabled(activeSlideIndex, lesson)
    this.setNextDisabled(activeSlideIndex, lesson, isFetchingUserLessons, formValues)
    this.setIsFinal(activeSlideIndex, lesson)
  }

  componentWillReceiveProps(nextProps) {
    const lessonHasChanged = !isEqual(nextProps.lesson, this.props.lesson)
      , activeSlideIndexHasChanged = !isEqual(nextProps.activeSlideIndex, this.props.activeSlideIndex)
      , themeHasChanged = !isEqual(nextProps.lessonTheme, this.props.lessonTheme)
      , isFetchingUserLessonsHasChanged = !isEqual(nextProps.isFetchingUserLessons, this.props.isFetchingUserLessons)
      , formValuesHasChanged = !isEqual(nextProps.formValues, this.props.formValues)

    if(lessonHasChanged || activeSlideIndexHasChanged) {
      this.setActiveSlideObject(nextProps.activeSlideIndex, nextProps.lesson)
      this.setIsFinal(nextProps.activeSlideIndex, nextProps.lesson)
      this.setPrevDisabled(nextProps.activeSlideIndex, nextProps.lesson)
      this.setRunCode(false)
    }

    if(lessonHasChanged || activeSlideIndexHasChanged || isFetchingUserLessonsHasChanged || formValuesHasChanged) {
      this.setNextDisabled(nextProps.activeSlideIndex, nextProps.lesson, nextProps.isFetchingUserLessons, nextProps.formValues)
    }

    if(themeHasChanged) {
      this.setThemeAssetsByQuadrant(nextProps.lessonTheme)
    }
  }

  async componentWillUpdate(nextProps, nextState) {
    const slideCurrentValues = get(nextProps.formValues, `answerData[${nextProps.activeSlideIndex}]`)
    const slideOldValues = get(this.props.formValues, `answerData[${nextProps.activeSlideIndex}]`)
    const slideHasUpdated = slideCurrentValues.updatedAt !== slideOldValues.updatedAt
    const codeHasRun = !nextState.runCode && this.state.runCode
    const noCodeRunNeeded = !nextState.runCode && !this.state.runCode

    // if an answer was graded, show the result
    if(nextState.checkAnswer && slideHasUpdated) {
      this.setState({ checkAnswer: false, showResultCard: true })
    }

    // if an answer needs to be graded and code editor has run the code,
    // submit current values and switch off submit current values
    if(nextState.checkAnswer && nextState.submitCurrentValues && (codeHasRun || noCodeRunNeeded)) {
      nextProps.onSubmit(nextProps.formValues)
      this.setState({ submitCurrentValues: false, showResultCard: false })
    }

    if(nextProps.activeSlideIndex !== this.props.activeSlideIndex) {
      await this.setStateAsync({ showResultCard: false })
    }
  }

  setActiveSlideObject = (activeSlideIndex, lesson) =>
    this.setState({ activeSlideObject: lesson.slides[activeSlideIndex] })

  setThemeAssetsByQuadrant = lessonTheme =>
    this.setState({ themeAssetsByQuadrant: sortAssetsByQuadrant(lessonTheme) })

  setPrevDisabled = (activeSlideIndex, lesson) =>
    this.setState({ prevDisabled: isPrevDisabled(activeSlideIndex, lesson) })

  setNextDisabled = (...args) =>
    this.setState({ nextDisabled: isNextDisabled(...args) })

  setIsFinal = (activeSlideIndex, lesson) =>
    this.setState({ isFinal: isFinalSlide(activeSlideIndex, lesson) })

  setRunCode = async flag => await this.setStateAsync({ runCode: flag })

  setToViewed = ref =>
    this.props.dispatch(change(formName, `${ref}.isViewed`, true))

  setCodeOutput = (ref, codeOutput) =>
    this.props.dispatch(change(formName, `${ref}.codeOutput`, codeOutput))

  setFormGlobalVariable = (ref, { variableId, value }) => {
    this.props.dispatch(change(formName, `${ref}.variableId`, variableId))
    this.props.dispatch(change(formName, `${ref}.value`, value))
  }

  onPrev = () => {
    const { goToPrevSlide } = this.props
    goToPrevSlide()
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  onNext = async () => {
    this.props.goToNextSlide()
    this.props.onSubmit(this.props.formValues)
    this.setState({ showResultCard: false, submitCurrentValues: false, checkAnswer: false })
  }

  onFinalNext = async () => {
    this.props.onFinalSlideNextClick()
    this.setState({ showResultCard: false, submitCurrentValues: false, checkAnswer: false })
  }

  renderSlide = ({ fields }) => {
    // this method should be kept outside of
    // the render method! otherwise child
    // components will remount on each rendering!
    const { activeSlideIndex, globalColors, variablesWithUserValues } = this.props
        , { activeSlideObject, runCode } = this.state
        , ActiveSlideComponent = availableSlideTypes[activeSlideObject.type].component

    return fields.map((ref, i) =>
      i === activeSlideIndex
        ? (
          <Field
            key={ `${ref}.answer` }
            name={ `${ref}.answer` }
            component={ ActiveSlideComponent }
            runCode={ runCode }
            afterRunCode={ codeOutput => {
              this.setRunCode(false)
              this.setCodeOutput(ref, codeOutput)
            } }
            className='lessonWizardFormContent flexZeroOneAuto'
            globalColors={ globalColors }
            slideData={ activeSlideObject }
            setToViewed={ () => this.setToViewed(ref) }
            setFormGlobalVariable={ (varRef, v) => this.setFormGlobalVariable(`${ref}.${varRef}`, v) }
            variablesWithUserValues={ variablesWithUserValues }
          />
        ) : null
    )
  }

  render() {
    const { handleSubmit, lessonTheme, globalColors, activeSlideIndex, formValues } = this.props
        , { activeSlideObject, themeAssetsByQuadrant, prevDisabled, nextDisabled, isFinal, runCode, showResultCard } = this.state
        , hasActiveSlideObjectType = activeSlideObject && activeSlideObject.type
        , activeSlideBackgroundClassName = hasActiveSlideObjectType ? availableSlideTypes[activeSlideObject.type].backgroundClassName : defaultBackgroundClassName
        , activeSlideWidth = hasActiveSlideObjectType ? availableSlideTypes[activeSlideObject.type].width : defaultWidth
        , includeRunButton = availableSlideTypes[activeSlideObject.type].includeRunButton
        , includeCheckAnswerButton = !viewedEqualsComplete(activeSlideObject)
        , onPrevClick = !prevDisabled ? this.onPrev : null
        , onNextClick = !nextDisabled ? isFinal ? this.onFinalNext : this.onNext : null
        , slideAnswerData = get(formValues, `answerData[${activeSlideIndex}]`, {})
        , includesCodeSuccessCriteria = activeSlideObject.shouldIncludeSuccessCriteria

    return [
      <Fragment key='userLessonWizardForm'>
        <ResultCard
          slideAnswerData={ slideAnswerData }
          currentLessonSlide={ activeSlideObject }
          showResultCard={ showResultCard }
          toggleShowResultCard={ () => this.setState({ showResultCard: false }) }
        />
        <ActionBar
          onPrevClick={ onPrevClick }
          onNextClick={ onNextClick }
          onRunCode={ includeRunButton ? () => this.setRunCode(true) : null }
          onCheckAnswer={ includeCheckAnswerButton ? () => this.setState({
            runCode: includesCodeSuccessCriteria, checkAnswer: true, submitCurrentValues: true
          }) : null }
          globalColors={ globalColors }
          slideAnswerData={ slideAnswerData }
        />
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