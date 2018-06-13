import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import BluebirdPromise from 'bluebird'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import { SubmissionError } from 'redux-form'
import Link from 'react-router-dom/Link'
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton'
import Edit from 'material-ui-icons/Edit'
import cns from 'classnames'


import ProvideeProfileForm from './ProvideeProfileForm'
import { register, putProfile, postSubscription, putSubscription, changePassword } from '../../actions'

import { SUBSCRIPTION_STATUSES } from '../../constants'

const styles = {
  editUserIcon: {
    width: '20px',
    height: '20px'
  },
  editUserColor: '#0074D9'
}

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
    this.props.history.push(`/provider/subscriptions/${subcriptionId}`)
  }

  handlePostSubmit = async v => {
    const { register, postSubscription, userId } = this.props
    try {
      const profile = await register({
        username: v.username,
        password: v.newPassword
      })
      const subscription = await postSubscription({
        status: SUBSCRIPTION_STATUSES.ACTIVE,
        providerId: userId,
        provideeId: profile._id
      })
      return subscription
    } catch (err) {
      console.log(err)
      throw new SubmissionError({ _error: err.body ? err.body.message : err.message })
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
      this.setState({ isUpdatingSubscription: true })
      await putSubscription({
        id: subscription._id,
        v: subscription.v,
        status: subscription.status === SUBSCRIPTION_STATUSES.ACTIVE
          ? SUBSCRIPTION_STATUSES.INACTIVE
          : SUBSCRIPTION_STATUSES.ACTIVE
      })
      this.setState({ isUpdatingSubscription: false })
    } catch (err) {
      console.log(err)
      this.setState({
        isUpdatingSubscription: false,
        errorMessage: err.body && err.body.message ? err.body.message : err.message
      })
    }
  }

  render() {
    const { subscriptions, subscriptionsById, profilesById, match: { params } } = this.props
    const { isUpdatingSubscription } = this.state
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
                  return (
                    <TableRow
                      key={ i }
                      className='subscription-row'
                    >
                      <TableCell className='subscription-username'>
                        { providee.username }
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
                      <TableCell className='subscription-toggleSubscription'>
                        <Link to='#'
                          className={ cns({
                            'disabled': isUpdatingSubscription
                          }) }
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
          onClick={ () => this.props.history.push(`/provider/subscriptions/new`) }
        >
          Add new student
        </Button>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscriptions))
