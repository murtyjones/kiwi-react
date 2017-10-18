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
  //  https://github.com/erikras/redux-form/pull/2396
  // onSubmitFail handler exists, is poorly documented
  onSubmitFail: (result, dispatch, props) => {
    console.log('onSubmitFail called (yes, yes I do get called)');
    console.log('fail props: ', props);
    //issue! apparently onSubmitFail does not have access to props although the documentation: https://github.com/erikras/redux-form/releases/tag/v6.5.0
    //says that it should
    //I've opened a bug report here: https://github.com/erikras/redux-form/issues/3543--peter
    console.log('fail result: ', result);
    console.log('fail dispatch: ', dispatch);
    // props.handleSubmitError()
    //if props worked we should throw a handleSubmitError()
  }
})(LoginForm)

export default LoginForm
