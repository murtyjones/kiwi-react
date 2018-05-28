import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'


import BillingForm from './BillingForm'
import { updateProfile, resendVerificationEmail, openModal } from '../../actions'

import './overrides.css'

class Billing extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    profile: T.object.isRequired
    , updateProfile: T.func.isRequired
    , openModal: T.func.isRequired
  }

  handleSubmit = async (v) => {
    console.log('hm')
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
          Manage your payment information
        </h2>
        <BillingForm
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
    updateProfile: params => dispatch(updateProfile(params))
    , resendVerificationEmail: params => dispatch(resendVerificationEmail(params))
    , openModal: params => dispatch(openModal(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Billing))
