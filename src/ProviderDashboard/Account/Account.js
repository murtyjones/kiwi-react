import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import AccountForm from './AccountForm'
import ChangePasswordForm from './ChangePasswordForm'
import { putProfile, changePassword, resendVerificationEmail } from '../../actions'

import './overrides.css'

class Account extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , putProfile: T.func.isRequired
  }

  handleAccountSubmit = async v => {
    const { userId, putProfile } = this.props
    const params = {
      ...v,
      _id: userId
    }
    return putProfile(params)
  }

  handleChangePasswordSubmit = async (params) => {
    try {
      const result = await this.props.changePassword(params)
      if(result.success) {
        throw { message: 'Could not be done right now. Please try again later.' }
      }
    } catch(err) {
      if(err.message && err.message.error && err.message.error.invalid_grant) {
        throw new SubmissionError({ _error: 'Wrong password!' })
      }
      throw new SubmissionError({ _error: err.message })
    }
  }

  handleVerificationEmailClick = () => {
    const { userId, resendVerificationEmail } = this.props
    return resendVerificationEmail(userId)
  }

  render() {
    const { profile } = this.props
    return (
      <Fragment>
        <h2 className='providerDashboard-sectionHeader'>
          Edit your details
        </h2>
        <AccountForm
          initialValues={ profile }
          isEmailVerified={ profile.isEmailVerified }
          onSubmit={ this.handleAccountSubmit }
          onVerificationEmailClick={ this.handleVerificationEmailClick }
        />
        <h2 className='providerDashboard-sectionHeader'>
          Change your password
        </h2>
        <ChangePasswordForm
          onSubmit={ this.handleChangePasswordSubmit }
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, profiles: { profilesById } } = state
  const profile = profilesById[userId] || {}
  return {
    profile,
    userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putProfile: params => dispatch(putProfile(params))
    , changePassword: params => dispatch(changePassword(params))
    , resendVerificationEmail: params => dispatch(resendVerificationEmail(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))
