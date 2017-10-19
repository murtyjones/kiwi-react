import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
    , signout: T.func.isRequired
  }

  logout = () => {
    this.props.signout().then(() => {
      this.props.history.push("/login")
    })
  }

  render() {
    const { isLoggedIn } = this.props
    const renderLogout = isLoggedIn ? (<div onClick={ this.logout }>Log out</div>) : null
    return renderLogout
  }
}

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state

  return {
    isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))