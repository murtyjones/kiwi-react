import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signout } from '../actions'

import { ApiFetch } from '../utils/ApiFetch'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


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

  renderLoginForm = () => {
    return (
      <LoginForm onSubmit={ this.handleLoginSubmit } />
    )
  }

  render() {
    const { isLoggedIn, match } = this.props
    console.log(match)


    const availableRoutes = [
      {
        path: '/login',
        component: this.renderLoginForm
      }
    ]

    const currentRoute = get(availableRoutes, { path: match.path })

    return (
      <div>

        { currentRoute.component() }

        {/*<LoginForm onSubmit={ this.handleLoginSubmit } />*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<div onClick={ this.pingServer }>PING SERVER</div>*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<RegisterForm onSubmit={ this.handleRegisterSubmit } />*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*{ isLoggedIn && <div onClick={ this.handleSignout }>SIGNOUT</div> }*/}
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
