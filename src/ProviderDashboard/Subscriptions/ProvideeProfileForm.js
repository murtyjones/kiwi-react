import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import Button from '@material-ui/core/Button'
import { Toggle, SelectField } from 'redux-form-material-ui'
import get from 'lodash/get'
import asyncDebounce from 'debounce-promise'

import renderTextField from '../../common/renderTextField'
import validateUsernameAvailability from './validateUsernameAvailability'

export const formName = 'provideeProfile'

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

class ProvideeProfileForm extends Component {
  constructor(props) {
    super(props)

  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
  }

  render() {
    const { handleSubmit, pristine, submitting, submitFailed, submitSucceeded, error } = this.props
    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='username'
          hintText='Username'
          component={ renderTextField }
          style={ { width: '100%' } }
          asyncValidMessage='That username is available!'
        />
        <Field
          name='newPassword'
          type='password'
          hintText='New Password'
          component={ renderTextField }
          style={ { width: '100%' } }
        />
        <Field
          name='confirmNewPassword'
          type='password'
          hintText='Confirm New Password'
          component={ renderTextField }
          style={ { width: '100%' } }
        />
        <Button variant='outlined' type='submit' onClick={ handleSubmit } disabled={ pristine || submitting }>
          Save
        </Button>
        { submitting && <span>Saving...</span> }
        <div style={ styles.result }>
          { submitFailed && error && <span style={ styles.failure }>{ get(error, 'error_description', error) }</span> }
          { submitSucceeded && <span style={ styles.success }>Profile updated!</span> }
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: formName
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    if(!values.currentPassword && (values.newPassword || values.confirmNewPassword)) {
      errors.currentPassword = 'Required'
    }
    if(!values.newPassword && (values.currentPassword || values.confirmNewPassword)) {
      errors.newPassword = 'Required'
    }
    if(!values.confirmNewPassword && (values.currentPassword || values.newPassword)) {
      errors.confirmNewPassword = 'Required'
    }
    if(values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match!'
    }
    return errors
  }
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
  , asyncValidate: asyncDebounce((...p) => validateUsernameAvailability(...p), 1000)
  , asyncChangeFields: ['username']
})(ProvideeProfileForm)
