import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getManyLessons, getManyUserLessons } from '../actions'

import LessonCard from './LessonCard'
import LessonMap from './LessonMap'

const minWidth = 1024 - 256 // minimum screen of 1024 (minus sidebar width)

const styles = {
  lessonCardContainer: {
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
    this.state = {
      width: minWidth, // this is temporary
      startingWidth: minWidth, // this is temporary
      scaleX: 1,
      scaleY: 1,
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , lessonsById: T.object
    , userLessons: T.object
  }

  componentDidMount() {
    const clientWidth = this.lessonsContainerNode.clientWidth
    const width = Math.max(clientWidth, minWidth)
    this.setState({
      startingWidth: width
      , width: width
      , scaleX: width / minWidth
      , scaleY: width / minWidth

    })
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    const clientWidth = this.lessonsContainerNode.clientWidth
    const newWidth = Math.max(clientWidth, minWidth)
    this.setState({
      width: newWidth
      , scaleX: newWidth / minWidth
      , scaleY: newWidth / minWidth
    })
  }


  render() {
    const { width, scaleX, scaleY } = this.state
    const { lessonsById } = this.props

    const mockActiveLessons = [
      {
        isCompleted: true
      },
      {
        _id: '123',
        isCompleted: false,
        completenessPercentage: 34
      }
    ]

    const mockInactiveLessons = [
      {

      },
      {

      },
      {

      }
    ]

    const stageProportion = 0.70
    console.log(width * (1 - stageProportion))
    return (
      <div ref={ (c) => { this.lessonsContainerNode = c } }>
        <LessonMap
          width={ width * stageProportion }
          scaleX={ scaleX }
          scaleY={ scaleY }
          activeLessons={ mockActiveLessons }
          inactiveLessons={ mockInactiveLessons }
        />
        <LessonCard
          style={ {
            ...styles.lessonCardContainer,
            width: width * (1 - stageProportion) - 20,
            height: Math.max(width * (1 - stageProportion), 400),
          } }
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
