import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import textField from '../textField'
import { connect } from 'react-redux'

import {withRouter} from "react-router-dom";




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
        <button type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Login
        </button>
        <button type="button" onClick={ reset } disabled={ pristine || submitting }>
          Clear Values
        </button>
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
  },
  onSubmitSuccess: (result, dispatch, props) => {
    console.log('onSubmitSuccess called (yes, yes I do get called)');
      props.handleSubmitError()
      props.handleSubmitRedirect()
   },
  onSubmitFail: (result, dispatch, props) => {
    props.handleSubmitError()
  }
})(LoginForm)

export default LoginForm
