import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { reduxForm, getFormValues, unregisterField } from 'redux-form'

import SubmitButton from '../../../common/form/SubmitButton'
import ResultMessage from '../../../common/form/ResultMessage'
import { passwordsMatch } from '../../../utils/validationUtils'

import './overrides.css'

let formName = 'providerRegisterFlow'

const SlideHeader = props =>
  <h3 className='providerRegisterForm-header'>{ props.text }</h3>

class ProviderRegisterForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired
    , goToNextSlide: T.func.isRequired
  }

  render() {
    const { slide, formValues } = this.props
    const { submitText, Component, FieldComponent, fieldName, names, name } = slide

    const nameOrNames = {}
    if (names) nameOrNames.names = names
    else nameOrNames.name = name

    const headerProps = {}
    if (slide.headerText) headerProps.text = slide.headerText
    else headerProps.text = slide.headerTextMaker(formValues)

    return (
      <form
        className='providerRegisterForm'
        onSubmit={ this.props.handleSubmit }
      >
        <SlideHeader
          { ...headerProps }
        />
        <FieldComponent
          { ...nameOrNames }
          component={ Component }
          goToPrevSlide={ this.props.goToPrevSlide }
          formValues={ formValues }
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
  , onSubmitSuccess: (result, dispatch) =>
    dispatch(unregisterField(formName, 'submitSucceeded'))
  , validate: values => {
    const errors = {}
    const { password, confirmPassword, providees = [] } = values
    if (!passwordsMatch(password, confirmPassword)) {
      errors.confirmPassword = 'Passwords must match!'
    }
    errors.providees = providees.map((each = {}) => {
      const providerErrors = {}
      if (!passwordsMatch(each.password, each.confirmPassword))
        providerErrors.confirmPassword = 'Passwords must match!'
      return providerErrors
    })
    return errors
  }
})(ProviderRegisterForm)
