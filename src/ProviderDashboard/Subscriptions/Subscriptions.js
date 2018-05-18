import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, TableBody, TableCell, TableHeader, TableHeaderColumn, TableRowColumn, TableRow } from 'material-ui'

import SubscriptionForm from './SubscriptionForm'

import './overrides.css'

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    profiles: T.array.isRequired,
    subscriptions: T.array.isRequired,
  }

  handleClick = (event, subcriptionId) => {
    console.log(subcriptionId)
  }

  handleSubmit = async (params) => {

  }

  render() {
    const { profiles, subscriptions, subscriptionsById, profilesById, match: { params } } = this.props
    const selectedSubscription = subscriptionsById[params.id] || {}
    const selectedSubscriptionProvidee = profilesById[selectedSubscription.provideeId] || {}
    const initialValues = {
      ...selectedSubscription,
      username: selectedSubscriptionProvidee.username
    }
    return params.id
      ?
      <SubscriptionForm
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
      />
      :
      <Table selectable={true} multiSelectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Username</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { subscriptions.map((each, i) => {
            const providee = profilesById[each.provideeId] || {}
            return (
              <TableRow
                //hover
                key={ i }
                className='subscription-row'
                onClick={ event => this.handleClick(event, each._id) }
              >
                <TableRowColumn>{ providee.username }</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
            )
          }

          ) }
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
  return {}
}


export default withRouter(connect(mapStateToProps, null)(Subscriptions))