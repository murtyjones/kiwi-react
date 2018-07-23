import React, { Component } from 'react'
import { connect } from 'react-redux'
import cns from 'classnames'
import { reduxForm, getFormValues } from 'redux-form'

import slides from './slides'
import insertIf from '../utils/insertIf'

import './overrides.css'

const formName = 'welcome'
  , circleSize = 80
  , iconSize = 70

const styles = {
  welcomeWizardForm: {
    width: '100%'
    , height: '100%'
    , position: 'relative'
    , backgroundColor: '#765C9F'
    , color: '#FFFFFF'
  },
  leftArrowStyle: {
    height: iconSize
    , width: iconSize
    , position: 'absolute'
    , left: 0
    , top: '50%'
    , marginTop: `-${circleSize/2}px`
  },
  welcomeNextButton: {
    position: 'absolute'
    , width: '110px'
    , bottom: '10%'
    , left: '50%'
    , marginLeft: '-55px'
    , textAlign: '-webkit-center'
  },
  title: {
    marginTop: 0
    , paddingTop: '5%'
    , textAlign: '-webkit-center'
  },
  subtitle: {
    margin: 0
    , textAlign: '-webkit-center'
    , padding: '20px 30%'
    , paddingTop: 0
  }
}

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
    const { handleSubmit, activeSlideIndex } = this.props
      , activeSlide = slides[activeSlideIndex]
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
      <div
        key='welcomeNextButton'
        id='welcomeNextButton'
        className={ cns('greenButton hvr-grow', {
          'disabled': nextDisabled
        }) }
        style={ styles.welcomeNextButton }
        onClick={ onNextClick }
      >
        { activeSlide.nextText }
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
