import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'
import LessonForm from './LessonForm'

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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from '../Store';

class LessonPlanner extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = async(v) => {
    const { trial } = v
    try {
      console.log('in handlesubmit try');
      console.log(trial);
    } catch(e) {
      console.log('in handlesubmit catch');
      console.log('value of e:', e);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <LessonForm
            onSubmit={this.handleSubmit}
          />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default LessonPlanner
