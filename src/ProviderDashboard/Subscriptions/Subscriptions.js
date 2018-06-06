import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import BluebirdPromise from 'bluebird'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import { SubmissionError } from 'redux-form'


import ProvideeProfileForm from './ProvideeProfileForm'
import { register, putProfile, postSubscription, changePassword } from '../../actions'

import './overrides.css'
import { SUBSCRIPTION_STATUSES } from '../../constants'

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

  render() {
    const { subscriptions, subscriptionsById, profilesById, match: { params } } = this.props
    const selectedSubscription = subscriptionsById[params.id] || {}
    const selectedSubscriptionProvideeProfile = profilesById[selectedSubscription.provideeId] || {}

    return params.id
      ?
      <Fragment>
        <h2 className='providerDashboard-sectionHeader'>
          { isEmpty(selectedSubscriptionProvideeProfile)
            ? 'Add a New Student'
            : 'Edit Student'
          }
        </h2>
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
        <Table>
          <TableHead className='subscription-head'>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { subscriptions.map((each, i) => {
              const providee = profilesById[each.provideeId] || {}
              return (
                <TableRow
                  hover
                  key={ i }
                  className='subscription-row'
                  onClick={ e => this.handleSubscriptionClick(e, each._id) }
                >
                  <TableCell>{ providee.username }</TableCell>
                  <TableCell>{ each.status }</TableCell>
                </TableRow>
              )
            }) }
            </TableBody>
        </Table>
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
    changePassword: params => dispatch(changePassword(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscriptions))
