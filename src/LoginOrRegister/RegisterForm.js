import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import renderTextField from '../common/renderTextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

let RegisterForm = props => {
  const {error, handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name='username'
        type='text'
        component={ renderTextField }
        hintText='username'
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
    if(values.username) values.username = values.username.trim()
    if(!values.username) {
      errors.username = 'Required!'
    } else if(values.username.includes('@')) {
      errors.username = 'Email addresses are not allowed!'
    } else if(values.username.includes(' ')) {
      errors.username = 'Spaces are not allowed!'
    }
    if(!values.password) {
      errors.password = 'Required!'
    }

    return errors
  }
})(RegisterForm)

export default RegisterForm
