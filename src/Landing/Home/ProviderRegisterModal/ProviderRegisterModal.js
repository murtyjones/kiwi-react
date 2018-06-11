import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import update from 'immutability-helper'
import * as Promise from 'bluebird'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import ProviderRegisterForm from './ProviderRegisterForm'
import { login, register, postSubscription, putSubscription, putProfile } from '../../../actions'
import { SUBSCRIPTION_STATUSES } from '../../../constants'
import slides from './slides'

import '../../../close.css'


class ProviderRegisterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0,
      providerProfileObject: {},
      provideeIds: [],
      subscriptions: [],
      providerPassword: ''
    }
  }

  static propTypes = {
    register: T.func.isRequired,
    login: T.func.isRequired,
    postSubscription: T.func.isRequired,
    putSubscription: T.func.isRequired,
    putProfile: T.func.isRequired
  }

  slide0Submit = async v => {
    const result = await this.props.register({ email: v.email, password: v.password })
    this.setState({
      providerProfileObject: result,
      providerPassword: v.password
    })
  }

  slide1Submit = async v => {
    const { provideeIds, providerProfileObject, providerPassword } = this.state
    const last = v.providees.length - 1
    const promises = [
      this.props.register({
        username: v.providees[last].username,
        password: v.providees[last].password
      }),
      this.props.login({
        email: providerProfileObject.email,
        password: providerPassword
      })
    ]
    const [ registerResult, loginResult ] = await Promise.all(promises)
    this.setState({
      provideeIds: update(provideeIds, {
        $splice: [[provideeIds.length, 0, registerResult._id]]
      })
    })
  }

  slide3Submit = async v => {
    const { providerProfileObject, provideeIds } = this.state
    const promises = [
      this.props.putProfile({
        _id: providerProfileObject._id,
        billing: true,
        stripeCreditCardToken: v.stripeCreditCardToken,
        v: providerProfileObject.v
      })
    ]
    provideeIds.forEach(provideeId => {
      promises.push(
        this.props.postSubscription({
          providerId: providerProfileObject._id,
          provideeId: provideeId,
          status: SUBSCRIPTION_STATUSES.INACTIVE
        })
      )
    })
    const [ billingResult, ...rest ] = await Promise.all(promises)
    this.setState({ subscriptions: rest })
  }

  slide4Submit = async v => {
    const { subscriptions } = this.state
    const promises = subscriptions.map(subscription =>
      this.props.putSubscription({
        id: subscription._id,
        status: SUBSCRIPTION_STATUSES.ACTIVE,
        v: subscription.v,
      })
    )
    await Promise.all(promises)
    this.props.history.push(`/provider/subscriptions`)

  }

  handleSubmit = async v => {
    const { activeSlideIndex } = this.state
    const actionName = `slide${activeSlideIndex}Submit`
    try {
      if(this[actionName]) {
        const result = await this[actionName](v)
      }
      this.goToNextSlide()
    } catch(err) {
      console.log(err)
      throw new SubmissionError({ _error: err.message })
    }
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })

  render() {
    const { activeSlideIndex } = this.state

    return (
      <div className='subscribeModalFormContainer'>
        <ProviderRegisterForm
          onSubmit={ this.handleSubmit }
          slide={ slides[activeSlideIndex] }
          activeSlideIndex={ activeSlideIndex }
          goToPrevSlide={ this.goToPrevSlide }
          goToNextSlide={ this.goToNextSlide }
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: params => dispatch(register(params))
    , login: params => dispatch(login(params))
    , postSubscription: params => dispatch(postSubscription(params))
    , putSubscription: params => dispatch(putSubscription(params))
    , putProfile: params => dispatch(putProfile(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ProviderRegisterModal))
