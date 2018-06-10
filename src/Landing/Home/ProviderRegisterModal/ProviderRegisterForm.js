import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { reduxForm, getFormValues } from 'redux-form'
import slides from './slides'
import SubmitButton from '../../../common/form/SubmitButton'

import './overrides.css'

let formName = 'providerRegisterFlow'

class ProviderRegisterForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired
    , goToNextSlide: T.func.isRequired
  }

  renderActiveSlide = () => {
    // still true???? -> this function should be kept outside the render
    // method! otherwise child components will remount!!!
    const { activeSlideIndex } = this.props
    const activeSlide = slides[activeSlideIndex]
    const { Component, FieldComponent, fieldName, names } = activeSlide

    return (
      <FieldComponent
        names={ names ? names : fieldName }
        component={ Component }
      />
    )
  }

  render() {
    const { handleSubmit, activeSlideIndex } = this.props

    const activeSlide = slides[activeSlideIndex]
    const { submitText } = activeSlide
    return (
      <form
        className='providerRegisterForm'
        onSubmit={ handleSubmit }
      >
        { this.renderActiveSlide() }
        <SubmitButton
          text={ submitText }
          { ...this.props }
        />
      </form>
    )
  }
}


ProviderRegisterForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(ProviderRegisterForm)

export default reduxForm({
  form: formName
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    const { password, confirmPassword } = values
    if(password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match!'
    }
    return errors
  }
})(ProviderRegisterForm)
