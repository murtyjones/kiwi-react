import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import isEmpty from 'lodash/isEmpty'
import Link from 'react-router-dom/Link'
import moment from 'moment'
import cns from 'classnames'


import './overrides.css'

import { register, putProfile, postSubscription, putSubscription, changePassword } from '../../actions'
import { SUBSCRIPTION_STATUSES } from '../../constants'
import ResultMessage from '../../common/form/ResultMessage'

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

  toggleSubscriptionStatus = async subscription => {
    const { putSubscription } = this.props
    try {
      this.setState({
        isUpdatingSubscription: true
        , updateSucceeded: false
        , errorMessage: false
      })
      await putSubscription({
        id: subscription._id,
        v: subscription.v,
        status: subscription.status === SUBSCRIPTION_STATUSES.ACTIVE
          ? SUBSCRIPTION_STATUSES.INACTIVE
          : SUBSCRIPTION_STATUSES.ACTIVE
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
    const { subscriptions, profilesById } = this.props
    const { isUpdatingSubscription, updateSucceeded, errorMessage } = this.state

    const sortedSubscriptions = subscriptions
      .sort((a, b) => a.status !== SUBSCRIPTION_STATUSES.ACTIVE)

    return (
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
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, profiles: { profilesById }, subscriptions: { subscriptionsById } } = state
  const subscriptions = Object.values(subscriptionsById) || []
  return {
    userId,
    profilesById,
    subscriptions
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
