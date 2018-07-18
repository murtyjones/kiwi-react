import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import { SubmissionError } from 'redux-form'

import find from 'lodash/find'

import BillingForm from './BillingForm'
import Stripe from '../../common/form/payment/Stripe'
import { putProfile, resendVerificationEmail, openModal } from '../../actions'

import './overrides.css'

class Billing extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    profile: T.object.isRequired
    , putProfile: T.func.isRequired
    , openModal: T.func.isRequired
  }

  handleSubmit = async (params) => {
    const { userId, profile, putProfile } = this.props
    try {
      const options = {
        _id: userId,
        v: profile.v,
        ...params
      }
      return await putProfile({ ...options, updateBilling: true })
    } catch (err) {
      console.log(err)
      throw new SubmissionError({ name: '', _error: err.message ? err.message : err })
    }
  }

  handleVerificationEmailClick = () => {
    const { userId, resendVerificationEmail } = this.props
    return resendVerificationEmail(userId)
  }

  render() {
    const { initialValues, profile, last4 } = this.props

    return (
      <Fragment>
        <h2 style={ { margin: '15px 0' } }>
          Manage your payment information
        </h2>
        <Stripe>
          <Elements>
            <BillingForm
              initialValues={ initialValues }
              last4={ last4 }
              isEmailVerified={ profile.isEmailVerified }
              onSubmit={ this.handleSubmit }
              onVerificationEmailClick={ this.handleVerificationEmailClick }
            />
          </Elements>
        </Stripe>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, profiles: { profilesById } } = state
  const profile = profilesById[userId] || {}
  const initialValues = {}
  let last4 = null

  if (profile.billing && profile.billing.sources) {
    const creditCardId = profile.billing.default_source
    const cardMetadata = find(profile.billing.sources.data, { id: creditCardId })

    initialValues.name = cardMetadata.name
    initialValues.addressLine1 = cardMetadata.address_line1
    initialValues.addressLine2 = cardMetadata.address_line2
    initialValues.addressCity = cardMetadata.address_city
    initialValues.addressState = cardMetadata.address_state
    last4 = cardMetadata.last4
  }

  return {
    profile,
    userId,
    initialValues,
    last4
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putProfile: params => dispatch(putProfile(params))
    , resendVerificationEmail: params => dispatch(resendVerificationEmail(params))
    , openModal: params => dispatch(openModal(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Billing))
