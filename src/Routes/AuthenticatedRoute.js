import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import { Route, Redirect } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import * as T from 'prop-types'

import WithTheme from '../hocs/WithTheme'
import MobileRedirect from '../MobileRedirect/MobileRedirect'

function AuthenticatedRoute ({component: Component, isLoggedIn, title, topBarTitleDisabled, toggleTopBarTitleIsDisabled, setTopBarTitle, mobileRedirect, ...rest}) {
  if (isMobile && mobileRedirect)
    return <MobileRedirect />

  return (
    <Route
      { ...rest }
      render={
        (props) => isLoggedIn === true
          ?
          <WithTheme
            WrappedComponent={ Component }
            title={ title }
            topBarTitleDisabled={ topBarTitleDisabled }
            setTopBarTitle={ setTopBarTitle }
            toggleTopBarTitleIsDisabled={ toggleTopBarTitleIsDisabled }
            { ...props }
          />
          :
          <Redirect
            to={ { pathname: '/login', state: { from: props.location } } }
          />
      }
    />
  )
}

AuthenticatedRoute.propTypes = {
  component: T.any,
  isLoggedIn: T.bool,
  title: T.string,
  topBarTitleDisabled: T.bool,
  toggleTopBarTitleIsDisabled: T.bool,
  setTopBarTitle: T.func,
  mobileRedirect: T.bool,
  rest: T.object,
}

export default withRouter(AuthenticatedRoute)
