import React, { Component } from 'react'
import * as T from 'prop-types'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'


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
  fontFamily: 'Roboto, sans-serif'
  , palette: {
    primary1Color: kiwiGreen,
    primary2Color: kiwiLightPurple,
    accent1Color: kiwiPurple,
    accent2Color: kiwiLightGreen,
    textColor: '#333',
    alternateTextColor: kiwiLightPurple,
    canvasColor: '#ededed'
  }
});


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
    this.state = {
      themeValue: 1
      , theme: main_theme
    };
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <Helmet>
          <title>Kiwi Compute</title>
        </Helmet>
        <div className={ cns('baseAppStyles') } style={ baseAppStyle } >
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
