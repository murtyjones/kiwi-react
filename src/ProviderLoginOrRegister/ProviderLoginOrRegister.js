import React, { Component, PureComponent } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import get from 'lodash/get'
import find from 'lodash/find'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { openSideNav, closeSideNav, openTopBar, closeTopBar, login, register } from '../actions'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


class ProviderLoginOrRegister extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    greeting: T.string
    , login: T.func
    , signout: T.func
    , register: T.func
    , closeSideNav: T.func
    , openSideNav: T.func
    , openTopBar: T.func
    , closeTopBar: T.func
    , history: T.any
    , location: T.any
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  handleLoginSubmit = async(v) => {
    const { login } = this.props
    const { email, password } = v

    try {
      await login({ email, password })
      this.props.history.push('/provider/dashboard')
    } catch(e) {
      console.error(e)
      if(JSON.stringify(e).includes('invalid_grant')) {
        throw new SubmissionError({ password: '', _error: 'Wrong email or password.' })
      }
    }
  }

  handleRegisterSubmit = async(v) => {
    const { register, login } = this.props
    const { email, password } = v

    try {
      await register({ email, password })
      await login({ email, password })
      this.props.history.push('/provider/dashboard')
    } catch (e) {
      console.error(e)
      if(JSON.stringify(e).includes('User already exists')) {
        throw new SubmissionError({ email: 'Username taken!', _error: 'Registration failed!' })
      } else if(e.message && JSON.stringify(e.message).toLowerCase().includes('email')) {
        throw new SubmissionError({ email: e.message, _error: 'Registration failed!' })
      } else if(e.message && JSON.stringify(e.message).toLowerCase().includes('pass validation for format email')) {
        throw new SubmissionError({ email: "Your email can only contain alphanumeric characters and '_', '+', '-', or '.'", _error: 'Registration failed!' })
      } else {
        throw new SubmissionError({ email: e.message, _error: 'Registration failed!' })
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
    const to = location.pathname === '/provider/login' ? 'provider/register' : '/provider/login'
    history.push(to)
  }

  render() {
    const { location } = this.props
    const currentPath = location.pathname
    const switchText = currentPath === '/provider/login' ? 'No account? Register here!' : 'Already registered? Sign in here!'

    const availableRoutes = [
      {
        path: '/provider/login',
        component: this.renderLoginForm
      },
      {
        path: '/provider/register',
        component: this.renderRegisterForm
      }
    ]
    const currentRoute = find(availableRoutes, { path: currentPath })

    const ComponentToRender = () => { return currentRoute.component() }

    return (
      <div>
        <span
          className='switchText'
          onClick={ this.switchTabs }
        >
          { switchText }
        </span>
        <ComponentToRender />
      </div>
    )
  }
}

export const LoginOrRegisterComponent = ProviderLoginOrRegister


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
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProviderLoginOrRegister))
