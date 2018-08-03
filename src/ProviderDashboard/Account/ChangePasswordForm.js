import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import get from 'lodash/get'

import KiwiTextField from '../../common/form/KiwiTextField'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'

export const formName = 'changePassword'

const styles = {
  form: {
    width: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  },
  result: {
    paddingTop: '10px'
  },
  failure: { color: '#CC5040' },
  success: { color: '#66cc52' }
}

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , classes: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , error: T.string.isRequired
    , submitting: T.string.isRequired
    , submitFailed: T.bool.isRequired
    , submitSucceeded: T.bool.isRequired
  }

  renderSuccessMessage = () => {
    const { classes } = this.props
    return (
      <span className={ classes.success }>Your password has been changed!</span>
    )
  }

  renderErrorMessage = () => {
    const { error, classes } = this.props
    return (
      <span className={ classes.failure }>{ get(error, 'error_description', error) }</span>
    )
  }

  render() {
    const { classes, handleSubmit, submitting, submitFailed, submitSucceeded } = this.props

    return (
      <form onSubmit={ handleSubmit } className={ classes.form }>
        <Field
          name='currentPassword'
          type='password'
          label='Current Password'
          component={ KiwiTextField }
        />
        <Field
          name='newPassword'
          type='password'
          label='New Password'
          component={ KiwiTextField }
        />
        <Field
          name='confirmNewPassword'
          type='password'
          label='Confirm New Password'
          component={ KiwiTextField }
        />

        <SubmitButton
          text='Change Password'
          { ...this.props }
          disabled={ submitting }
        />

        { (submitSucceeded || submitFailed) &&
          <ResultMessage
            { ...this.props }
            successMessage={ this.renderSuccessMessage() }
            error={ this.renderErrorMessage() }
          />
        }
      </form>
    )
  }
}

ChangePasswordForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(ChangePasswordForm)

ChangePasswordForm = withStyles(styles, { withTheme: true })(ChangePasswordForm)

export default reduxForm({
  form: formName
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    if (!values.currentPassword) {
      errors.currentPassword = 'Required'
    }
    if (!values.newPassword) {
      errors.newPassword = 'Required'
    }
    if (!values.confirmNewPassword) {
      errors.confirmNewPassword = 'Required'
    }
    if (values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match!'
    }
    return errors
  }
})(ChangePasswordForm)
