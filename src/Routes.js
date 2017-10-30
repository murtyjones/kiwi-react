import React, { Component } from 'react'
import * as T from 'prop-types'
import { Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import LoginOrRegister from './LoginOrRegister/LoginOrRegister'
import AddOrEditLesson from './admin/AddOrEditLesson/AddOrEditLesson'
import ManageLessons from './admin/ManageLessons/ManageLessons'
import Callback from './Callback/Callback'
import history from './history'

import AuthServiceV2 from './utils/AuthServiceV2'

const authServiceV2 = new AuthServiceV2()



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

    const handleAuthentication = (nextState, replace) => {
      if (/access_token|id_token|error/.test(nextState.location.hash)) {
        return authServiceV2.handleAuthentication().then(result => {
          AuthServiceV2.setSession(result)
          history.replace('/dashboard')
        })
      }
    }

    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <div>
          <Helmet>
            <title>Kiwi Compute</title>
          </Helmet>
          <div className={ cns('baseAppStyles') } style={ baseAppStyle } >
            <Router history={ history }>
              <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/login' exact auth={ authServiceV2 } component={ LoginOrRegister } />
                <Route path='/register' exact auth={ authServiceV2 } component={ LoginOrRegister } />
                <Route path="/auth/callback" render={
                  (props) => {
                    handleAuthentication(props)
                    return <Callback {...props} />
                  }
                } />
                <AuthenticatedRoute path='/dashboard' exact component={ Dashboard } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/new' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/:id' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/admin/lessons' exact component={ ManageLessons } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/admin/lesson/new' exact component={ AddOrEditLesson } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/admin/lesson/:id' exact component={ AddOrEditLesson } isLoggedIn={ isLoggedIn } />
              </Switch>
            </Router>
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
