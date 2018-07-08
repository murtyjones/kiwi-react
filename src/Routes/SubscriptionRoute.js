import React, {PropTypes} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSubscriptionValid } from '../utils/permissionUtils'
import WithTheme from '../hocs/WithTheme'
import AuthenticatedRoute from './AuthenticatedRoute'

function SubscriptionRoute (props) {
  const { subscription, isAdmin } = props

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
