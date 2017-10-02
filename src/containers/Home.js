import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signout } from '../actions'

import { ApiFetch } from '../utils/ApiFetch'

const textField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      { label }
    </label>
    <div>
      <input { ...input } placeholder={ label } type={ type } />
      {/*{ touched && error && <span>{ error }</span> }*/}
    </div>
  </div>

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

let RegisterForm = props => {
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
          Register
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
  }
})(LoginForm)


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
  }
})(RegisterForm)


class Home extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    greeting: T.string,
    signInWithEmailAndPassword: T.func,
    createUserWithEmailAndPassword: T.func,
    signout: T.func
  }

  handleLoginSubmit = async(v) => {
    const { signInWithEmailAndPassword } = this.props
    const { email, password } = v
    try {
      const success = await signInWithEmailAndPassword({ email, password })
      return success
    } catch (e) {
      return e
    }
  }

  handleRegisterSubmit = async(v) => {
    const { createUserWithEmailAndPassword } = this.props
    const { email, password } = v
    try {
      const success = await createUserWithEmailAndPassword({ email, password })
      return success
    } catch (e) {
      return e
    }
  }

  handleSignout = async(_) => {
    const { signout } = this.props
    try {
      const success = await signout()
      return success
    } catch (e) {
      return e
    }
  }

  pingServer = (v) => {
    return ApiFetch('http://localhost:8080/api/login', { method: 'POST' }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(JSON.stringify(err))
    })
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <div>
        <LoginForm onSubmit={ this.handleLoginSubmit } />
        <br />
        <br />
        <div onClick={ this.pingServer }>PING SERVER</div>
        <br />
        <br />
        <RegisterForm onSubmit={ this.handleRegisterSubmit } />
        <br />
        <br />
        { isLoggedIn && <div onClick={ this.handleSignout }>SIGNOUT</div> }
      </div>
    )
  }
}

export const HomeComponent = Home



const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state;

  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInWithEmailAndPassword: (params) => dispatch(signInWithEmailAndPassword(params)),
    createUserWithEmailAndPassword: (params) => dispatch(createUserWithEmailAndPassword(params)),
    signout: () => dispatch(signout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
