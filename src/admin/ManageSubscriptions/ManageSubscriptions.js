import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import get from 'lodash/get'
import Toggle from 'material-ui/Toggle'

import SubscriptionWidget from '../ManageSubscriptions/SubscriptionWidget'
import KiwiLink from '../../common/KiwiLink'
import { getManySubscriptions, deleteSubscription, getManyProfiles } from '../../actions/index'
import { SUBSCRIPTION_STATUSES } from '../../constants'

const defaultShowActive = true
const defaultShowInactive = true

class ManageSubscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showActive: defaultShowActive
      , showInactive: defaultShowInactive
    }
  }

  static propTypes = {
    getManySubscriptions: T.func.isRequired
    , deleteSubscription: T.func.isRequired
    , getManyProfiles: T.func.isRequired
  }

  async UNSAFE_componentWillMount() {
    this.props.getManySubscriptions()
    this.props.getManyProfiles()
  }

  render() {
    const { subscriptions, profiles } = this.props
    const { showActive, showInactive } = this.state

    const subscriptionsByProviderId = subscriptions.reduce((acc, each) => {
      if(
        each.status === SUBSCRIPTION_STATUSES.ACTIVE && !showActive ||
        each.status === SUBSCRIPTION_STATUSES.INACTIVE && !showInactive
      ) { return acc }

      const providerSubscriptionsObject = find(acc, { providerId: each.providerId })
      if(!providerSubscriptionsObject) {
        acc.push({ providerId: each.providerId, subscriptions: [each] })
      } else {
        providerSubscriptionsObject.subscriptions.push(each)
      }
      return acc
    }, [])

    return (
      <div>
        <Toggle
          defaultToggled={ defaultShowActive }
          label='Show Active'
          onToggle={ (_, bool) => this.setState({ showActive: bool }) }
          style={ { width: '160px', fontWeight: 'bold' } }
        />
        <Toggle
          defaultToggled={ defaultShowInactive }
          label='Show Inactive'
          onToggle={ (_, bool) => this.setState({ showInactive: bool }) }
          style={ { width: '160px', fontWeight: 'bold' } }
        />
        <h5>Subscriptions</h5>
        { subscriptionsByProviderId.map((byProviderIdObject, i) => {
          const providerProfile = find(profiles, { _id: byProviderIdObject.providerId }) || {}
          return (
            <Fragment key={ i }>
              <h4>{ providerProfile.username }</h4>
              { byProviderIdObject.subscriptions.map((subscription, j) =>
                <SubscriptionWidget
                  key={ `subscription-${j}` }
                  subscription={ subscription }
                  providee={ find(profiles, { _id: subscription.provideeId }) }
                />
              ) }
            </Fragment>
          ) }
        ) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { profiles: { profilesById },  subscriptions: { subscriptionsById } } = state

  return {
    subscriptions: Object.values(subscriptionsById)
    , profiles: Object.values(profilesById)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManySubscriptions: params => dispatch(getManySubscriptions(params))
    , deleteSubscription: params => dispatch(deleteSubscription(params))
    , getManyProfiles: params => dispatch(getManyProfiles(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageSubscriptions))
