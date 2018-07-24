import React, { Component } from 'react'
import withRouter from 'react-router-dom/withRouter'
import { Route, Redirect } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import * as T from 'prop-types'

import MobileRedirect from '../MobileRedirect/MobileRedirect'

function AuthenticatedRoute (props) {
  const { component: Component /* need this so it doesnt get passed to route */, ...rest } = props

  if (isMobile && rest.redirectIfMobile)
    return <MobileRedirect />

  if (!rest.isLoggedIn)
    return <Redirect to={ { pathname: '/login', state: { from: rest.location } } } />

  return (
    <Route
      { ...rest }
      render={
        p => <Component { ...p } />
      }
    />
  )
}


export default withRouter(AuthenticatedRoute)
