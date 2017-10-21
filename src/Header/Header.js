import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'

//Material ui stuf
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class HeaderMenu extends Component {

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon style={{backgroundColor: "#000000"}}/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="New Lesson"
          onClick={this.props.showNewLessonModal}
        />
        <MenuItem
          primaryText="Sign out"
          onClick={this.props.logout}
        />
      </IconMenu>
    )
  }
}

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
    const renderLogout = isLoggedIn ? ({"title": "Logout", "path": "/logout"}) : ({"title": "Login", "path": "/login"})

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
        style={{backgroundColor: "#3f3061"}}
        title="Kiwi Compute"
        showMenuIconButton={false}
        iconElementRight={isLoggedIn ? headerMenuInstance : <Login/>}
      />

      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        The actions in this window were passed in as an array of React objects.
      </Dialog>
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