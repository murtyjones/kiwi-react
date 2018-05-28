import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import Button from '@material-ui/core/Button'
import { Toggle, SelectField } from 'redux-form-material-ui'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import validateEmailAvailability from './validateEmailAvailability'
import asyncDebounce from 'debounce-promise'

export const formName = 'changePassword'

const styles = {
  form: {
    width: 'calc(100% - 20px)' // 20px padding offset
    , height: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  },
  result: {
    paddingTop: '10px'
  },
  failure: { color: '#cc5040' },
  success: { color: '#66cc52' }
}

class ChangePasswordForm extends Component {
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
          name='currentPassword'
          type='password'
          hintText='Current Password'
          component={ renderTextField }
          style={ { width: '100%' } }
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
          { submitSucceeded && <span style={ styles.success }>Your password has been changed!</span> }
        </div>
      </form>
    )
  }
}

ChangePasswordForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(ChangePasswordForm)

export default reduxForm({
  form: formName
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    if(!values.currentPassword) {
      errors.currentPassword = 'Required'
    }
    if(!values.newPassword) {
      errors.newPassword = 'Required'
    }
    if(!values.confirmNewPassword) {
      errors.confirmNewPassword = 'Required'
    }
    if(values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match!'
    }
    return errors
  }
})(ChangePasswordForm)
