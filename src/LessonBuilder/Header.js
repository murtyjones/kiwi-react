import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'

//Material ui stuf
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

// Internal
import HeaderMenu from './HeaderMenu'
import CreateLessonModal from './CreateLessonModal'

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props)

    this.state={
      open: false
    }
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
    , signout: T.func.isRequired
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  logout = () => {
    this.props.signout().then(() => {
      this.props.history.push("/login")
    })
  }

  showNewLessonModal = () => {
    this.setState({open: true})
  }

  render() {
    const { isLoggedIn } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    var headerMenuInstance = (
      <HeaderMenu
        logout={this.logout}
        showNewLessonModal={this.showNewLessonModal}
      />
    )
    return (
      <div>
        <AppBar
          style={{backgroundColor: "#3f3061", height: "10vh",
          fontSize: "5vh"}}
          title="Kiwi Compute"
          showMenuIconButton={false}
          iconElementRight={isLoggedIn ? headerMenuInstance : <Login/>}
        />
        <CreateLessonModal
            modal={false}
            open={this.state.open}
            close={this.handleClose}
        />
      </div>
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
