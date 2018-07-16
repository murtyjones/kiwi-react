import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import Table from '@material-ui/core/Table'
import BluebirdPromise from 'bluebird'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Edit from 'material-ui-icons/Edit'
import isEmpty from 'lodash/isEmpty'
import Link from 'react-router-dom/Link'
import moment from 'moment'
import cns from 'classnames'


import './overrides.css'

import { register, putProfile, postSubscription, putSubscription, changePassword } from '../../actions'
import { SUBSCRIPTION_STATUSES } from '../../constants'
import ResultMessage from '../../common/form/ResultMessage'
import ProvideeProfileForm from './ProvideeProfileForm'
import AuthService from '../../utils/AuthService'

const styles = {
  editUserIcon: {
    width: '20px',
    height: '20px'
  },
  editUserColor: '#0074D9'
}

class Students extends Component {
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
  }

  handleSubscriptionClick = (event, subcriptionId) => {
    this.props.history.push(`/provider/students/${subcriptionId}`)
  }

  handlePostSubmit = async v => {
    const { register, postSubscription, putSubscription, userId } = this.props
    try {
      const profile = await register({
        username: v.username,
        password: v.newPassword
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
      return updatedSubscription.after
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
      if(v.newPassword) promises.push(changePassword(v))
      return BluebirdPromise.all(promises)
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
    const { subscriptions, profilesById, subscriptionsById, match: { params } } = this.props
    const { isUpdatingSubscription, updateSucceeded, errorMessage } = this.state
    const selectedSubscription = subscriptionsById[params.id] || {}
    const selectedSubscriptionProvideeProfile = profilesById[selectedSubscription.provideeId] || {}

    const sortedSubscriptions = subscriptions
      .sort((a, b) => a.status !== SUBSCRIPTION_STATUSES.ACTIVE)

    return params.id
      ?
      <Fragment>
        <h3 className='providerDashboard-sectionHeader'>
          { isEmpty(selectedSubscriptionProvideeProfile)
            ? 'Add a New Student'
            : 'Edit Student'
          }
        </h3>
        <ProvideeProfileForm
          initialValues={ selectedSubscriptionProvideeProfile }
          onSubmit={
            isEmpty(selectedSubscriptionProvideeProfile)
              ? this.handlePostSubmit
              : this.handlePutSubmit
          }
        />
      </Fragment>
      :
      <Fragment>
        { !isEmpty(sortedSubscriptions) &&
          <Fragment>
            <h2 className='providerDashboard-sectionHeader'>
              Subscriptions
            </h2>
            <Table className='subscription-table'>
              <TableBody>
                { sortedSubscriptions.map((subscription, i) => {
                  const providee = profilesById[subscription.provideeId] || {}
                  const current_period_end = moment.unix(subscription.current_period_end)
                  const provideeDisplayName = AuthService.isPlaceholderUsernameFromUsername(providee.username || '')
                    ? `${providee.firstName} ${providee.lastName}`
                    : providee.username
                  return (
                    <TableRow key={ i } className='subscription-row'>
                      <TableCell className='subscription-username'>
                        { provideeDisplayName }
                        <IconButton
                          variant='fab'
                          aria-label='add'
                          className='editUserButton'
                          onClick={ e => this.handleSubscriptionClick(e, subscription._id) }
                        >
                          <Edit
                            style={ styles.editUserIcon }
                            color={ styles.editUserColor }
                          />
                        </IconButton>
                        { providee.temporaryPassword &&
                          <span className='subscription-temporaryPassword'>
                            <b>Temporary Password:</b> { providee.temporaryPassword }
                          </span>
                        }
                      </TableCell>
                      <TableCell className='subscription-periodEnd'>
                        <span
                          className={ cns({
                            'cancelAtPeriodEnd': subscription.cancel_at_period_end
                          }) }
                        >
                          { subscription.cancel_at_period_end
                            ? current_period_end.isAfter() // isAfter now
                            ? 'Expires '
                            : 'Expired '
                            : 'Renews on ' }
                          { current_period_end.format('MMMM Do') }
                        </span>
                      </TableCell>
                      <TableCell
                        className={
                          cns('subscription-toggleSubscription', {
                            'disabled': isUpdatingSubscription
                          })
                        }
                      >
                        <Link to='#'
                          onClick= { isUpdatingSubscription ? null : () =>
                            this.toggleSubscriptionStatus(subscription)
                          }
                        >
                          { subscription.status === SUBSCRIPTION_STATUSES.INACTIVE
                            ? 'Restart Subscription'
                            : 'Cancel Subscription'
                          }
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                }) }
                </TableBody>
            </Table>
          </Fragment>
        }
        <Button
          variant='outlined'
          className='addStudent'
          type='submit'
          onClick={ () => this.props.history.push(`/provider/students/new`) }
        >
          Add new student
        </Button>

        <div className='subscription-updateResult'>
          { isUpdatingSubscription &&
            <div
              className='spinner'
            />
          }
          <ResultMessage
            submitSucceeded={ updateSucceeded }
            submitFailed={ !updateSucceeded }
            successMessage={ updateSucceeded ? 'Updated!' : '' }
            error={ errorMessage ? errorMessage : '' }
          />
        </div>
      </Fragment>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Students))