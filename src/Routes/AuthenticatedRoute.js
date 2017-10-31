import React, {PropTypes} from "react"
import { Route, Redirect } from "react-router-dom"

function AuthenticatedRoute ({component: Component, isLoggedIn, ...rest}) {
  return (
    <Route
      { ...rest }
      render={
        (props) => isLoggedIn === true
          ? <Component { ...props } />
          : <Redirect
              to={ { pathname: '/login', state: { from: props.location } } }
            />
      }
    />
  )
}

export default AuthenticatedRoute