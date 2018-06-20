import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import KiwiTextField from '../common/form/KiwiTextField'
import SubmitButton from '../common/form/SubmitButton'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

// http://localhost:3000/provider/login?email=marty%40kiwicompute.com&success=true&message=You%20can%20now%20login%20to%20the%20application%20with%20the%20new%20password.

const styles = theme => ({
  form: {
    margin: '0 auto',
    width: '50%'
  }
})

let LoginForm = props => {
  const { classes, error, handleSubmit, pristine, reset, submitting, resetPasswordSuccess } = props
  return (
    <form className={ classes.form }  onSubmit={ handleSubmit }>
      { resetPasswordSuccess === true
        ? <div>Your password was successfully reset! You can now log in.</div>
        : resetPasswordSuccess === false
          ? <div>Sorry, there was a problem. Please email support@kiwicompute.com</div>
          : null
      }
      <Field
        name='email'
        type='text'
        label='Email'
        component={ KiwiTextField }
      />
      <Field
        name='password'
        type='password'
        label='Password'
        component={ KiwiTextField }
      />
      { error && <strong>{ error }</strong> }
      <div>
        <SubmitButton variant='outlined'
          { ...props }
          text='Login'
        />
        <SubmitButton variant='raised'
          { ...props }
          onClick={ reset }
          text='Clear Values'
        />
      </div>
    </form>
  )
}

export const LoginFormComponent = LoginForm

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
  validate: values => {
    const errors = {}
    if(!values.email) {
      errors.email = 'Required!'
    }
    if(!values.password) {
      errors.password = 'Required!'
    }

    return errors
  }
})(LoginForm)

export default withStyles(styles, { withTheme: true })(LoginForm)
