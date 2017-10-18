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

// import UserProject from './UserProject'

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


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Container } from 'react-grid-system';

import { kiwiGreen, kiwiLightGreen, kiwiPurple, kiwiLightPurple,
  kiwiDarkBlue, kiwiLightRed, kiwiWhite, kiwiYellow, kiwiTurq,
  kiwiOrange, kiwiLightBlue, kiwiDarkGreen } from './colors';


const main_theme = getMuiTheme({
  palette: {
    primary1Color: kiwiGreen,
    primary2Color: kiwiLightPurple,
    accent1Color: kiwiPurple,
    accent2Color: kiwiLightGreen,
    textColor: kiwiLightPurple,
    alternateTextColor: kiwiLightPurple,
    canvasColor: kiwiPurple
  }
});

const alt_theme1 = getMuiTheme({
  palette: {
    primary1Color: kiwiDarkBlue,
    primary2Color: kiwiWhite,
    accent1Color: kiwiYellow,
    accent2Color: kiwiYellow,
    textColor: "#ffffff",
    alternateTextColor: "#ffffff",
    canvasColor: kiwiYellow
  }
});

const alt_theme2 = getMuiTheme({
  palette: {
    primary1Color: kiwiTurq,
    primary2Color: kiwiOrange,
    accent1Color: kiwiOrange,
    accent2Color: kiwiDarkGreen,
    textColor: kiwiLightBlue,
    alternateTextColor: kiwiLightBlue,
    canvasColor:  kiwiOrange
  }
});


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeValue: 1
      , theme: main_theme
    };
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
          <MuiThemeProvider muiTheme={this.state.theme}>
            <div>
              <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/login' exact component={ LoginOrRegister } />
                <Route path='/register' exact component={ LoginOrRegister } />
                <AuthenticatedRoute path='/dashboard' exact component={ Dashboard } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/new' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/:id' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
              </Switch>
            </div>
          </MuiThemeProvider>
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
