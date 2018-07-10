import React, {PropTypes} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSubscriptionValid } from '../utils/permissionUtils'
import { isMobile } from 'react-device-detect'

import WithTheme from '../hocs/WithTheme'
import withTracker from '../hocs/withTracker'
import AuthenticatedRoute from './AuthenticatedRoute'
import MobileRedirect from '../MobileRedirect/MobileRedirect'

function SubscriptionRoute (props) {
  const { subscription, isAdmin, mobileRedirect } = props

  if (isMobile && mobileRedirect)
    return <MobileRedirect />

  if (!isAdmin && !isSubscriptionValid(subscription)) {
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
