import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderBy, find, findIndex, get, cloneDeep } from 'lodash'

import { getManyLessons, getManyUserLessons, getLessonOrder } from '../actions'

import LessonCard from './LessonCard'
import LessonMap from './LessonMap'

const stageProportion = 0.70

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
      , selectedLessonPosition: null
      , userLessonJustCompletedId: get(props, 'location.state.userLessonJustCompletedId', '')
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , getLessonOrder: T.func
    , userLessons: T.array
    , lessons: T.array
    , orderOfPublishedLessons: T.array
    , sideNavWidth: T.number.isRequired
    , userId: T.string.isRequired
    , history: T.object.isRequired
  }

  componentWillMount() {
    const { getManyLessons, getManyUserLessons, getLessonOrder, userId } = this.props
    getManyLessons()
    getManyUserLessons({ userId })
    getLessonOrder()
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

  setSelectedLessonId = (selectedLessonId) => {
    this.setState({ selectedLessonId })
  }


  render() {
    const { width, scaleX, scaleY, selectedLessonId, userLessonJustCompletedId } = this.state
    const { userLessons, lessons, orderOfPublishedLessons } = this.props
    const selectedLessonPosition = selectedLessonId
      ? 1 + orderOfPublishedLessons.indexOf(selectedLessonId)
      : 0

    const mapLessons = orderOfPublishedLessons.map(lessonId => {
      const lesson = find(lessons, { _id: lessonId })
        , userLesson = find(userLessons, { lessonId })

      if(!lesson) return {}
      if(userLesson) lesson.userLesson = userLesson
      if(userLesson && userLessonJustCompletedId === userLesson._id) lesson.justCompleted = true
      return lesson
    })

    return (
      <div ref={ (c) => { this.lessonsContainerNode = c } }>
        <LessonMap
          width={ width * stageProportion }
          scaleX={ scaleX }
          scaleY={ scaleY }
          mapLessons={ mapLessons }
          selectedLessonId={ selectedLessonId }
          setSelectedLessonId={ this.setSelectedLessonId }
        />
        { selectedLessonId &&
          <LessonCard
            lesson={ {
                ...find(lessons, { _id: selectedLessonId })
                , order: selectedLessonPosition
              }
            }
            style={ {
              ...styles.lessonCardContainer
              , width: width * (1 - stageProportion) - 20
              , height: Math.max(width * (1 - stageProportion), 400)
            } }
          />
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { auth: { userId },lessonMetadata: { lessonOrder }, userLessons: { userLessonsById }, lessons: { lessonsById }, sideNav: { sideNavWidth } } = state

  const userLessons = cloneDeep(Object.values(userLessonsById))
    , lessons = cloneDeep(Object.values(lessonsById).filter(each => each.isPublished))
    , orderOfPublishedLessons = get(lessonOrder, 'order', [])

  return {
    lessons: orderBy(lessons, ['order'], ['asc'])
    , userLessons
    , sideNavWidth
    , orderOfPublishedLessons
    , userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: (params) => dispatch(getManyLessons(params))
    , getLessonOrder: () => dispatch(getLessonOrder())
    , getManyUserLessons: (params) => dispatch(getManyUserLessons(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
