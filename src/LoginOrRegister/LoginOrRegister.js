import React, { Component, PureComponent } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find } from 'lodash'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { openSideNav, closeSideNav, openTopBar, closeTopBar, login, register } from '../actions'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import renderIf from 'render-if'


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
    const { username, password } = v
    return login({ username, password })
    .then(result => {
      this.props.history.push("/lessons")
    }).catch(e => {
      if(JSON.stringify(e).includes('invalid_grant')) {
        throw new SubmissionError({ password: '', _error: 'Wrong username or password.' })
      }
    })
  }

  handleRegisterSubmit = async(v) => {
    const { register, login } = this.props
    const { username, password } = v
    try {
      return register({ username, password })
      .then(res => {
        return login({ username, password })
      }).then(res => {
        this.props.history.push("/welcome")
      }).catch(e => {
        if(JSON.stringify(e).includes('User already exists')) {
          throw new SubmissionError({ username: 'Username taken!', _error: 'Registration failed!' })
        }
      })
    } catch (e) {
      console.error(e)
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
    const switchText = currentPath === '/login' ? 'No account? Register here!' : 'Already registered? Sign in here!'

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

export const LoginOrRegisterComponent = LoginOrRegister


const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state

  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(login(params))
    , register: (params) => dispatch(register(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister))
