import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find } from 'lodash'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { signInWithEmailAndPassword, login, createUserWithEmailAndPassword } from '../actions'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import renderIf from 'render-if'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchText: ''
    }
  }

  static propTypes = {
    greeting: T.string
    , signInWithEmailAndPassword: T.func
    , login: T.func
    , createUserWithEmailAndPassword: T.func
    , signout: T.func
  }

  componentWillMount() {
    const { match } = this.props
    const switchText = match.path === '/login' ? 'No account? Register here!' : 'Already registered? Sign in here!'
    this.setState({ switchText })
  }

  handleLoginSubmit = async(v) => {
    const { login } = this.props
    const { email, password } = v
    return login({ email, password })
    .then(result => {
      console.log(result)
    }).catch(e => {
      if(e.description.includes('Wrong email or password.')) {
        throw new SubmissionError({ password: '', _error: 'Wrong email or password.' })
      }
    })
  }

  handleRegisterSubmit = async(v) => {
    const { createUserWithEmailAndPassword } = this.props
    const { email, password } = v
    try {
      return createUserWithEmailAndPassword({ email, password })
      .then(res => {
        this.props.history.push("/dashboard")
        return success
      })
    } catch (e) {
      if(e.message.includes('The email address is already in use by another account.')) {
        throw new SubmissionError({ email: 'Email address is already in use!', _error: 'Registration failed!' })
      } else if (e.message.includes('Password should be at least 6 characters')) {
        throw new SubmissionError({ password: 'Password should be at least 6 characters', _error: 'Registration failed!' })
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
    const { match } = this.props
    const to = match.path === '/login' ? '/register' : '/login'
    this.props.history.push(to)
  }

  render() {
    const { isLoggedIn, match } = this.props
    const { switchText } = this.state

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

    const currentRoute = find(availableRoutes, { path: match.path })

    const ComponentToRender = () => { return currentRoute.component() }

    return (
      <div>
        <span onClick={ this.switchTabs }>{ switchText }</span>
        <ComponentToRender />
      </div>
    )
  }
}

export const HomeComponent = Home



const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state

  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInWithEmailAndPassword: (params) => dispatch(signInWithEmailAndPassword(params))
    , createUserWithEmailAndPassword: (params) => dispatch(createUserWithEmailAndPassword(params))
    , login: (params) => dispatch(login(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
