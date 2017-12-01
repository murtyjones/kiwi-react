import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderBy, find, get } from 'lodash'

import { getManyLessons, getManyUserLessons } from '../actions'

import LessonCard from './LessonCard'
import LessonMap from './LessonMap'

const generateMinWidth = (sideNavWidth) => {
  return 1024 - sideNavWidth
}

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
    let _minWidth = generateMinWidth(props.sideNavWidth)
    this.state = {
      width: _minWidth // this is temporary
      , startingWidth: _minWidth // this is temporary
      , scaleX: 1
      , scaleY: 1
      , minWidth: _minWidth
      , selectedLessonId: null
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , userLessons: T.array
    , lessons: T.array
    , sideNavWidth: T.number.isRequired
  }

  componentWillMount() {
    this.props.getManyLessons()
    this.props.getManyUserLessons()
  }

  componentDidMount() {
    const clientWidth = this.lessonsContainerNode.clientWidth
    const width = Math.max(clientWidth, this.state.minWidth)
    this.setState({
      startingWidth: width
      , width: width
      , scaleX: width / this.state.minWidth
      , scaleY: width / this.state.minWidth

    })
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.sideNavWidth !== nextProps.sideNavWidth) {
      this.setState({ minWidth: generateMinWidth(nextProps.sideNavWidth) })
      this.updateDimensions()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    const clientWidth = this.lessonsContainerNode.clientWidth
    const width = Math.max(clientWidth, this.state.minWidth)
    const scaleX = width / this.state.minWidth
    const scaleY = scaleX
    this.setState({ width, scaleX, scaleY })
  }

  setSelectedLessonId = (selectedLessonPosition) => {
    const selectedLessonId = get(find(this.props.lessons, { order: selectedLessonPosition }), '_id')
    this.setState({ selectedLessonId })
  }


  render() {
    const { width, scaleX, scaleY, selectedLessonId } = this.state
    const { userLessons, lessons } = this.props
    const activeLessons = lessons.reduce((acc, lesson) => {
      const userLesson = find(userLessons, { lessonId: lesson._id })
      if(userLesson) {
        lesson.userLesson = userLesson
        acc.push(lesson)
      }
      return acc
    }, [])

    const inactiveLessons = lessons.filter(lesson => !find(activeLessons, { _id: lesson._id }) )

    const stageProportion = 0.70
    return (
      <div ref={ (c) => { this.lessonsContainerNode = c } }>
        <LessonMap
          width={ width * stageProportion }
          scaleX={ scaleX }
          scaleY={ scaleY }
          activeLessons={ activeLessons }
          inactiveLessons={ inactiveLessons }
          selectedLessonId={ selectedLessonId }
          setSelectedLessonId={ this.setSelectedLessonId }
        />
        { selectedLessonId &&
          <LessonCard
            lesson={ find(lessons, { _id: selectedLessonId }) }
            style={ {
              ...styles.lessonCardContainer,
              width: width * (1 - stageProportion) - 20,
              height: Math.max(width * (1 - stageProportion), 400),
            } }
          />
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { userLessons: { userLessonsById }, lessons: { lessonsById }, sideNav: { sideNavWidth } } = state

  const userLessons = Object.values(userLessonsById)
  const lessons = Object.values(lessonsById)

  return {
    lessons: orderBy(lessons, ['order'], ['asc'])
    , userLessons
    , sideNavWidth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: (params) => dispatch(getManyLessons(params))
    , getManyUserLessons: (params) => dispatch(getManyUserLessons(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
