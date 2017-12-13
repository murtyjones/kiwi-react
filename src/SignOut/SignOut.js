import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find } from 'lodash'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { openSideNav, closeSideNav, closeTopBar, openTopBar, signout } from '../actions'


class SignOut extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    signout: T.func
    , closeSideNav: T.func
    , openSideNav: T.func
    , openTopBar: T.func
    , closeTopBar: T.func
    , history: T.any
    , location: T.any
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  handleSignout = () => {
    const { signout } = this.props
    return signout()
    .then(() => {
      this.props.history.push("/")
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    this.handleSignout()
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignOut))