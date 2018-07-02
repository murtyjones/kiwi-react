import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import update from 'immutability-helper'
import * as Promise from 'bluebird'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'

import ProviderRegisterForm from './ProviderRegisterForm'
import {
  login, register, postSubscription, putSubscription, putProfile, closeModal
} from '../../../actions'
import { SUBSCRIPTION_STATUSES } from '../../../constants'
import slides from './slides'

import '../../../close.css'

const styles = theme => ({
  root: {

  },
  leftSide: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px',
    borderRight: '1px solid #CCC',
    display: 'inline-block'
  }
})


class ProviderRegisterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , providerProfileObject: {}
      , provideeIds: []
      , subscriptions: []
      , providerPassword: ''
    }
  }

  static propTypes = {
    register: T.func.isRequired
    , login: T.func.isRequired
    , postSubscription: T.func.isRequired
    , putSubscription: T.func.isRequired
    , putProfile: T.func.isRequired
    , closeModal: T.func.isRequired
  }

  // slide0Submit = async v => {
  //   const result = await this.props.register({ email: v.email, password: v.password })
  //   this.setState({
  //     providerProfileObject: result,
  //     providerPassword: v.password
  //   })
  // }
  //
  // slide1Submit = async v => {
  //   const { provideeIds, providerProfileObject, providerPassword } = this.state
  //   const last = v.providees.length - 1
  //   const promises = [
  //     this.props.register({
  //       firstName: v.providees[last].firstName,
  //       lastName: v.providees[last].lastName,
  //       password: v.providees[last].password
  //     }),
  //     this.props.login({
  //       email: providerProfileObject.email,
  //       password: providerPassword
  //     })
  //   ]
  //   const [ registerResult, loginResult ] = await Promise.all(promises)
  //   this.setState({
  //     provideeIds: update(provideeIds, {
  //       $splice: [[provideeIds.length, 0, registerResult._id]]
  //     })
  //   })
  // }
  //
  // slide3Submit = async v => {
  //   const { providerProfileObject, provideeIds } = this.state
  //   const promises = [
  //     this.props.putProfile({
  //       _id: providerProfileObject._id,
  //       updateBilling: true,
  //       stripeCreditCardToken: v.stripeCreditCardToken,
  //       v: providerProfileObject.v
  //     })
  //   ]
  //   provideeIds.forEach(provideeId => {
  //     promises.push(
  //       this.props.postSubscription({
  //         providerId: providerProfileObject._id,
  //         provideeId: provideeId,
  //         status: SUBSCRIPTION_STATUSES.INACTIVE
  //       })
  //     )
  //   })
  //   const [ billingResult, ...rest ] = await Promise.all(promises)
  //   this.setState({ subscriptions: rest })
  // }
  //
  // slide4Submit = async v => {
  //   const { subscriptions } = this.state
  //   const promises = subscriptions.map(subscription =>
  //     this.props.putSubscription({
  //       id: subscription._id,
  //       status: SUBSCRIPTION_STATUSES.ACTIVE,
  //       v: subscription.v,
  //     })
  //   )
  //   await Promise.all(promises)
  //   this.props.history.push(`/provider/subscriptions`)
  //   this.props.closeModal()
  // }

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
    const { classes } = this.props
    const { activeSlideIndex } = this.state
    const completionPercentage = (activeSlideIndex + 1) / slides.length * 100
    const slide = slides[activeSlideIndex]

    return (
      <Grid container className={ classes.root }>
        <Grid item
          sm={ 5 }
          className={ classes.leftSide }
          style={ {
            backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/KidCarl_xly3ot.svg)'
          } }
        />
        <Grid item xs={ 12 }
          sm={ 7 }
          className='providerRegisterModalFormContainer'
        >
          <ProviderRegisterForm
            onSubmit={ this.handleSubmit }
            slide={ slide }
            activeSlideIndex={ activeSlideIndex }
            goToPrevSlide={ this.goToPrevSlide }
            goToNextSlide={ this.goToNextSlide }
            completionPercentage={ completionPercentage }
          />
        </Grid>
      </Grid>
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
    , closeModal: params => dispatch(closeModal(params))
  }
}

ProviderRegisterModal = withStyles(styles, { withTheme: true })(ProviderRegisterModal)

export default withRouter(connect(null, mapDispatchToProps)(ProviderRegisterModal))
