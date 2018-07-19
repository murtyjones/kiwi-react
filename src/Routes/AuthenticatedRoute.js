import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

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

export default AuthenticatedRoute
