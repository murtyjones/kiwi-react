import React, { Component } from 'react'
import withRouter from 'react-router-dom/withRouter'
import { Route, Redirect } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import * as T from 'prop-types'

import withTopBarTitle from '../hocs/withTopBarTitle'
import withTopBarBreadCrumb from '../hocs/withTopBarBreadCrumb'
import MobileRedirect from '../MobileRedirect/MobileRedirect'

const isAuthorized = (path, isLoggedIn, isAdmin, isProvider) =>
  path.includes('provider')
    ? isLoggedIn && (isProvider || isAdmin)
    : isLoggedIn && isAdmin

function AuthorizedRoute (props) {
  const { component: Component /* need this so it doesnt get passed to route */, ...rest } = props

  if (isMobile && rest.redirectIfMobile)
    return <MobileRedirect />

  if (!isAuthorized(rest.path, rest.isLoggedIn, rest.isAdmin, rest.isProvider))
    return <Redirect to={ { pathname: '/login', state: { from: rest.location } } } />

  let WrappedComponent = Component

  WrappedComponent = withTopBarBreadCrumb(WrappedComponent, {
    breadcrumbLink: props.breadcrumbLink, breadcrumbText: props.breadcrumbText
  })

  WrappedComponent = withTopBarTitle(WrappedComponent, {
    title: props.title, topBarTitleDisabled: props.topBarTitleDisabled, showMiddleSection: props.showMiddleSection
  })

  return (
    <Route
      { ...rest }
      render={
        props => <WrappedComponent {...props} />
      }
    />
  )
}


export default withRouter(AuthorizedRoute)
