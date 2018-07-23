import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSubscriptionValid } from '../utils/permissionUtils'
import { isMobile } from 'react-device-detect'

import AuthenticatedRoute from './AuthenticatedRoute'
import MobileRedirect from '../MobileRedirect/MobileRedirect'

function SubscriptionRoute (props) {
  const { subscription, isAdmin, redirectIfMobile } = props

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

export default SubscriptionRoute
