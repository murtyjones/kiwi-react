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
import TextField from 'material-ui/TextField';

class CreateLessonModal extends Component {
  constructor(props) {
      super(props)
      this.state = {
          lessonName: "new lesson"
      }
  }

  handleNameChange = (e) => {
    var text = e.target.value
    this.setState({lessonName: text})
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.close}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.close}
      />,
    ];

    return (
        <Dialog
            title="Create New Lesson"
            actions={actions}
            modal={true}
            open={this.props.open}
            onRequestClose={this.props.close}
        >
            <TextField
                floatingLabelText="Lesson Name"
                floatingLabelFixed={true}
                value={this.state.lessonName}
                onChange={this.handleNameChange}
            />
        </Dialog>
    )
  }
}

export default CreateLessonModal