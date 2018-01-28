import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderBy, find, findIndex, get, cloneDeep, isEqual } from 'lodash'

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
      , userLessonJustCompletedId: get(props, 'location.state.userLessonJustCompletedId', '')
      , mapLessons: null
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
    this.setMapLessons(orderOfPublishedLessons, lessons, userLessons)
  }

  componentWillReceiveProps(nextProps) {
    const { lessons, userLessons, orderOfPublishedLessons } = this.props
      , { lessons: nextLessons, userLessons: nextUserLessons, orderOfPublishedLessons: nextOrderOfPublishedLessons } = nextProps
      , orderHasChanged = !isEqual(orderOfPublishedLessons, nextOrderOfPublishedLessons)
      , lessonsHasChanged = !isEqual(lessons, nextLessons)
      , userLessonsHasChanged = !isEqual(userLessons, nextUserLessons)

    if(orderHasChanged || lessonsHasChanged || userLessonsHasChanged)
      this.setMapLessons(nextOrderOfPublishedLessons, nextLessons, nextUserLessons)
  }

  setMapLessons = (orderOfPublishedLessons, lessons, userLessons) =>
    this.setState({
      mapLessons: orderOfPublishedLessons.map(lessonId => {
        const lesson = find(lessons, { _id: lessonId })
          , userLesson = find(userLessons, { lessonId })

        if(!lesson) return {}
        if(userLesson) {
          lesson.userLesson = userLesson
        }
        if(userLesson && this.state.userLessonJustCompletedId === userLesson._id) {
          lesson.justCompleted = true
        }
        return lesson
      })
    })

  setSelectedLessonId = (selectedLessonId) => {
    this.setState({ selectedLessonId })
  }

  render() {
    const { lessons, orderOfPublishedLessons } = this.props
    const { selectedLessonId, mapLessons } = this.state
    const selectedLessonPosition = selectedLessonId
      ? 1 + orderOfPublishedLessons.indexOf(selectedLessonId)
      : 0

    return [
      <LessonMapBackground key='LessonMapBackground' />
      ,
      <LessonMap
        key='LessonMap'
        mapLessons={ mapLessons }
        selectedLessonId={ selectedLessonId }
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
