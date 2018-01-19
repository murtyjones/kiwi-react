import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

import RecoveryImages from './slides/RecoveryImages'

import './overrides.css'

const formName = 'welcome'
const circleSize = 80
  , iconSize = 70

const styles = {
  welcomeWizardForm: {
    width: '100%'
    , height: '100%'
    , position: 'relative'
    , backgroundColor: '#765C9F'
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
    height: iconSize
    , width: iconSize
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
    height: iconSize
    , width: iconSize
    , position: 'absolute'
    , right: 0
    , top: '50%'
    , marginTop: `-${circleSize/2}px`
  }
  , rightArrowColor: '#3E2E61'
  , leftArrowColor: '#3E2E61'
}

const slides = [
  {
    component: RecoveryImages
    , title: 'Set your recovery images'
    , fieldName: 'recovery'
  }
]

class WelcomeWizardForm extends Component {
  constructor(props) {
    super(props)
  }

  onPrev = () => {
    const { goToPrevSlide } = this.props
    goToPrevSlide()
  }

  onNext = (params) => {
    const { goToNextSlide, onSubmit, formValues } = this.props
    goToNextSlide()
    onSubmit(formValues)
  }

  onFinalNext = (params) => {
    const { onFinalSlideNextClick, formValues, onSubmit } = this.props
    onSubmit(formValues)
    onFinalSlideNextClick()
  }

  renderActiveSlide = () => {
    // still true???? -> this function should be kept outside the render method! otherwise child components will remount!!!
    const { activeSlideIndex } = this.props
      , ActiveSlideComponent = slides[activeSlideIndex].component
      , activeSlideFieldName = slides[activeSlideIndex].fieldName

    return (
      <Field
        key={ `${activeSlideFieldName}.answer` }
        name={ `${activeSlideFieldName}.answer` }
        component={ ActiveSlideComponent }
      />
    )
  }

  render() {
    const { handleSubmit } = this.props
      , prevDisabled = false
      , nextDisabled = false
      , isFinal = false
      , onPrevClick = !prevDisabled ? this.onPrev : null
      , onNextClick = !nextDisabled ? isFinal ? this.onFinalNext : this.onNext : null

    return [
      // Render form
      <form
        key='welcomeWizardForm'
        className='welcomeWizardForm'
        style={ styles.welcomeWizardForm }
        onSubmit={ handleSubmit }
      >
        { this.renderActiveSlide() }
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
          color={ styles.leftArrowColor }
          onClick={ e => e.preventDefault() && onPrevClick() }
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
          color={ styles.rightArrowColor }
          onClick={ e => e.preventDefault() && onNextClick() }
        />
      </div>
    ]
  }
}


WelcomeWizardForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(WelcomeWizardForm)

export default reduxForm({
  form: formName
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
  , enableReinitialize: true
})(WelcomeWizardForm)