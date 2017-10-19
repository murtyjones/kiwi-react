import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import textField from '../textField'
import { FlatButton, RaisedButton } from 'material-ui'
import { connect } from 'react-redux'

let LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name="email"
        type="text"
        component={ textField }
        label="email"
      />
      <Field
        name="password"
        type="password"
        component={ textField }
        label="password"
      />
      { error && <strong>{ error }</strong> }
      <div>
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Login
        </RaisedButton>
        <FlatButton onClick={ reset } disabled={ pristine || submitting }>
          Clear Values
        </FlatButton>
      </div>
    </form>
  )
}


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

export default LoginForm
