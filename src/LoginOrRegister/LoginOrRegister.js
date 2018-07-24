import React, { Component, PureComponent } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import get from 'lodash/get'
import find from 'lodash/find'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { login, register } from '../actions'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import './overrides.css'
import withoutMainNavigation from '../hocs/withoutMainNavigation'


class LoginOrRegister extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    greeting: T.string
    , login: T.func
    , signout: T.func
    , register: T.func
    , history: T.any
    , location: T.any
  }

  handleLoginSubmit = async(v) => {
    const { login } = this.props
    const { username, password } = v

    try {
      await login({ username, password })
      this.props.history.push("/lessons")
    } catch(e) {
      console.error(e)
      if (JSON.stringify(e).includes('invalid_grant')) {
        throw new SubmissionError({ password: '', _error: 'Wrong username or password.' })
      }
    }
  }

  handleRegisterSubmit = async(v) => {
    const { register, login } = this.props
    const { username, password } = v

    try {
      await register({ username, password })
      await login({ username, password })
      this.props.history.push("/welcome")
    } catch (e) {
      console.error(e)
      if (JSON.stringify(e).includes('User already exists')) {
        throw new SubmissionError({ username: 'Username taken!', _error: 'Registration failed!' })
      } else if (e.message && JSON.stringify(e.message).toLowerCase().includes('username')) {
        throw new SubmissionError({ username: e.message, _error: 'Registration failed!' })
      } else if (e.message && JSON.stringify(e.message).toLowerCase().includes('pass validation for format email')) {
        throw new SubmissionError({ username: "Your username can only contain alphanumeric characters and '_', '+', '-', or '.'", _error: 'Registration failed!' })
      } else {
        throw new SubmissionError({ username: e.message, _error: 'Registration failed!' })
      }
    }
  }


  renderLoginForm = () => {
    return (
      <LoginForm
        onSubmit={ this.handleLoginSubmit }
      />
    )
  }

  renderRegisterForm = () => {
    return (
      <RegisterForm
        onSubmit={ this.handleRegisterSubmit }
      />
    )
  }

  switchTabs = () => {
    const { location, history } = this.props
    const to = location.pathname === '/login' ? '/register' : '/login'
    history.push(to)
  }

  render() {
    const { location } = this.props
    const currentPath = location.pathname
    const switchText = currentPath === '/login'
      ? 'No account? Click here to register!'
      : 'Already registered? Click here to sign in!'
    const headerText = currentPath === '/login'
      ? 'Sign in'
      : 'Register'

    const availableRoutes = [
      {
        path: '/login',
        component: this.renderLoginForm
      },
      {
        path: '/register',
        component: this.renderRegisterForm
      }
    ]
    const currentRoute = find(availableRoutes, { path: currentPath })

    const ComponentToRender = () => { return currentRoute.component() }

    return (
      <div className='loginOrRegister'>
        <div className='loginHeader'>
          <h1 style={ { margin: '0 0 10px 0' } }>{ headerText }</h1>
          <span
            className='switchText'
            onClick={ this.switchTabs }
          >
            { switchText }
          </span>
        </div>
        <div className='componentWrapper'>
          <ComponentToRender />
        </div>
      </div>
    )
  }
}

export const LoginOrRegisterComponent = LoginOrRegister


const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state

  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: params => dispatch(login(params))
    , register: params => dispatch(register(params))
  }
}

LoginOrRegister = withoutMainNavigation(LoginOrRegister)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister))
