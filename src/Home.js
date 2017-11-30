import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { openSideNav, closeSideNav, openTopBar, closeTopBar, signout } from './actions'

import { Container } from 'react-grid-system'

import { ApiFetch } from './utils/ApiFetch'
import { KiwiLink } from './common/KiwiLink'


class Home extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openSideNav: T.func
    , closeSideNav: T.func
    , openTopBar: T.func
    , closeTopBar: T.func
    , signout: T.func
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  render() {
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


const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
