import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'

import { isPrevDisabled, isNextDisabled, isFinalSlide, hasSuccessCriteria } from '../utils/lessonWizardUtils'
import { LESSON_SLIDE_TYPES } from '../constants'
import ActionBar from './ActionBar'
import CustomSlideBackground from './CustomSlideBackground'
import { sortAssetsByQuadrant } from './LessonTheme'
import ResultCard from '../common/ResultCard/ResultCard'

// import slides
import FullPageText from './Slides/FullPageText'
import FullPageCodeEditor from './Slides/FullPageCodeEditor'
import FullPageCodeExample from './Slides/FullPageCodeExample'
import Title from './Slides/Title'
import MultipleChoice from './Slides/MultipleChoice'
import Narration from './Slides/Narration'

import './overrides.css'
import '../common/flex.css'

const formName = 'userLesson'

const styles = {
  lessonWizardForm: {
    height:'100%'
    , overflow: 'auto'
    , position: 'absolute'
    , top: 0
    , zIndex: 502
  }
}


const availableSlideTypes = {
  [LESSON_SLIDE_TYPES.FULL_PAGE_TEXT]: {
    component: FullPageText
  },
  [LESSON_SLIDE_TYPES.NARRATION]: {
    component: Narration
  },
  [LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EXAMPLE]: {
    component: FullPageCodeExample
  },
  [LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR]: {
    component: FullPageCodeEditor
    , includeRunButton: true
  },
  [LESSON_SLIDE_TYPES.TITLE]: {
    component: Title
  },
  [LESSON_SLIDE_TYPES.MULTIPLE_CHOICE]: {
    component: MultipleChoice
  }
}

class UserLessonWizardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideObject: null
      , prevDisabled: null
      , nextDisabled: null
      , isFinal: null
      , runCode: false
      , codeRanAtLeastOnce: false
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
    this.setPrevDisabled(activeSlideIndex, lesson)
    this.setNextDisabled(activeSlideIndex, lesson, isFetchingUserLessons, formValues)
    this.setIsFinal(activeSlideIndex, lesson)
  }

  componentWillReceiveProps(nextProps) {
    const lessonHasChanged = !isEqual(nextProps.lesson, this.props.lesson)
      , activeSlideIndexHasChanged = !isEqual(nextProps.activeSlideIndex, this.props.activeSlideIndex)
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

  setPrevDisabled = (activeSlideIndex, lesson) =>
    this.setState({ prevDisabled: isPrevDisabled(activeSlideIndex, lesson) })

  setNextDisabled = (...args) =>
    this.setState({ nextDisabled: isNextDisabled(...args) })

  setIsFinal = (activeSlideIndex, lesson) =>
    this.setState({ isFinal: isFinalSlide(activeSlideIndex, lesson) })

  setRunCode = async flag => this.setStateAsync({ runCode: flag })

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
    const formValues = this.addIsViewedToActiveSlide(this.props.formValues)
    this.props.goToNextSlide()
    this.props.onSubmit(formValues)
    this.setState({
      showResultCard: false,
      submitCurrentValues: false,
      checkAnswer: false,
      codeRanAtLeastOnce: false
    })
  }

  onFinalNext = async () => {
    const formValues = this.addIsViewedToActiveSlide(this.props.formValues)
    this.props.onSubmit(formValues)
    this.props.onFinalSlideNextClick()
    this.setState({
      showResultCard: false,
      submitCurrentValues: false,
      checkAnswer: false,
      codeRanAtLeastOnce: false
    })
  }

  addIsViewedToActiveSlide = formValues => {
    const { activeSlideIndex } = this.props
    const formValuesCopy = cloneDeep(formValues)
    formValuesCopy.answerData[activeSlideIndex].isViewed = true
    return formValuesCopy
  }

  renderSlide = ({ fields }) => {
    // this method should be kept outside of
    // the render method! otherwise child
    // components will remount on each rendering!
    const { activeSlideIndex, globalColors, variablesWithUserValues, formValues } = this.props
        , { activeSlideObject, runCode } = this.state
        , ActiveSlideComponent = availableSlideTypes[activeSlideObject.type].component
        , slideAnswerData = get(formValues, `answerData[${activeSlideIndex}]`, {})

    return fields.map((ref, i) =>
      i === activeSlideIndex
        ? (
          <Field
            key={ `${ref}.answer` }
            name={ `${ref}.answer` }
            component={ ActiveSlideComponent }
            runCode={ runCode }
            afterRunCode={ async (err, codeOutput) => {
              this.setRunCode(false)
              await this.setStateAsync({ showResultCard: false, codeRanAtLeastOnce: true })
              if(!err) this.setCodeOutput(ref, codeOutput)
            } }
            className='lessonWizardFormContent flexZeroOneAuto'
            globalColors={ globalColors }
            slideData={ activeSlideObject }
            setFormGlobalVariable={ (varRef, v) =>
              this.setFormGlobalVariable(`${ref}.${varRef}`, v)
            }
            variablesWithUserValues={ variablesWithUserValues }
            slideAnswerData={ slideAnswerData }
          />
        ) : null
    )
  }

  render() {
    const { handleSubmit, globalColors, activeSlideIndex, formValues } = this.props
      , { activeSlideObject, prevDisabled, nextDisabled, isFinal, runCode, showResultCard, codeRanAtLeastOnce } = this.state
      , includeRunButton = availableSlideTypes[activeSlideObject.type].includeRunButton
      , includesSuccessCriteria = hasSuccessCriteria(activeSlideObject)
      , onPrevClick = !prevDisabled ? this.onPrev : null
      , onNextClick = !nextDisabled ? isFinal ? this.onFinalNext : this.onNext : null
      , slideAnswerData = get(formValues, `answerData[${activeSlideIndex}]`, {})
      , hasBeenAnswered = codeRanAtLeastOnce || !!slideAnswerData.answer || slideAnswerData.answer === 0 // for multiple choice slides

    return (
      <Fragment>
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
          includesSuccessCriteria={ includesSuccessCriteria }
          onCheckAnswer={ includesSuccessCriteria && hasBeenAnswered
            ? () => this.setState({
              checkAnswer: true, submitCurrentValues: true
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
        { activeSlideObject.backgroundImageUrl &&
          <CustomSlideBackground src={ activeSlideObject.backgroundImageUrl } />
        }
      </Fragment>
    )
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
