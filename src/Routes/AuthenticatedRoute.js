import React, {PropTypes} from "react"
import { Route, Redirect } from "react-router-dom"
import WithTheme from '../hocs/WithTheme'

function AuthenticatedRoute ({component: Component, isLoggedIn, title, setTopBarTitle, ...rest}) {
  return (
    <Route
      { ...rest }
      render={
        (props) => isLoggedIn === true
          ?
          <WithTheme
            WrappedComponent={ Component }
            title={ title }
            setTopBarTitle={ setTopBarTitle }
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