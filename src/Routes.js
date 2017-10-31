import React, { Component } from 'react'
import * as T from 'prop-types'
import { Router, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import LoginOrRegister from './LoginOrRegister/LoginOrRegister'
import AddOrEditLesson from './admin/AddOrEditLesson/AddOrEditLesson'
import ManageLessons from './admin/ManageLessons/ManageLessons'
import history from './history'

import AuthService from './utils/AuthService'



const authService = new AuthService()



/**
 * Routing Components
 */
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import AuthorizedRoute from './Routes/AuthorizedRoute'


/**
 * Route Components/Containers
 */
import Home from './Home'
import Dashboard from './Dashboard/Dashboard'
import UserProject from './UserProject/UserProject'



const baseAppStyle = {
  "border-radius": 0
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
    , isAdmin: T.bool.isRequired
  }

  logout = () => {
    this.props.signout().then(() => {
      this.props.history.push("/login")
    })
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props

    const handleAuthentication = (nextState, replace) => {
      if (/access_token|id_token|error/.test(nextState.location.hash)) {
        return authService.handleAuthentication().then(result => {
          AuthService.setSession(result)
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
                <Route path='/login' exact auth={ authService } component={ LoginOrRegister } />
                <Route path='/register' exact auth={ authService } component={ LoginOrRegister } />
                <AuthenticatedRoute path='/dashboard' exact component={ Dashboard } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/new' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/:id' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
                <AuthorizedRoute path='/admin/lessons' exact component={ ManageLessons } isLoggedIn={ isLoggedIn } isAdmin={ isAdmin } />
                <AuthorizedRoute path='/admin/lesson/new' exact component={ AddOrEditLesson } isLoggedIn={ isLoggedIn } isAdmin={ isAdmin } />
                <AuthorizedRoute path='/admin/lesson/:id' exact component={ AddOrEditLesson } isLoggedIn={ isLoggedIn } isAdmin={ isAdmin } />
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
  const { auth: { isLoggedIn, isAdmin } } = state

  return {
    isLoggedIn
    , isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
