import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import renderTextField from '../common/renderTextField'
import { FlatButton, RaisedButton } from 'material-ui'

let RegisterForm = props => {
  const {error, handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name='email'
        type='text'
        component={ renderTextField }
        hintText='email'
      />
      <Field
        name='password'
        type='password'
        component={ renderTextField }
        hintText='password'
      />
      { error && <strong>{error}</strong> }
      <div>
        <RaisedButton type='submit' onClick={ handleSubmit } disabled={ submitting }>
          Register
        </RaisedButton>
        <FlatButton type='button' onClick={ reset } disabled={ pristine || submitting }>
          Clear Values
        </FlatButton>
      </div>
    </form>
  )
}

RegisterForm = reduxForm({
  // a unique name for the form
  form: 'register',
  validate: values => {
    const errors = {}
    if(values.email) values.email = values.email.trim()
    if(!values.email) {
      errors.email = 'Required!'
    } else if(values.email.includes(' ')) {
      errors.email = 'Spaces are not allowed!'
    }
    if(!values.password) {
      errors.password = 'Required!'
    }

    return errors
  }
})(RegisterForm)

export default RegisterForm