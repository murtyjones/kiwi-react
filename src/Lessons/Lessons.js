import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderBy, find, findIndex, get, cloneDeep, isEqual, isEmpty } from 'lodash'

import { getManyLessons, getManyUserLessons, getLessonOrder } from '../actions'


import LessonCard from './LessonCard'
import LessonMap from './LessonMap'
import LessonMapBackground from './LessonMapBackground'
import insertIf from '../utils/insertIf'

const styles = {
  mapContainer: {
    width: '100vw'
    , position: 'absolute'
  },
  lessonCardContainer: {
    position: 'fixed'
    , right: '20px'
    , bottom: '20px'
    , width: '350px'
    , height: '400px'
    , zIndex: 1000
  }
}

class Lessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLessonId: null
      , lessonJustCompletedId: get(props, 'location.state.lessonJustCompletedId', '')
      , activeLessonId: ''
      , combinedMapLessons: null
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , getLessonOrder: T.func
    , userLessons: T.array
    , lessons: T.array
    , orderOfPublishedLessons: T.array
    , userId: T.string.isRequired
    , history: T.object.isRequired
  }

  componentWillMount() {
    const { closeSideNav, getManyLessons, getManyUserLessons, getLessonOrder, userId, orderOfPublishedLessons, lessons, userLessons } = this.props
    getManyLessons()
    getManyUserLessons({ userId })
    getLessonOrder()
    this.setCombinedMapLessons(orderOfPublishedLessons, lessons, userLessons)
  }

  componentWillReceiveProps(nextProps) {
    const { lessons, userLessons, orderOfPublishedLessons } = this.props
      , { lessons: nextLessons, userLessons: nextUserLessons, orderOfPublishedLessons: nextOrderOfPublishedLessons } = nextProps
      , orderHasChanged = !isEqual(orderOfPublishedLessons, nextOrderOfPublishedLessons)
      , lessonsHasChanged = !isEqual(lessons, nextLessons)
      , userLessonsHasChanged = !isEqual(userLessons, nextUserLessons)

    if(orderHasChanged || lessonsHasChanged || userLessonsHasChanged)
      this.setCombinedMapLessons(nextOrderOfPublishedLessons, nextLessons, nextUserLessons)
  }

  setCombinedMapLessons = (orderOfPublishedLessons, lessons, userLessons) => {
    let activeLessonId = ''
      const combinedMapLessons = orderOfPublishedLessons.map((lessonId, i) => {
        const lesson = find(lessons, { _id: lessonId }) || {}
          , userLesson = find(userLessons, { lessonId }) || {}
          , prevLessonId = i > 0 ? orderOfPublishedLessons[i - 1] : ''
          , prevLesson = find(lessons, { _id: prevLessonId }) || {}
          , prevUserLesson = find(userLessons, { lessonId: prevLesson._id }) || {}

        if(!lesson) return {}
        if(userLesson) {
          lesson.userLesson = userLesson
        }
        const hasBeenStartedButNotCompleted = !isEmpty(userLesson) && !userLesson.hasBeenCompleted
        const hasNotBeenStartedButIsNext = isEmpty(userLesson) && !isEmpty(prevUserLesson)
        if(hasBeenStartedButNotCompleted || hasNotBeenStartedButIsNext) {
          activeLessonId = lesson._id
        }
        return lesson
      })
    
    this.setState({
      combinedMapLessons
      , activeLessonId
    })
  }

  setSelectedLessonId = (selectedLessonId) => {
    this.setState({ selectedLessonId })
  }

  render() {
    const { lessons, orderOfPublishedLessons } = this.props
    const { selectedLessonId, lessonJustCompletedId, activeLessonId, combinedMapLessons } = this.state
    const selectedLessonPosition = selectedLessonId
      ? 1 + orderOfPublishedLessons.indexOf(selectedLessonId)
      : 0

    return [
      <LessonMapBackground key='LessonMapBackground' />
      ,
      <LessonMap
        key='LessonMap'
        mapLessons={ combinedMapLessons }
        selectedLessonId={ selectedLessonId }
        lessonJustCompletedId={ lessonJustCompletedId }
        activeLessonId={ activeLessonId }
        setSelectedLessonId={ this.setSelectedLessonId }
      />
      ,
      ...insertIf(selectedLessonId,
        <LessonCard
          key='LessonCard'
          lesson={ {
              ...find(lessons, { _id: selectedLessonId })
              , order: selectedLessonPosition
            }
          }
          style={ styles.lessonCardContainer }
        />
      )
    ]
  }

}

const mapStateToProps = (state) => {
  const { auth: { userId },lessonMetadata: { lessonOrder }, userLessons: { userLessonsById }, lessons: { lessonsById } } = state

  const userLessons = cloneDeep(Object.values(userLessonsById))
    , lessons = cloneDeep(Object.values(lessonsById).filter(each => each.isPublished))
    , orderOfPublishedLessons = get(lessonOrder, 'order', [])

  return {
    lessons: orderBy(lessons, ['order'], ['asc'])
    , userLessons
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
