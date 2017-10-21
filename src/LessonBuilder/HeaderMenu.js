import React, { Component } from 'react'

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
          <IconButton><MoreVertIcon style={{color: "#ffffff"}}/></IconButton>
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

export default HeaderMenu