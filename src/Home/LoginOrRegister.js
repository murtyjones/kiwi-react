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
import { inactiveColor, activeColor } from './sharedStyles'

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
    , height: '3px'
    , marginTop: '-3px'
  },
  tabStyle: {
    borderBottom: '3px solid #2E2860'
    , textTransform: 'lowercase'
    , fontWeight: 'bold'
  }
}

class LoginOrRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
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

  setActiveTab = activeTab =>
    this.setState({ activeTab })

  render() {
    const { activeTab } = this.state
    return (
      <div style={ styles.container }>
        <Tabs
          inkBarStyle={ styles.inkBarStyle }
          tabItemContainerStyle={ styles.tabItemContainerStyle }
          initialSelectedIndex={ 0 }
        >
          <Tab
            label='log in'
            style={ {
              ...styles.tabStyle
              , color: activeTab === 0 ? activeColor : inactiveColor
            } }
            onActive={ () => this.setActiveTab(0) }
          >
            <LoginForm onSubmit={ this.handleLoginSubmit } />
          </Tab>
          <Tab
            label='register'
            style={ {
              ...styles.tabStyle
              , color: activeTab === 1 ? activeColor : inactiveColor
            } }
            onActive={ () => this.setActiveTab(1) }
          >
            <RegisterForm onSubmit={ this.handleRegisterSubmit } />
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
    login: params => dispatch(login(params))
    , register: params => dispatch(register(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister))
