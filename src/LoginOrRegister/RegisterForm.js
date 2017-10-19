import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import KiwiTextField from '../common/KiwiTextField'
import { FlatButton, RaisedButton } from 'material-ui'

let RegisterForm = props => {
  const {error, handleSubmit, pristine, reset, submitting} = props
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
      { error && <strong>{error}</strong> }
      <div>
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Register
        </RaisedButton>
        <FlatButton type="button" onClick={ reset } disabled={ pristine || submitting }>
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
    if(!values.email) {
      errors.email = 'Required!'
    }
    if(!values.password) {
      errors.password = 'Required!'
    }

    return errors
  },
  onSubmitSuccess: (result, dispatch, props) => {
    props.handleSubmitError()
    props.handleSubmitRedirect()
  },
 onSubmitFail: (errors, dispatch, submitError, props) => {
   props.handleSubmitError()
 }
})(RegisterForm)

export default RegisterForm
