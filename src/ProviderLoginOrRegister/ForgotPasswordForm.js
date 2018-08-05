import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'
import KiwiTextField from '../common/form/KiwiTextField'
import SubmitButton from '../common/form/SubmitButton'
import MailOutline from '@material-ui/icons/MailOutline'
import LockOutline from '@material-ui/icons/LockOutline'

import ResultMessage from '../common/form/ResultMessage'


const styles = theme => ({
  form: {},
  label: {
    textAlign: 'center',
    WebkitTextAlign: 'center',
    marginBottom: 20,
  },
  resetPasswordResult: {
    textAlign: 'center',
    padding: '25px 0',
    color: '#66cc52',
    '&.failure': {
      color: '#CC5040'
    }
  }

})

let ForgotPasswordForm = props => {
  const { classes, handleSubmit } = props
  return (
    <form className={ classes.form }  onSubmit={ handleSubmit }>
      <div className={ classes.label }>Please enter the e-mail address you signed up with.</div>
      <Field
        name='email'
        type='text'
        label='Email'
        component={ KiwiTextField }
        StartAdornmentIcon={ MailOutline }
        addlInputLabelProps={ {
          shrink: true
        } }
      />
      <SubmitButton variant='outlined'
        { ...props }
        text='Send Reset Password Email'
      />
      <ResultMessage
        { ...props }
        successMessage='Email sent. Please check your inbox!'
      />
    </form>
  )
}


ForgotPasswordForm = reduxForm({
  // a unique name for the form
  form: 'forgotPassword',
  validate: values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required!'
    }

    return errors
  }
})(ForgotPasswordForm)

export default withStyles(styles, { withTheme: true })(ForgotPasswordForm)
