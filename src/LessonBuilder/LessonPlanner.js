import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'

//Material ui stuf
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import LessonCard from './LessonCard'
import TextField from 'material-ui/TextField'
import Header from './Header'
import renderIf from 'render-if'
import { isEmpty } from 'lodash'
import { getManyLessons, postLesson } from '../actions'

// checkboxes
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

class LessonPlanner extends Component {
  constructor(props) {
    super(props)

    this.state={
      option1: true,
      option2: false,
      option3: false,
      pages: true,
      steps: false,
      open: false
    }
  }

  updateCheck(option){
    if (option===1) {
      this.setState({
        option1:true,
        option2:false,
        option3:false
      })
    }
    if (option===2) {
      this.setState({
        option1:false,
        option2:true,
        option3:false
      })
    }
    if (option===3) {
      this.setState({
        option1:false,
        option2:false,
        option3:true
      })
    }
    if (option==='pages') {
      this.setState({
        pages:true,
        steps:false
      })
    }
    if (option==='steps') {
      this.setState({
        pages:false,
        steps:true
      })
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Back"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    const style = {
      margin: 12,
    };

    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
      question: {
        float: 'right'
      },
      dialog: {
        display: 'inline-block',
        height: '150px',
        width: '50%'
      }
    };

    return (
      <div>
        <Header isLoggedIn={this.props.isLoggedIn}/>
        <Card>
          <Paper zDepth={1} >
            <CardHeader
              title="Without Avatar"
              subtitle="Subtitle"
            />
          </Paper>
          <Paper zDepth={1} >
            <RaisedButton label="Dialog" onClick={this.handleOpen} />
            <Dialog
              title="Instructions"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <Paper style={styles.dialog}>Option 1</Paper>
              <Paper style={styles.dialog}>Option 2</Paper>
              <Paper style={styles.dialog}>Option 3</Paper>
              <Paper style={styles.dialog}>Instructions</Paper>
            </Dialog>
            <Checkbox
              label="Option 1"
              checked={this.state.option1}
              onClick={()=>this.updateCheck(1)}
              style={styles.checkbox}
            />
            <Checkbox
              label="Option 2"
              checked={this.state.option2}
              onClick={()=>this.updateCheck(2)}
              style={styles.checkbox}
            />
            <Checkbox
              label="Option 3"
              checked={this.state.option3}
              onClick={()=>this.updateCheck(3)}
              style={styles.checkbox}
            />
          </Paper>
          <Paper zDepth={1} >
            <Checkbox
              label="Pages"
              checked={this.state.pages}
              onClick={()=>this.updateCheck('pages')}
              style={styles.checkbox}
            />
            <Checkbox
              label="Steps"
              checked={this.state.steps}
              onClick={()=>this.updateCheck('steps')}
              style={styles.checkbox}
            />
          </Paper>
          <RaisedButton label="Add" style={style} />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state
  const { lessons: { lessonsById } } = state
  return {
    isLoggedIn,
    lessonsById,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout()),
    getManyLessons: () => dispatch(getManyLessons()),
    postLesson: (params) => dispatch(postLesson(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonPlanner))
