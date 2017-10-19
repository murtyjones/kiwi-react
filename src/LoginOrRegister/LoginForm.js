import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import KiwiTextField from '../common/KiwiTextField'
import { FlatButton, RaisedButton } from 'material-ui'
import { connect } from 'react-redux'

import {withRouter} from "react-router-dom";




let LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name="email"
        type="text"
        component={ KiwiTextField }
        label="email"
      />
      <Field
        name="password"
        type="password"
        component={ KiwiTextField }
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
