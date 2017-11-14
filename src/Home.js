import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { openSidebar, closeSidebar, signout } from './actions'

import { Container } from 'react-grid-system'

import { ApiFetch } from './utils/ApiFetch'
import { KiwiLink } from './common/KiwiLink'


class Home extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openSidebar: T.func
    , closeSidebar: T.func
    , signout: T.func
  }

  componentWillReceiveProps() {
    this.props.closeSidebar()
  }

  componentWillMount() {
    this.props.closeSidebar()
  }

  componentWillUnmount() {
    this.props.openSidebar()
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
    , openSidebar: () => dispatch(openSidebar())
    , closeSidebar: () => dispatch(closeSidebar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
