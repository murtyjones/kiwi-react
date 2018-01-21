import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import renderTextField from '../common/renderTextField'
import { FlatButton, RaisedButton } from 'material-ui'
import { Link } from 'react-router-dom'

const styles = {
  field: {
    width: '100%'
  },
  input: {
    color: '#FFFFFF'
  },
  underlineStyle: {
    borderBottom: '2px solid #2E2860'
  },
  underlineFocusStyle: {
    borderBottom: '2px solid #FFFFFF'
  },
  hintStyle: {
    color: '#2E2860'
  },
  error: {
    display: 'inline-block'
    , fontWeight: 'bold'
    , color: '#d45e75'
    , padding: '5px 0'
  },
  forgot: {
    display: 'block'
    , marginTop: '10px'
    , fontSize: '12px'
    , color: '#bbbbbb'
  }
}

let LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name="username"
        type="text"
        component={ renderTextField }
        hintText="username"
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
      <div>
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting && !error }>
          Login
        </RaisedButton>
        <FlatButton onClick={ reset } disabled={ pristine || submitting }>
          Clear Values
        </FlatButton>
      </div>
      { error && <span style={ styles.error }>{error}</span> }
      <Link style={ styles.forgot } to='/password'>Forgot password?</Link>
    </form>
  )
}

export const LoginFormComponent = LoginForm

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
  validate: values => {
    const errors = {}
    if(!values.username) {
      errors.username = 'Required!'
    }
    if(!values.password) {
      errors.password = 'Required!'
    }

    return errors
  }
})(LoginForm)

export default LoginForm
