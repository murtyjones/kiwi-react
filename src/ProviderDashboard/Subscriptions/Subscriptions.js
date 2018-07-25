import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import BluebirdPromise from 'bluebird'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import withStyles from '@material-ui/core/styles/withStyles'

import Section from '../../common/Section'


import './overrides.css'

import { register, putProfile, postSubscription, putSubscription, changePassword } from '../../actions'
import { SUBSCRIPTION_STATUSES } from '../../constants'
import ResultMessage from '../../common/form/ResultMessage'
import ProvideeProfileForm from './ProvideeProfileForm'
import SubscriptionsTable from './SubscriptionsTable'

const styles = theme => ({
  addStudent: {
    marginTop: '10px !important'
  },
  updateResult: {
    margin: '20px 0'
  }
})

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUpdatingSubscription: false
      , updateSucceeded: false
      , errorMessage: false
    }
  }

  static propTypes = {
    subscriptions: T.array.isRequired
    , putProfile: T.func.isRequired
    , register: T.func.isRequired
    , postSubscription: T.func.isRequired
    , putSubscription: T.func.isRequired
    , changePassword: T.func.isRequired
    , userId: T.string.isRequired
    , profilesById: T.object.isRequired
    , subscriptionsById: T.object.isRequired
    , match: T.object.isRequired
    , history: T.object.isRequired
    , classes: T.object.isRequired
  }

  handleSubscriptionClick = (event, subcriptionId) => {
    this.props.history.push(`/provider/subscriptions/${subcriptionId}`)
  }

  handlePostSubmit = async v => {
    const { register, postSubscription, putSubscription, userId } = this.props
    try {
      const profile = await register({
        firstName: v.firstName,
        password: v.password // need to be temporaryPassword right?
      })
      // make inactive subscription
      const subscription = await postSubscription({
        status: SUBSCRIPTION_STATUSES.INACTIVE,
        requiresPayment: false,
        providerId: userId,
        provideeId: profile._id
      })
      // flip subscription to active
      const updatedSubscription = await putSubscription({
        id: subscription._id,
        status: SUBSCRIPTION_STATUSES.ACTIVE,
        requiresPayment: true,
        v: subscription.v

      })
      return profile // for use in the form
    } catch (err) {
      console.log(err)
      throw new SubmissionError({
        _error: err.body ? err.body.message : err.message
      })
    }
  }

  handlePutSubmit = async v => {
    const { putProfile, changePassword } = this.props
    try {
      let promises = [ putProfile(v) ]
      if (v.password) promises.push(changePassword({
        _id: v._id,
        newPassword: v.password
      }))
      const r = await BluebirdPromise.all(promises)
      this.setState({ isUpdatingSubscription: false, updateSucceeded: true })
      return r
    } catch (err) {
      console.log(err)
      throw new SubmissionError({ _error: err.body ? err.body.message : err.message })
    }
  }

  toggleSubscriptionStatus = async subscription => {
    const { putSubscription } = this.props

    try {
      this.setState({
        isUpdatingSubscription: true
        , updateSucceeded: false
        , errorMessage: false
      })
      const newStatus = subscription.status === SUBSCRIPTION_STATUSES.ACTIVE
        ? SUBSCRIPTION_STATUSES.INACTIVE
        : SUBSCRIPTION_STATUSES.ACTIVE
      const requiresPayment = newStatus === SUBSCRIPTION_STATUSES.ACTIVE
      await putSubscription({
        id: subscription._id,
        v: subscription.v,
        status: newStatus,
        requiresPayment
      })
      this.setState({ isUpdatingSubscription: false, updateSucceeded: true })
    } catch (err) {
      console.log(err)
      this.setState({
        isUpdatingSubscription: false
        , errorMessage: err.body && err.body.message ? err.body.message : err.message
        , updateSucceeded: false
      })
    }
  }

  render() {
    const { classes, subscriptions, profilesById, subscriptionsById, match: { params } } = this.props
    const { isUpdatingSubscription, updateSucceeded, errorMessage } = this.state
    const selectedSubscription = subscriptionsById[params.id] || {}
    const selectedSubscriptionProvideeProfile = profilesById[selectedSubscription.provideeId] || {}
    const sortedSubscriptions = subscriptions
      .sort((a, b) => a.status !== SUBSCRIPTION_STATUSES.ACTIVE)

    return params.id || this.props.match.url.includes('new')
      ?
      <Section headerText={ isEmpty(selectedSubscriptionProvideeProfile)
        ? 'Add a New Student'
        : 'Edit Student'
      }>
        <ProvideeProfileForm
          initialValues={ {
            _id: selectedSubscriptionProvideeProfile._id,
            v: selectedSubscriptionProvideeProfile.v,
            username: selectedSubscriptionProvideeProfile.username,
          } }
          onSubmit={
            isEmpty(selectedSubscriptionProvideeProfile)
              ? this.handlePostSubmit
              : this.handlePutSubmit
          }
        />
      </Section>
      :
      <Section headerText='Manage Subscriptions and Student Accounts'>
        <SubscriptionsTable
          sortedSubscriptions={ sortedSubscriptions }
          profilesById={ profilesById }
          isUpdatingSubscription={ isUpdatingSubscription }
          handleSubscriptionClick={ this.handleSubscriptionClick }
          toggleSubscriptionStatus={ this.toggleSubscriptionStatus }
        />
        <Button
          variant='outlined'
          className={ classes.addStudent }
          type='submit'
          onClick={ () => this.props.history.push(`/provider/subscriptions/new`) }
        >
          Add new student
        </Button>

        <div className={ classes.updateResult }>
          { isUpdatingSubscription &&
            <div className='spinner' />
          }
          <ResultMessage
            submitSucceeded={ updateSucceeded }
            submitFailed={ !updateSucceeded }
            successMessage={ updateSucceeded ? 'Updated!' : '' }
            error={ errorMessage ? errorMessage : '' }
          />
        </div>
      </Section>
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, profiles: { profilesById }, subscriptions: { subscriptionsById } } = state
  const subscriptions = Object.values(subscriptionsById) || []

  return {
    userId,
    profilesById,
    subscriptions,
    subscriptionsById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: params => dispatch(register(params)),
    putProfile: params => dispatch(putProfile(params)),
    postSubscription: params => dispatch(postSubscription(params)),
    putSubscription: params => dispatch(putSubscription(params)),
    changePassword: params => dispatch(changePassword(params))
  }
}


Subscriptions = withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscriptions))

export default withStyles(styles, { withTheme: true })(Subscriptions)