import React, {PropTypes} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSubscriptionValid } from '../utils/permissionUtils'
import WithTheme from '../hocs/WithTheme'
import withTracker from '../hocs/withTracker'
import AuthenticatedRoute from './AuthenticatedRoute'

function SubscriptionRoute (props) {
  const { subscription } = props

  if (!isSubscriptionValid(subscription)) {
    return (
      <Redirect
        to={ { pathname: '/invalid-subscription', state: { from: props.location } } }
      />
    )
  }

  return (
    <AuthenticatedRoute { ...props } />
  )
}

export default withTracker(SubscriptionRoute)
