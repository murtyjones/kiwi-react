import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { RaisedButton, MenuItem } from 'material-ui'
import { Toggle, SelectField } from 'redux-form-material-ui'
import { isEmpty } from 'lodash'

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
  }
}

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
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
        <RaisedButton type='submit' onClick={ handleSubmit } disabled={ pristine || submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

ResetPasswordForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(ResetPasswordForm)

export default reduxForm({
  form: formName
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    if(!values.currentPassword) {
      errors.currentPassword = 'Required'
    }
    console.log(values.confirmNewPassword, values.newPassword !== values.confirmNewPassword)
    if(values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match!'
    }
    return errors
  }
})(ResetPasswordForm)
