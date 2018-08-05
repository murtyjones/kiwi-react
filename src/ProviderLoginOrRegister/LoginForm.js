import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'
import KiwiTextField from '../common/form/KiwiTextField'
import SubmitButton from '../common/form/SubmitButton'
import MailOutline from '@material-ui/icons/MailOutline'
import LockOutline from '@material-ui/icons/LockOutline'

import ResultMessage from '../common/form/ResultMessage'

// http://localhost:3000/provider/login?email=marty%40kiwicompute.com&success=true&message=You%20can%20now%20login%20to%20the%20application%20with%20the%20new%20password.

const styles = theme => ({
  form: {},
  resetPasswordResult: {
    textAlign: 'center',
    padding: '25px 0',
    color: '#66cc52',
    '&.failure': {
      color: '#CC5040'
    }
  }

})

let LoginForm = props => {
  const { classes, handleSubmit } = props
  return (
    <form className={ classes.form }  onSubmit={ handleSubmit }>
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
      <Field
        name='password'
        type='password'
        label='Password'
        component={ KiwiTextField }
        StartAdornmentIcon={ LockOutline }
        addlInputLabelProps={ {
          shrink: true
        } }
      />
      <SubmitButton variant='outlined'
        { ...props }
        text='Login'
      />

      <ResultMessage
        { ...props }
      />
    </form>
  )
}

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
  validate: values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required!'
    }
    if (!values.password) {
      errors.password = 'Required!'
    }

    return errors
  }
})(LoginForm)

export default withStyles(styles, { withTheme: true })(LoginForm)
