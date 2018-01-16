import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import { connect } from 'react-redux'
import { get, isEqual } from 'lodash'
import cns from 'classnames'

import { isPrevDisabled, isNextDisabled, isFinalSlide } from "../utils/lessonWizardUtils"
import { LESSON_SLIDE_TYPES } from '../constants'

// import slides
import FullPageText from './Slides/FullPageText'
import HalfHalf from './Slides/HalfHalf'
import FullPageCodeEditor from './Slides/FullPageCodeEditor'
import FullPageCodeExample from './Slides/FullPageCodeExample'
import Title from './Slides/Title'

import './overrides.css'

const formName = 'userLesson'

const defaultBackgroundClassName = 'lessonFullBackground'
const defaultWidth = '600px'

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
    , display: 'flex'
    , flexFlow: 'column'
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
  },
  themeContainer: {
    height: '100%'
    , width: '100%'
  },
  themeTable: {
    height: '100%'
    , position: 'relative'
    , width: '100%'
    , zIndex: -2
  },
  themeTableRow: {
    height: '50%'
    , position: 'relative'
    , width: '100%'
    , display: 'table'
    , zIndex: -2
  },
  themeQuadrant: {
    display: 'table-cell'
    , position: 'relative'
    , height: '100%'
    , overflow: 'visible'
    , zIndex: -1
  },
  asset: {
    display: 'inline-block'
    , position: 'absolute'
    , zIndex: 0
  }
}

