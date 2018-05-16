import React, {PropTypes} from 'react'
import { Route, Redirect } from 'react-router-dom'
import WithTheme from '../hocs/WithTheme'

const authorizer = ({ path, isLoggedIn, isAdmin, isProvider }) =>
  path.includes('provider')
    ? isLoggedIn && (isProvider || isAdmin)
    : isLoggedIn && isAdmin


function AuthorizedRoute ({component: Component, path, isLoggedIn, isAdmin, isProvider, setTopBarTitle, topBarTitleDisabled, toggleTopBarTitleIsDisabled, title, ...rest}) {
  return (
    <Route
      { ...rest }
      render={
        (props) => authorizer({ path, isLoggedIn, isAdmin, isProvider })
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
            to={ { pathname: '/', state: { from: props.location } } }
          />
      }
    />
  )
}

export default AuthorizedRoute