import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import withStyles from '@material-ui/core/styles/withStyles'
import find from 'lodash/find'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import queryString from 'querystring-browser'
import Link from 'react-router-dom/Link'

import { openTopBar, closeTopBar, login, resetPasswordRequest, register } from '../actions'
import withoutMainNavigation from '../hocs/withoutMainNavigation'

import LoginForm from './LoginForm'
import ForgotPasswordForm from './ForgotPasswordForm'

const styles = theme => ({
  root: {
    width: '100%'
    , backgroundColor: '#f0f8fb'
    , backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1533305498/Landing%20Page/Landing_Page_Final_v3.svg)'
    , backgroundPosition: 'center bottom'
    , backgroundRepeat: 'no-repeat'
    , backgroundSize: '100%'
    , paddingTop: '10vh'
    , height: '100vh'
    , boxSizing: 'border-box'
  },
  formContainer: {
    color: '#624f8f',
    width: 450,
    margin: '0 auto',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    WebkitTextAlign: 'center',
    margin: '0 0 15px 0'
  },
  logo: {
    display: 'block',
    width: 130,
    margin: '0 auto 50px auto'
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
    this.state = {
      forgotPassword: false
    }
  }

  static propTypes = {
    greeting: T.string
    , login: T.func
    , signout: T.func
    , resetPasswordRequest: T.func
    , register: T.func
    , history: T.any
    , location: T.any
    , classes: T.object
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

  handleForgotPassword = async(v) => {
    const { resetPasswordRequest } = this.props
    const { email } = v

    try {
      await resetPasswordRequest({ email })
    } catch(e) {
      console.error(e)
      throw new SubmissionError({ password: '', _error: e.message })
    }
  }

  render() {
    const { classes } = this.props
    const { forgotPassword } = this.state

    return (
      <div className={ classes.root }>
        <div className={ classes.formContainer }>
          <img
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535129758/Logos/kiwi_logo_purple_v2.svg'
            className={ classes.logo }
          />
          <h1 className={ classes.header }>
            { !forgotPassword ? 'Parent Login' : 'Reset Your Password' }
          </h1>
          { !forgotPassword
            ?
              <LoginForm
                onSubmit={ this.handleLoginSubmit }
              />
            :
              <ForgotPasswordForm
                onSubmit={ this.handleForgotPassword }
              />
          }
          { !forgotPassword &&
            <Link to='#' onClick={ () => this.setState({ forgotPassword: true }) }>Forgot Password?</Link>
          }
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
    , resetPasswordRequest: p => dispatch(resetPasswordRequest(p))
    , register: params => dispatch(register(params))
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBdar: () => dispatch(closeTopBar())
  }
}

ProviderLoginOrRegister = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProviderLoginOrRegister))

ProviderLoginOrRegister = withoutMainNavigation(ProviderLoginOrRegister)

export default withStyles(styles, { withTheme: true })(ProviderLoginOrRegister)

