import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { signout } from '../actions'
import withoutMainNavigation from '../hocs/withoutMainNavigation'


class SignOut extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    signout: T.func
    , history: T.any
    , location: T.any
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

SignOut = withoutMainNavigation(SignOut)

export default withRouter(connect(null, mapDispatchToProps)(SignOut))
