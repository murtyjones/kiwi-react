import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import Section from '../../common/Section'
import AccountForm from './AccountForm'
import ChangePasswordForm from './ChangePasswordForm'
import { putProfile, changePassword, resendVerificationEmail } from '../../actions'

import './overrides.css'

class Account extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object
    , profile: T.object
    , putProfile: T.func.isRequired
    , changePassword: T.func.isRequired
    , resendVerificationEmail: T.func.isRequired
    , userId: T.string.isRequired
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
    const { userId } = this.props
    try {
      const result = await this.props.changePassword({ ...params, _id: userId })
      if (result.success) {
        throw { message: 'Could not be done right now. Please try again later.' }
      }
    } catch(err) {
      if (err.message && err.message.error && err.message.error.invalid_grant) {
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

        <Section headerText='Edit your profile details'>
          <AccountForm
            initialValues={ profile }
            isEmailVerified={ profile.isEmailVerified }
            onSubmit={ this.handleAccountSubmit }
            onVerificationEmailClick={ this.handleVerificationEmailClick }
          />
        </Section>

        <Section headerText='Change your password'>
          <ChangePasswordForm
            onSubmit={ this.handleChangePasswordSubmit }
          />
        </Section>

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
