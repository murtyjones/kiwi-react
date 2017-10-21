import React, { Component } from 'react'
import * as T from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import LoginOrRegister from './LoginOrRegister/LoginOrRegister'


import Header from './Header/Header'

/**
 * Routing Components
 */
import AuthenticatedRoute from './AuthenticatedRoute'


/**
 * Route Components/Containers
 */
import Home from './Home'
import Dashboard from './Dashboard/Dashboard'
import UserProject from './UserProject/UserProject'



const baseAppStyle = {
  "borderRadius": 0
  , "margin": 0
  , "position": "absolute"
  , "left": 0
  , "top": 0
  , "right": 0
  , "bottom": 0
  , "backgroundColor": "#ededed"
  , "fontFamily": "Roboto, sans-serif"
}

class App extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <div>
          <Helmet>
            <title>Kiwi Compute</title>
          </Helmet>
          <div className={ cns('baseAppStyles') } style={ baseAppStyle } >
            <Header isLoggedIn={ isLoggedIn } />
            <Switch>
              <Route path='/' exact component={ Home } />
              <Route path='/login' exact component={ LoginOrRegister } />
              <Route path='/register' exact component={ LoginOrRegister } />
              <AuthenticatedRoute path='/dashboard' exact component={ Dashboard } isLoggedIn={ isLoggedIn } />
              <AuthenticatedRoute path='/project/new' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
              <AuthenticatedRoute path='/project/:id' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export const AppComponent = App

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state

  return {
    isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(App))
