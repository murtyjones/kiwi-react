import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find } from 'lodash'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { Tabs, Tab } from 'material-ui/Tabs'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { openSideNav, closeSideNav, openTopBar, closeTopBar, login, register } from '../actions'

const styles = {
  container: {
    marginTop: '50px'
    , marginLeft: '15px'
    , marginRight: '15px'
  },
  tabItemContainerStyle: {
    background: 'transparent'
  },
  inkBarStyle: {
    background: 'white'
  },
  tabStyle: {
    borderBottom: '2px solid #2E2860'
    , textTransform: 'lowercase'
  }
}


class LoginOrRegister extends Component {
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
    return login({ email, password })
      .then(result => {
        this.props.history.push("/lessons")
      }).catch(e => {
        if(e.description.includes('Wrong email or password.')) {
          throw new SubmissionError({ password: '', _error: 'Wrong email or password.' })
        }
      })
  }

  handleRegisterSubmit = async(v) => {
    const { register, login } = this.props
    const { email, password } = v
    try {
      return register({ email, password })
        .then(res => {
          return login({ email, password })
        }).then(res => {
          this.props.history.push("/lessons")
        }).catch(e => {
          console.log(JSON.stringify(e))
          if(e.message.includes('User already exists')) {
            throw new SubmissionError({ email: 'Email address is already in use!', _error: 'Registration failed!' })
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

  render() {
    return (
      <div style={ styles.container }>
        <Tabs
          inkBarStyle={ styles.inkBarStyle }
          tabItemContainerStyle={ styles.tabItemContainerStyle }
          initialSelectedIndex={ 0 }
        >
          <Tab
            style={ styles.tabStyle }
            label='login'
          >
            { this.renderLoginForm() }
          </Tab>
          <Tab
            style={ styles.tabStyle }
            label='register'
          >
            { this.renderRegisterForm() }
          </Tab>
        </Tabs>
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