import React, { Component } from 'react'
import * as T from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import { isEmpty }  from 'lodash'
import { Promise as BluebirdPromise } from 'bluebird'
import Config from 'config'


/**
 * Route Components/Containers
 */
import Home from './Home'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const mainClassName = cns('activePage')

    return (
      <div className={ cns('mainApp') }>
        <Helmet>
          <title>Kiwi Compute</title>
        </Helmet>

        <div className={ mainClassName }>
          <Switch>
            <Route path='/' exact component={ Home } />
          </Switch>
        </div>

      </div>
    )
  }
}

export const AppComponent = App
export default withRouter(connect(null, null)(App))
