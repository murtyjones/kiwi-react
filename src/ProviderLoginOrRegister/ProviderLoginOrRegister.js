import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import withStyles from '@material-ui/core/styles/withStyles'
import find from 'lodash/find'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import queryString from 'query-string'

import { openTopBar, closeTopBar, login, register } from '../actions'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import withoutMainNavigation from '../hocs/withoutMainNavigation'

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center'
  },
  formContainer: {
    width: '100%'
  },
  switchText: {
    display: 'block',
    textAlign: 'center',
    cursor: 'pointer'
  }
})

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
    , history: T.any
    , location: T.any
  }

  handleLoginSubmit = async(v) => {
    const { login } = this.props
    const { email, password } = v

    try {
      await login({ email, password })
      this.props.history.push('/provider/dashboard')
    } catch(e) {
      console.error(e)
      if (JSON.stringify(e).includes('invalid_grant')) {
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
      if (JSON.stringify(e).includes('User already exists')) {
        throw new SubmissionError({ email: 'Username taken!', _error: 'Registration failed!' })
      } else if (e.message && JSON.stringify(e.message).toLowerCase().includes('email')) {
        throw new SubmissionError({ email: e.message, _error: 'Registration failed!' })
      } else if (e.message && JSON.stringify(e.message).toLowerCase().includes('pass validation for format email')) {
        throw new SubmissionError({ email: "Your email can only contain alphanumeric characters and '_', '+', '-', or '.'", _error: 'Registration failed!' })
      } else {
        throw new SubmissionError({ email: e.message, _error: 'Registration failed!' })
      }
    }
  }

  getResetPasswordSuccess = () => {
    const { location: { search } } = this.props
    const parsedSearch = queryString.parse(search)
    if (!parsedSearch.success) {
      return undefined
    }
    return parsedSearch.success === 'true'
  }


  renderLoginForm = props => {
    const resetPasswordSuccess = this.getResetPasswordSuccess()
    return (
      <LoginForm
        onSubmit={ this.handleLoginSubmit }
        resetPasswordSuccess={ resetPasswordSuccess }
      />
    )
  }

  renderRegisterForm = () => {
    const resetPasswordSuccess = this.getResetPasswordSuccess()
    return (
      <RegisterForm
        onSubmit={ this.handleRegisterSubmit }
        resetPasswordSuccess={ resetPasswordSuccess }
      />
    )
  }

  switchTabs = () => {
    const { location, history } = this.props
    const to = location.pathname === '/provider/login' ? 'provider/register' : '/provider/login'
    history.push(to)
  }

  render() {
    const { classes, location: { pathname } } = this.props
    const switchText = pathname === '/provider/login' ? 'No account? Register here!' : 'Already registered? Sign in here!'
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
    const currentRoute = find(availableRoutes, { path: pathname })

    const ComponentToRender = () => { return currentRoute.component() }

    return (
      <div className={ classes.root }>
        <div className={ classes.formContainer }>
          <span
            className={ classes.switchText }
            onClick={ this.switchTabs }
          >
            { switchText }
          </span>
          <ComponentToRender />
        </div>
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
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

ProviderLoginOrRegister = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProviderLoginOrRegister))

ProviderLoginOrRegister = withoutMainNavigation(ProviderLoginOrRegister)

export default withStyles(styles, { withTheme: true })(ProviderLoginOrRegister)

