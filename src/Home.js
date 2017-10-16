import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signout } from './actions/index'

import { ApiFetch } from './utils/ApiFetch'

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
    textColor: "white",
    alternateTextColor: "white",
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

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeValue: 1
      , theme: main_theme
    };
  }

  static propTypes = {
    greeting: T.string
    , signInWithEmailAndPassword: T.func
    , createUserWithEmailAndPassword: T.func
    , signout: T.func
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <div>
        <MuiThemeProvider muiTheme={this.state.theme}>
          <div>
            <Container fluid>
              Welcome to Kiwi!
              <br />
              <Link to={ "/login" }>Login</Link> or <Link to={ "/register" }>register</Link> to get started!
            </Container>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export const HomeComponent = Home



const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state;

  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInWithEmailAndPassword: (params) => dispatch(signInWithEmailAndPassword(params))
    , createUserWithEmailAndPassword: (params) => dispatch(createUserWithEmailAndPassword(params))
    , signout: () => dispatch(signout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
