import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'

//Material ui stuf
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import LessonCard from './LessonCard'
import Header from './Header'

class LessonBuilder extends Component {
  constructor(props) {
    super(props)

    this.state={
      open: false
    }
  }

  render() {
    return (
      <div>
        <Header isLoggedIn={this.props.isLoggedIn}/>
        <div id='canvas' width={500} height={500}>
          <h1>Lessons</h1>
          <LessonCard lessonCardData={this.props.lessonCardData}/>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonBuilder))
