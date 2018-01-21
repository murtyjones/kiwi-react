import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

import RecoveryImages from '../WelcomeWizard/slides/RecoveryImages'
import ResetPassword from './slides/ResetPassword'
import insertIf from '../utils/insertIf'

import './overrides.css'

const formName = 'forgotPassword'
  , circleSize = 80
  , iconSize = 70

const styles = {
  forgotPasswordWizardForm: {
    width: '100%'
    , height: '100%'
    , position: 'relative'
    , backgroundColor: '#765C9F'
    , color: '#FFFFFF'
  },
  forgotPwPrevButton: {
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
  forgotPwNextButton: {
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
  , leftArrowColor: '#3E2E61',
  title: {
    marginTop: 0
    , paddingTop: '5%'
    , textAlign: 'center'
  },
  subtitle: {
    margin: 0
    , textAlign: 'center'
    , padding: '20px 30%'
    , paddingTop: 0
  }
}

export const slides = [
  {
    component: RecoveryImages
    , title: 'Guess your recovery images'
    , subtitle: 'To reset your password, select the three images you picked when you signed up.'
    , fieldName: 'images'
    , fieldType: FieldArray
    , action: 'checkPasswordRecoveryCorrectness'
  },
  {
    component: ResetPassword
    , fieldName: 'password'
    , fieldType: Field
  }
]

class ForgotPasswordWizardForm extends Component {
  constructor(props) {
    super(props)
  }

  onPrev = () => {
    const { goToPrevSlide } = this.props
    goToPrevSlide()
  }

  onNext = (params) => {
    const { goToNextSlide, onSubmit, formValues } = this.props
    onSubmit(formValues)
    goToNextSlide()
  }

  onFinalNext = (params) => {
    const { onFinalSlideNextClick, formValues, onSubmit } = this.props
    onSubmit(formValues)
    onFinalSlideNextClick()
  }

  renderActiveSlide = () => {
    // still true???? -> this function should be kept outside the render method! otherwise child components will remount!!!
    const { activeSlideIndex } = this.props
      , activeSlide = slides[activeSlideIndex]
      , ActiveSlideComponent = activeSlide.component
      , ActiveSlideFieldType = activeSlide.fieldType

    return [
      ...insertIf(activeSlide.title,
        <h1
          key='activeSlideTitle'
          style={ styles.title }
        >
          { activeSlide.title }
        </h1>
      )
      ,
      ...insertIf(activeSlide.subtitle,
        <h5
          key='activeSlideSubtitle'
          style={ styles.subtitle }
        >
          { activeSlide.subtitle }
        </h5>
      )
      ,
      <ActiveSlideFieldType
        key={ activeSlide.fieldName }
        name={ activeSlide.fieldName }
        component={ ActiveSlideComponent }
      />
    ]
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
        key='forgotPasswordWizardForm'
        className='forgotPasswordWizardForm'
        style={ styles.forgotPasswordWizardForm }
        onSubmit={ handleSubmit }
      >
        { this.renderActiveSlide() }
      </form>
      ,
      // Render buttons
      <div
        key='welcomeBackButton'
        id='welcomeBackButton'
        className={ cns('welcomeBackButton', { 'disabled': prevDisabled }) }
        style={ styles.forgotPwPrevButton }
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
        key='forgotPwNextButton'
        id='forgotPwNextButton'
        className={ cns('forgotPwNextButton', { 'disabled': nextDisabled }) }
        style={ styles.forgotPwNextButton }
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


ForgotPasswordWizardForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(ForgotPasswordWizardForm)

export default reduxForm({
  form: formName
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
  , enableReinitialize: true
})(ForgotPasswordWizardForm)