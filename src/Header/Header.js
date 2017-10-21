import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'

//Material ui stuf
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

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

  navigateTo = (loc) => {
    console.log(loc)
    this.props.history.push(loc)

  }

  render() {
    const styles = {
      backgroundColor: "#ffffff"
    };

    const { isLoggedIn } = this.props
    const renderLogout = isLoggedIn ? ({"title": "Logout", "path": "/logout"}) : ({"title": "Login", "path": "/login"})

    return (
      <AppBar
        styles={styles}
        title="Kiwi Compute"
        iconElementRight={<FlatButton label={renderLogout.title} onClick={() => this.navigateTo(renderLogout.path)}/>}
      />
    )
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