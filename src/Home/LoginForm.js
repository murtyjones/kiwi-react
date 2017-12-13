import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import renderTextField from '../common/renderTextField'
import { FlatButton, RaisedButton } from 'material-ui'

const styles = {
  field: {
    width: '100%'
  },
  input: {

  },
  underlineStyle: {
    borderBottom: '2px solid #2E2860'
  },
  underlineFocusStyle: {
    borderBottom: '2px solid #FFFFFF'
  },
  hintStyle: {
    color: '#2E2860'
  }
}

let LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name="email"
        type="text"
        component={ renderTextField }
        hintText="email"
        inputStyle={ styles.input }
        style={ styles.field }
        hintStyle={ styles.hintStyle }
        underlineStyle={ styles.underlineStyle }
        underlineFocusStyle={ styles.underlineFocusStyle }
      />
      <Field
        name="password"
        type="password"
        component={ renderTextField }
        hintText="password"
        inputStyle={ styles.input }
        style={ styles.field }
        hintStyle={ styles.hintStyle }
        underlineStyle={ styles.underlineStyle }
        underlineFocusStyle={ styles.underlineFocusStyle }
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

export default LoginForm