const availableSlideTypes = {
  [LESSON_SLIDE_TYPES.FULL_PAGE_TEXT]: {
    component: FullPageText
    , backgroundClassName: 'lessonFullBackground'
    , width: '1000px'
  },
  // [LESSON_SLIDE_TYPES.HALF_HALF]: {
  //   component: HalfHalf
  //   , backgroundClassName: 'lessonFullBackground'
  //   , width: '1000px'
  // },
  [LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EXAMPLE]: {
    component: FullPageCodeExample
    , backgroundClassName: 'lessonFullBackground'
    , width: '1000px'
  },
  [LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR]: {
    component: FullPageCodeEditor
    , backgroundClassName: 'lessonFullBackground'
    , width: '1000px'
  },
  [LESSON_SLIDE_TYPES.TITLE]: {
    component: Title
    , backgroundClassName: 'lessonTitleBackground'
    , width: '600px'
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
    }
  }

  static propTypes = {
    onSubmit: T.func.isRequired
    , activeSlideIndex: T.number.isRequired
    , lesson: T.object.isRequired
    , theme: T.object.isRequired
    , formValues: T.object.isRequired
    , goToNextSlide: T.func.isRequired
    , goToPrevSlide: T.func.isRequired
    , handleSubmit: T.func.isRequired
    , dispatch: T.func.isRequired
    , onFinalSlideNextClick: T.func.isRequired
    , currentValues: T.object.isRequired
  }

  componentWillMount() {
    const { lesson, activeSlideIndex, theme } = this.props
    this.setActiveSlideObject(activeSlideIndex, lesson)
    if(theme) this.setThemeAssetsByQuadrant(theme)
    this.setPrevDisabled(activeSlideIndex, lesson)
    this.setNextDisabled(activeSlideIndex, lesson)
    this.setIsFinal(activeSlideIndex, lesson)
  }

  componentWillReceiveProps(nextProps) {
    const { lesson, activeSlideIndex, theme } = this.props
      , { lesson: nextLesson, activeSlideIndex: nextActiveSlideIndex, theme: nextTheme } = nextProps
      , lessonHasChanged = !isEqual(nextLesson, lesson)
      , activeSlideIndexHasChanged = nextActiveSlideIndex !== activeSlideIndex
      , themHasChanged = !isEqual(nextTheme, theme)

    if(lessonHasChanged || activeSlideIndexHasChanged) {
      this.setActiveSlideObject(nextActiveSlideIndex, nextLesson)
      this.setIsFinal(nextActiveSlideIndex, nextLesson)
      this.setPrevDisabled(nextActiveSlideIndex, nextLesson)
      this.setNextDisabled(nextActiveSlideIndex, nextLesson)
    }

    if(themHasChanged) {
      this.setThemeAssetsByQuadrant(nextTheme)
    }
  }

  setActiveSlideObject = (activeSlideIndex, lesson) =>
    this.setState({ activeSlideObject: lesson.slides[activeSlideIndex] })

  setThemeAssetsByQuadrant = (theme) =>
    this.setState({ themeAssetsByQuadrant: this.sortAssetsByQuadrant(theme) })

  setPrevDisabled = (activeSlideIndex, lesson) =>
    this.setState({ prevDisabled: isPrevDisabled(activeSlideIndex, lesson) })

  setNextDisabled = (activeSlideIndex, lesson) =>
    this.setState({ nextDisabled: isNextDisabled(activeSlideIndex, lesson) })

  setIsFinal = (activeSlideIndex, lesson) =>
    this.setState({ isFinal: isFinalSlide(activeSlideIndex, lesson) })

  setToViewed = (ref) => {
    this.props.dispatch(change(formName, `${ref}.isViewed`, true))
  }

  onPrev = () => {
    const { goToPrevSlide } = this.props
    goToPrevSlide()
  }

  onNext = (params) => {
    const { goToNextSlide, onSubmit, currentValues } = this.props
    goToNextSlide()
    onSubmit(currentValues)
  }

  onFinalNext = (params) => {
    const { onFinalSlideNextClick, currentValues, onSubmit } = this.props
    onSubmit(currentValues)
    onFinalSlideNextClick()
  }

  handleCodeSave = (v) => {
    const { onSubmit, currentValues } = this.props
    onSubmit(currentValues)
  }

  renderSlide = ({ fields }) => {
    // this function should be kept outside the render method! otherwise child components will remount!!!
    const { activeSlideIndex, lesson } = this.props
        , { activeSlideObject } = this.state
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

  sortAssetsByQuadrant = (theme) => {
    const assets = get(theme, 'assets', [])
    return assets.reduce((acc, asset) => {
      const renderedAsset = this.renderAsset(asset)
      if     (asset.quadrant === 'topLeft')     acc.topLeft.push(renderedAsset)
      else if(asset.quadrant === 'topRight')    acc.topRight.push(renderedAsset)
      else if(asset.quadrant === 'bottomLeft')  acc.bottomLeft.push(renderedAsset)
      else if(asset.quadrant === 'bottomRight') acc.bottomRight.push(renderedAsset)
      return acc
    }, {
      topLeft: []
      , topRight: []
      , bottomLeft: []
      , bottomRight: []
    })
  }

  renderAsset = (asset) =>
    <img
      key={ asset.url }
      src={ asset.url }
      style={ {
        ...styles.asset
        , [asset.relativeToTopOrBottom]: `${asset.y}%`
        , [asset.relativeToLeftOrRight]: `${asset.x}%`
        , [asset.specifyWidthOrHeight]: `${asset.percentageWidthOrHeight}%`
      } }
    />

  render() {
    const { handleSubmit, theme } = this.props
        , { activeSlideObject, themeAssetsByQuadrant, prevDisabled, nextDisabled, isFinal } = this.state
        , hasActiveSlideObjectType = activeSlideObject && activeSlideObject.type
        , activeSlideBackgroundClassName = hasActiveSlideObjectType ? availableSlideTypes[activeSlideObject.type].backgroundClassName : defaultBackgroundClassName
        , activeSlideWidth = hasActiveSlideObjectType ? availableSlideTypes[activeSlideObject.type].width : defaultWidth
        , hasTheme = !!theme
        , foregroundColor = hasTheme && theme.foregroundColor || ''
        , foregroundImage = hasTheme && theme.foregroundImageUrl || ''
        , backgroundColor = hasTheme && theme.backgroundColor || ''
        , backgroundImage = hasTheme && theme.backgroundImageUrl || ''
        , backgroundImageWidth = hasTheme && theme.backgroundImageWidth || 0
        , backgroundImageHeight = hasTheme && theme.backgroundImageHeight || 0
        , foregroundImageWidth = hasTheme && theme.foregroundImageWidth || 0
        , foregroundImageHeight = hasTheme && theme.foregroundImageHeight || 0
        , onPrevClick = !prevDisabled ? this.onPrev : null
        , onNextClick = !nextDisabled ? isFinal ? this.onFinalNext : this.onNext : null

    return [
      // Render form
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
      // Render buttons
      <div
        key='backButton'
        id='backButton'
        className={ cns('backButton', { 'disabled': prevDisabled }) }
        style={ styles.prevButton }
        onClick={ onPrevClick }
      >
        <KeyboardArrowLeft
          className={ cns('leftArrow', { 'disabled': prevDisabled }) }
          style={ styles.leftArrowStyle }
          onClick={ (e) => e.preventDefault() && onPrevClick() }
        />
      </div>
      ,
      <div
        key='nextButton'
        id='nextButton'
        className={ cns('nextButton', { 'disabled': nextDisabled }) }
        style={ styles.nextButton }
        onClick={ onNextClick }
      >
        <KeyboardArrowRight
          className={ cns('rightArrow', { 'disabled': nextDisabled }) }
          style={ styles.rightArrowStyle }
          onClick={ (e) => e.preventDefault() && onNextClick() }
        />
      </div>
      ,
      // Render white background
      <div
        key={ activeSlideBackgroundClassName }
        className={ activeSlideBackgroundClassName }
      />
      ,
      // Render theme if it exists
      hasTheme &&
        <div key='lessonTheme' style={ styles.themeTable }>
          <div
            key='background-background'
            style={ {
              position: 'absolute'
              , top: 0
              , left: 0
              , background: `${backgroundColor} url('${backgroundImage}')`
              , backgroundSize: `${backgroundImageWidth}px ${backgroundImageHeight}px`
              , backgroundRepeat: 'repeat'
              , height: `${theme.horizonY}%`
              , width: '100%'
              , zIndex: -2
            } }
          />
          <div
            key='background-foreground'
            style={ {
              position: 'absolute'
              , top: `${theme.horizonY}%`
              , left: 0
              , background: `${foregroundColor} url('${foregroundImage}')`
              , backgroundSize: `${foregroundImageWidth}px ${foregroundImageHeight}px`
              , backgroundRepeat: 'repeat'
              , width: '100%'
              , height: `${100-theme.horizonY}%`
              , zIndex: -2
            } }
          />
          <div
            key='top-row'
            style={ {
              ...styles.themeTableRow
              , height: `${theme.horizonY}%`
            } }
          >
            <div key='top-row-column-left' style={ styles.themeQuadrant }>
              { themeAssetsByQuadrant.topLeft }
            </div>
            <div
              key='top-row-column-middle'
              style={ {
                ...styles.themeQuadrant
                , width: activeSlideWidth
              } }
            />
            <div key='top-row-column-right' style={ styles.themeQuadrant }>
              { themeAssetsByQuadrant.topRight }
            </div>
          </div>
          <div
            key='bottom-row'
            style={ {
              ...styles.themeTableRow,
              height: `${100 - theme.horizonY}%`
            } }
          >
            <div key='bottom-row-column-left' style={ styles.themeQuadrant }>
              { themeAssetsByQuadrant.bottomLeft }
            </div>
            <div
              key='bottom-row-column-middle'
              style={ { ...styles.themeQuadrant, width: activeSlideWidth } }
            />
            <div key='bottom-row-column-right' style={ styles.themeQuadrant }>
              { themeAssetsByQuadrant.bottomRight }
            </div>
          </div>
        </div>
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