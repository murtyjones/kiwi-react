import React, {PropTypes} from "react"
import { Route, Redirect } from "react-router-dom"

function AuthorizedRoute ({component: Component, isLoggedIn, isAdmin, ...rest}) {
  return (
    <Route
      { ...rest }
      render={
        (props) => isLoggedIn && isAdmin
          ? <Component { ...props } />
          : <Redirect
            to={ { pathname: '/', state: { from: props.location } } }
          />
      }
    />
  )
}

export default AuthorizedRoute