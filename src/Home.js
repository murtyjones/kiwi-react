import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signout } from './actions/index'

import { Container } from 'react-grid-system';

import { ApiFetch } from './utils/ApiFetch'
import { KiwiLink } from './KiwiLinks'


class Home extends Component {
  constructor(props) {
    super(props)
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
        <Container fluid>
          Welcome to Kiwi!
          <br />
          <KiwiLink to={ "/login" }>Login</KiwiLink> or <KiwiLink to={ "/register" }>register</KiwiLink> to get started!
        </Container>
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
