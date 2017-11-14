import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getManyLessons, getManyUserLessons } from '../actions'

import LessonCard from './LessonCard'
import LessonMap from './LessonMap'

const styles = {
  lessonCard: {
    position: 'fixed'
    , right: '20px'
    , bottom: '20px'
    , width: '350px'
    , height: '400px'
  }
}

class Lessons extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , lessonsById: T.object
    , userLessons: T.object
  }


  render() {
    const { lessonsById } = this.props

    return (
      <div>
        <LessonMap
          lessons={ Object.values(lessonsById) }
        />
        <LessonCard
          style={ styles.lessonCard }
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { lessons: { lessonsById } } = state

  return {
    lessonsById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: (params) => dispatch(getManyLessons(params))
    , getManyUserLessons: (params) => dispatch(getManyLessons(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
