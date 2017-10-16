import React, { Component } from 'react'
import * as T from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import { isEmpty }  from 'lodash'
import { Promise as BluebirdPromise } from 'bluebird'
import Config from 'config'

import LoginOrRegister from './LoginOrRegister/LoginOrRegister'


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

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isLoggedIn } = this.props
    const mainClassName = cns('activePage')

    return (
      <div className={ cns('mainApp') }>
        <Helmet>
          <title>Kiwi Compute</title>
        </Helmet>

        <div className={ mainClassName }>
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
    )
  }
}

export const AppComponent = App

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state;

  return {
    isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(App))
