import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import BluebirdPromise from 'bluebird'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import withStyles from '@material-ui/core/styles/withStyles'

import Section from '../../common/Section'


import './overrides.css'

import { register, putProfile, postSubscription, putSubscription, changePassword, openModal, closeModal } from '../../actions'
import { SUBSCRIPTION_STATUSES } from '../../constants'
import ResultMessage from '../../common/form/ResultMessage'
import NewProvideeProfileForm from './NewProvideeProfileForm'
import EditProvideeProfileForm from './EditProvideeProfileForm'
import SubscriptionsTable from './SubscriptionsTable'
import ConfirmPasswordModal from '../../common/modals/ConfirmPasswordModal/ConfirmPasswordModal'
import { generateTempPassword } from '../../utils/psuedoRandomUtils'
import ProspectiveSubscriptionTable from '../../Landing/Home/ProviderRegisterModal/slides/ProspectiveSubscriptionTable'
import { purple } from '../../colors'

const getNewSubscriptionStatus = subscription =>
  subscription.status === SUBSCRIPTION_STATUSES.ACTIVE
    ? SUBSCRIPTION_STATUSES.INACTIVE
    : SUBSCRIPTION_STATUSES.ACTIVE

const styles = theme => ({
  addStudent: {
    marginTop: '10px !important'
  },
  updateResult: {
    margin: '20px 0'
  },
  topSuccessMessage: {
    marginBottom: 17,
    fontWeight: 'bold'
  },
  preConfirmHeader: {
    color: purple
  }
})

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUpdatingSubscription: false
      , updateSucceeded: false
      , errorMessage: ''
      , successMessage: ''
      , topSuccessMessage: ''
      , linkCopied: false
      , passwordConfirmed: false
      , subscriptionId: ''
    }
  }

  static propTypes = {
    subscriptions: T.array.isRequired
    , putProfile: T.func.isRequired
    , register: T.func.isRequired
    , postSubscription: T.func.isRequired
    , putSubscription: T.func.isRequired
    , changePassword: T.func.isRequired
    , openModal: T.func.isRequired
    , closeModal: T.func.isRequired
    , userId: T.string.isRequired
    , profilesById: T.object.isRequired
    , subscriptionsById: T.object.isRequired
    , match: T.object.isRequired
    , history: T.object.isRequired
    , classes: T.object.isRequired
  }

  resetUpdateMessage = async () => {
    await this.setStateAsync({
      updateSucceeded: false
      , errorMessage: ''
      , successMessage: ''
      , topSuccessMessage: ''
    })
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  handleSubscriptionClick = (event, subcriptionId) => {
    this.props.history.push(`/provider/subscriptions/${subcriptionId}`)
  }

  handleCopyLinkClick = () => this.setState({ linkCopied: true })

  handlePostSubmit = async v => {
    const { register, postSubscription, putSubscription, userId } = this.props
    try {
      const profile = await register(v)
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
      this.setState({
        topSuccessMessage: 'Your student is all set and can log in to the student dashboard with these credentials:'
      })
      this.props.history.push('/provider/subscriptions')
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
      const r = await putProfile(v)
      if (v.newPassword) {
        await changePassword({
          _id: v._id,
          newPassword: v.newPassword
        })
      }
      return r
    } catch (err) {
      console.log(err)
      throw new SubmissionError({ _error: err.body ? err.body.message : err.message })
    }
  }

  _toggleSubscriptionStatus = async subscriptionId => {
    const { putSubscription, subscriptionsById } = this.props
    const subscription = subscriptionsById[subscriptionId]
    try {
      this.setState({
        isUpdatingSubscription: true
        , updateSucceeded: false
        , errorMessage: false
      })
      const newStatus = getNewSubscriptionStatus(subscription)
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

  async UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.passwordConfirmed && !this.state.passwordConfirmed) {
      await this.setStateAsync({ loading: true })
      this.props.closeModal()
      await this._toggleSubscriptionStatus(nextState.subscriptionId)
      await this.setStateAsync({ loading: false, passwordConfirmed: false })
    }
  }

  confirmPasswordCallback = passwordConfirmed => {
    this.setState({ passwordConfirmed })
  }

  renderPreConfirmMessage = subscriptionId => {
    const { classes, subscriptionsById, profilesById } = this.props
    const provideeUserId = subscriptionsById[subscriptionId].provideeId
    const username = profilesById[provideeUserId].username

    return (
      <div>
        <h3 className={ classes.preConfirmHeader }>Thanks for restarting your subscription!</h3>
        <br />
        Please review your new subscription details and confirm by entering your password.<br />
        <ProspectiveSubscriptionTable providees={ [ { username } ] } />
      </div>
    )
  }

  toggleSubscriptionStatus = async (subscriptionId, isInTrialPeriod) => {
    await this.resetUpdateMessage()
    const { subscriptionsById } = this.props
    const isDeactivating = getNewSubscriptionStatus(subscriptionsById[subscriptionId]) === SUBSCRIPTION_STATUSES.INACTIVE
    if (/*<-- get rid of bang*/isInTrialPeriod || isDeactivating) {
      return this._toggleSubscriptionStatus(subscriptionId)
    }
    await this.setStateAsync({ subscriptionId })
    this.props.openModal({
      className: 'confirmPasswordModal',
      children: (
        <ConfirmPasswordModal
          preConfirmMessage={ this.renderPreConfirmMessage(subscriptionId) }
          callback={ this.confirmPasswordCallback }
        />
      ),
    })
  }

  renderProvideeProfileForm = () => {
    const { profilesById, subscriptionsById, match: { params } } = this.props
    const selectedSubscription = subscriptionsById[params.id] || {}
    const selectedSubscriptionProvideeProfile = profilesById[selectedSubscription.provideeId] || {}

    return (
      <Section headerText={ isEmpty(selectedSubscriptionProvideeProfile)
        ? 'Add a New Student'
        : 'Edit Student'
      }>
        { isEmpty(selectedSubscriptionProvideeProfile)
          ?
          <NewProvideeProfileForm onSubmit={ this.handlePostSubmit }/>
          :
          <EditProvideeProfileForm
            onSubmit={ this.handlePutSubmit }
            initialValues={ {
              _id: selectedSubscriptionProvideeProfile._id,
              v: selectedSubscriptionProvideeProfile.v,
              username: selectedSubscriptionProvideeProfile.username,
            } }
          />
        }
      </Section>
    )
  }

  renderSubscriptionsTable = () => {
    const { classes, subscriptions, profilesById } = this.props
    const { isUpdatingSubscription, updateSucceeded, topSuccessMessage, successMessage, errorMessage } = this.state

    const sortedSubscriptions = orderBy(subscriptions,
      [ 'createdAt' ],
      [ 'desc' ]
    )

    return (
      <Section headerText='Manage Subscriptions and Student Accounts'>
        { topSuccessMessage &&
          <div className={ classes.topSuccessMessage }>{ topSuccessMessage }</div>
        }
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
            <div className='kiwi-spinner' />
          }
          <ResultMessage
            submitSucceeded={ updateSucceeded }
            submitFailed={ !updateSucceeded }
            successMessage={ updateSucceeded ? successMessage ? successMessage : 'Updated!' : '' }
            error={ errorMessage ? errorMessage : '' }
          />
        </div>
      </Section>
    )
  }

  render() {
    const { match: { params } } = this.props
    return params.id || this.props.match.url.includes('new')
      ? this.renderProvideeProfileForm()
      : this.renderSubscriptionsTable()

  }
}

const mapStateToProps = (state) => {
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
    openModal: params => dispatch(openModal(params)),
    closeModal: params => dispatch(closeModal(params)),
    postSubscription: params => dispatch(postSubscription(params)),
    putSubscription: params => dispatch(putSubscription(params)),
    changePassword: params => dispatch(changePassword(params))
  }
}


Subscriptions = withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscriptions))

export default withStyles(styles, { withTheme: true })(Subscriptions)