import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import { connect } from 'react-redux'
import { get } from 'lodash'
import cns from 'classnames'

import { isPrevDisabled, isNextDisabled, isFinalSlide } from "../utils/lessonWizardUtils"
import { LESSON_SLIDE_TYPES } from '../constants'

// import slides
import FullPageText from './Slides/FullPageText'
import HalfHalf from './Slides/HalfHalf'
import FullPageCodeEditor from './Slides/FullPageCodeEditor'
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
  foreground: {
    width: '100%'
    , height: '180px'
    , position: 'absolute' // required for z-index to work
    , zIndex: -2
  },
  background: {
    width: '100%'
    , top: '180px'
    , bottom: 0
    , position: 'absolute' // required for z-index to work
    , zIndex: -2
  },
  asset: {
    display: 'inline-block'
    , position: 'absolute'
  },
  themeQuadrant: {
    display: 'table-cell'
    , position: 'relative'
    , overflow: 'auto'
    , height: '100%'
  },
  themeTable: {
    height: '100%'
    , width: '100%'
  },
  themeTableRow: {
    height: '50%'
    , width: '100%'
    , display: 'table'
  }
}

const availableSlideTypes = {
  [LESSON_SLIDE_TYPES.FULL_PAGE_TEXT]: {
    component: FullPageText
    , backgroundClassName: 'lessonFullBackground'
    , width: '1000px'
  },
  [LESSON_SLIDE_TYPES.HALF_HALF]: {
    component: HalfHalf
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

  sortAssetsByQuadrant = (theme) => {
    const assets = get(theme, 'assets', [])
    return assets.reduce((acc, asset) => {
      if(asset.quadrant === 'topLeft')
        acc.topLeft.push(asset)
      else if(asset.quadrant === 'topRight')
        acc.topRight.push(asset)
      else if(asset.quadrant === 'bottomLeft')
        acc.bottomLeft.push(asset)
      else if(asset.quadrant === 'bottomRight')
        acc.bottomRight.push(asset)
      return acc
    }, {
      topLeft: []
      , topRight: []
      , bottomLeft: []
      , bottomRight: []
    })
  }

  renderQuadrantAssets = (quadrantAssets) => {
    return quadrantAssets.map((asset, i) =>
      <img
        src={ asset.url }
        style={ {
         ...styles.asset
         , [asset.relativeToTopOrBottom]: `${asset.y}%`
         , [asset.relativeToLeftOrRight]: `${asset.x}%`
        } }
      />

    )
  }

  render() {
    const { handleSubmit, activeSlideIndex, lesson, theme } = this.props
    const activeSlideObject = lesson.slides[activeSlideIndex]
    const activeSlideBackgroundClassName = activeSlideObject && activeSlideObject.type ? availableSlideTypes[activeSlideObject.type].backgroundClassName : defaultBackgroundClassName
    const activeSlideWidth = activeSlideObject && activeSlideObject.type ? availableSlideTypes[activeSlideObject.type].width : defaultWidth

    const themeAssetsByQuadrant = this.sortAssetsByQuadrant(theme)

    const prevDisabled = isPrevDisabled(activeSlideIndex, lesson)
      , nextDisabled = isNextDisabled(activeSlideIndex, lesson)
      , isFinal = isFinalSlide(activeSlideIndex, lesson)
      , onPrevClick = !prevDisabled ? this.onPrev : null
      , onNextClick = !nextDisabled ? isFinal ? this.onFinalNext : this.onNext : null

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
        id='backButton'
        className={ cns('backButton', { 'disabled': prevDisabled }) }
        style={ styles.prevButton }
        onClick={ onPrevClick }
      >
        <KeyboardArrowLeft
          className={ cns('leftArrow', { 'disabled': prevDisabled }) }
          style={ styles.leftArrowStyle }
          onClick={ (e) => e.preventDefault() && onPrevClick() } // prevents triggering of parent onClick
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
          onClick={ (e) => e.preventDefault() && onNextClick() } // prevents triggering of parent onClick
        />
      </div>
      ,
      <div
        key={ activeSlideBackgroundClassName }
        className={ activeSlideBackgroundClassName }
      />
      ,
      <div
        style={ styles.themeTable }
      >
        <div style={ { ...styles.themeTableRow, backgroundColor: theme.backgroundColor, height: `${theme.horizonY}%` } }>
          <div style={ styles.themeQuadrant }>
            { this.renderQuadrantAssets(themeAssetsByQuadrant.topLeft) }
          </div>
          <div style={ { ...styles.themeQuadrant, width: activeSlideWidth } } />
          <div style={ styles.themeQuadrant }>
            { this.renderQuadrantAssets(themeAssetsByQuadrant.topRight) }
          </div>
        </div>
        <div style={ { ...styles.themeTableRow, backgroundColor: theme.foregroundColor, height: `${100 - theme.horizonY}%` } }>
          <div style={ styles.themeQuadrant }>
            { this.renderQuadrantAssets(themeAssetsByQuadrant.bottomLeft) }
          </div>
          <div style={ { ...styles.themeQuadrant, width: activeSlideWidth } } />
          <div style={ styles.themeQuadrant }>
            { this.renderQuadrantAssets(themeAssetsByQuadrant.bottomRight) }
            </div>
        </div>
      </div>
      /*,
      <div style={ styles.themeContainer }>
        <div
          key='themeForeground'
          className='themeForeground'
          style={ {
            ...styles.foreground
            , backgroundColor: theme.backgroundColor
          } }
        />
        <div
          key='themeForeground'
          className='themeForeground'
          style={ {
            ...styles.background
            , backgroundColor: theme.foregroundColor
          } }
        />
        { (theme.assets || []).map((asset, i) =>
          <div
            style={ {
              ...styles.asset
              , top: `${asset.y}px`
              , [asset.relativeTo]: `${asset.x}%`
            } }
          >
            <img src={ asset.url } />
          </div>
        ) }
      </div>*/
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