import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import { Toggle, SelectField } from 'redux-form-material-ui'
import { isEmpty, isEqual } from 'lodash'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import validateEmailAvailability from './validateEmailAvailability'
import asyncDebounce from 'debounce-promise'

export const formName = 'profile'

const styles = {
  form: {
    width: 'calc(100% - 20px)' // 20px padding offset
    , height: '100%'
    , padding: '10px'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  },
  result: {
    paddingTop: '10px'
  },
  failure: { color: '#cc5040' },
  success: { color: '#66cc52' }
}

class ProfileForm extends Component {
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
    const { handleSubmit, pristine, submitting, submitFailed, submitSucceeded, initialValues, error } = this.props

    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='name'
          hintText='Name'
          component={ renderTextField }
          style={ { width: '100%' } }
        />
        <Field
          name='email'
          hintText='Email'
          component={ renderTextField }
          style={ { width: '100%' } }
          asyncValidMessage='That email is available!'
        />
        { initialValues && !initialValues.isEmailVerified &&
          <div className='email-verification-line'>
            Your email needs to be verified.&nbsp;
          <Link
            to='#'
            onClick={ this.resendVerificationEmail }
          >
            Click here to resend verification email.
          </Link>
          </div>
        }
        <Button variant='outlined' type='submit' onClick={ handleSubmit } disabled={ pristine || submitting }>
          Save
        </Button>
        { submitting && <span>Saving...</span> }
        <div style={ styles.result }>
          { submitFailed && error && <span style={ styles.failure }>{ get(error, 'error_description', error) }</span> }
          { submitSucceeded && <span style={ styles.success }>Your profile has been updated!</span> }
        </div>
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
})(ProfileForm)
