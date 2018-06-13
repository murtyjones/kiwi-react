import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import KiwiTextField from '../../common/form/KiwiTextField'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import validateEmailAvailability from './validateEmailAvailability'
import asyncDebounce from 'debounce-promise'

export const formName = 'account'

const styles = {
  form: {
    width: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  }
}

class AccountForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onVerificationEmailClick: T.func.isRequired
  }

  resendVerificationEmail = () => {
    this.props.onVerificationEmailClick()
  }

  render() {
    const { handleSubmit, isEmailVerified = true } = this.props
    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='firstName'
          label='First Name'
          component={ KiwiTextField }
          style={ {
            width: '50%', display: 'inline-block',
            paddingRight: '3px', boxSizing: 'border-box'
          } }
        />
        <Field
          name='lastName'
          label='Last Name'
          component={ KiwiTextField }
          style={ {
            width: '50%', display: 'inline-block',
            paddingRight: '3px', boxSizing: 'border-box'
          } }
        />
        <Field
          name='email'
          label='Email'
          component={ KiwiTextField }
          successText='That email is available!'
        />
        { !isEmailVerified &&
          <div className='emailVerificationLine-text'>
            Your email needs to be verified.&nbsp;
            <Link
              to='#'
              onClick={ this.resendVerificationEmail }
            >
              Click here to resend verification email.
            </Link>
          </div>
        }
        <SubmitButton
          text='Save'
          { ...this.props }
          onClick={ handleSubmit }
        />
        <ResultMessage
          { ...this.props }
          successMessage='Your profile has been updated!'
        />
      </form>
    )
  }
}

export default reduxForm({
  form: formName
  , enableReinitialize: true
  , shouldAsyncValidate: (params) => {
    if (!params.syncValidationPasses) {
      return false
    }
    switch (params.trigger) {
      case 'blur':
      case 'change':
        // blurring or changing
        return true
      case 'submit':
        // submitting, so only async validate if form is dirty or was never initialized
        // conversely, DON'T async validate if the form is pristine just as it was
        // initialized
        // return !params.pristine || !params.initialized
        return false
      default:
        return false
    }
  }
  , asyncValidate: asyncDebounce((...p) => validateEmailAvailability(...p), 1000)
  , asyncChangeFields: ['email']
})(AccountForm)
