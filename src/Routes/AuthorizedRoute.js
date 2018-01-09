import React, {PropTypes} from "react"
import { Route, Redirect } from "react-router-dom"
import {setTopBarTitle} from "../actions/TopBar"

function AuthorizedRoute ({component: Component, isLoggedIn, title, isAdmin, ...rest}) {
  if(title) {
    setTopBarTitle(title)
  }
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