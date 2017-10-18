import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find } from 'lodash'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from "prop-types";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signout } from '../actions'

import ApiFetch from '../utils/ApiFetch'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import renderIf from 'render-if'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchText: '',
      testprop: 'hellotheresailor',
      loginerror: false,
      evaluateOnce: false
    }
  }

  static propTypes = {
    greeting: T.string,
    signInWithEmailAndPassword: T.func,
    createUserWithEmailAndPassword: T.func,
    signout: T.func
  }

  componentWillMount() {
    const { match } = this.props
    const switchText = match.path === '/login' ? 'No account? Register here!' : 'Already registered? Sign in here!'
    this.setState({ switchText })
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

  handleSubmitError(){
    if (this.props.isLoggedIn===false){
      console.log("You did not log in correctly, oh noes!");
      this.setState({
        loginerror: true
      })
    }
  }

  handleSubmitRedirect(LoginOrRegister){
    if (this.props.isLoggedIn===true){
      console.log('inside handleSubmitRedirect');
      this.setState({
        loginerror: false
      }, ()=>{
        console.log('LoginOrRegister: ', LoginOrRegister);
        this.props.history.push("/dashboard");
      })
    }
  }

  evaluateOnceRedirect(){
    console.log('inside evaluateOnceRedirect');
    if (this.state.evaluateOnce===false){
      this.setState({evaluateOnce: true})
      if (this.props.isLoggedIn===true){
        this.props.history.push("/dashboard");
      }
    }
  }


  renderLoginForm = () => {
    return (
      <LoginForm onSubmit={ this.handleLoginSubmit }
      handleSubmitError={()=>{this.handleSubmitError()}}
      handleSubmitRedirect={(value)=>{this.handleSubmitRedirect(value)}}
      evaluateOnceRedirect={this.evaluateOnceRedirect()}
       />
    )
  }

  renderRegisterForm = () => {
    return (
      <RegisterForm onSubmit={ this.handleRegisterSubmit }
      isLoggedIn={this.props.isLoggedIn}
      handleSubmitError={()=>{this.handleSubmitError()}}
      handleSubmitRedirect = {(value)=>{this.handleSubmitRedirect(value)}}
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
        {renderIf(this.state.loginerror === true)(
          <div>
            <p>
              You put in the wrong log in or pass you silly 🦆
            </p>
          </div>
        )}

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
