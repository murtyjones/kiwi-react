import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { reduxForm, getFormValues } from 'redux-form'

import slides from './slides'
import SubmitButton from '../../../common/form/SubmitButton'
import ResultMessage from '../../../common/form/ResultMessage'
import './overrides.css'
import { register } from '../../../actions'

let formName = 'providerRegisterFlow'

class ProviderRegisterForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired
    , goToNextSlide: T.func.isRequired
  }

  render() {
    const { slide } = this.props
    const { submitText, Component, FieldComponent, fieldName, names } = slide

    return (
      <form
        className='providerRegisterForm'
        onSubmit={ this.props.handleSubmit }
      >
        <FieldComponent
          names={ names ? names : fieldName }
          component={ Component }
        />
        <SubmitButton
          text={ submitText }
          { ...this.props }
        />
        <ResultMessage
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
