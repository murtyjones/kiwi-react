import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import AccountForm from './AccountForm'
import { putProfile, resendVerificationEmail } from '../../actions'

import './overrides.css'

class Account extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , putProfile: T.func.isRequired
  }

  handleSubmit = async v => {
    const { userId, putProfile } = this.props
    const params = {
      ...v,
      _id: userId
    }
    return putProfile(params)
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
          Welcome { profile.firstName || profile.name || 'back' }!
        </h2>
        <AccountForm
          initialValues={ profile }
          isEmailVerified={ profile.isEmailVerified }
          onSubmit={ this.handleSubmit }
          onVerificationEmailClick={ this.handleVerificationEmailClick }
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
    , resendVerificationEmail: params => dispatch(resendVerificationEmail(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))
