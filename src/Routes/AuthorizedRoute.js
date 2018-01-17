import React, {PropTypes} from 'react'
import { Route, Redirect } from 'react-router-dom'
import WithTheme from '../hocs/WithTheme'

function AuthorizedRoute ({component: Component, isLoggedIn, isAdmin, setTopBarTitle, topBarTitleDisabled, toggleTopBarTitleIsDisabled, title, ...rest}) {
  return (
    <Route
      { ...rest }
      render={
        (props) => isLoggedIn && isAdmin
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