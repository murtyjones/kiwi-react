import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import BluebirdPromise from 'bluebird'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import ProvideeProfileForm from './ProvideeProfileForm'
import { updateProfile, changePassword } from '../../actions'

import './overrides.css'

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    profiles: T.array.isRequired,
    subscriptions: T.array.isRequired,
    updateProfile: T.func.isRequired,
    changePassword: T.func.isRequired,
  }

  handleSubscriptionClick = (event, subcriptionId) => {
    this.props.history.push(`/provider/subscriptions/${subcriptionId}`)
  }

  handleSubmit = async (v) => {
    const { updateProfile, changePassword } = this.props
    let promises = [ updateProfile(v) ]
    if(v.newPassword) promises.push(changePassword(v))
    await BluebirdPromise.all(promises)
  }

  render() {
    const { profiles, subscriptions, subscriptionsById, profilesById, match: { params } } = this.props
    const selectedSubscription = subscriptionsById[params.id] || {}
    const selectedSubscriptionProvideeProfile = profilesById[selectedSubscription.provideeId] || {}
    return params.id
      ?
      <Fragment>
        <ProvideeProfileForm
          initialValues={ selectedSubscriptionProvideeProfile }
          onSubmit={ this.handleSubmit }
        />
        {/* Add subscription form as needed */}
      </Fragment>
      :
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
  }
}

const mapStateToProps = (state, ownProps) => {
  const { profiles: { profilesById }, subscriptions: { subscriptionsById } } = state
  const profiles = Object.values(profilesById) || []
  const subscriptions = Object.values(subscriptionsById) || []
  return {
    profiles, profilesById, subscriptions, subscriptionsById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: params => dispatch(updateProfile(params)),
    changePassword: params => dispatch(changePassword(params)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscriptions))