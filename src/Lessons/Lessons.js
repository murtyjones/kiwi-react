import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderBy, find, findIndex, get, cloneDeep, isEqual } from 'lodash'

import { getManyLessons, getManyUserLessons, getLessonOrder, openSideNav, closeSideNav } from '../actions'


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
    openSideNav: T.func
    , closeSideNav: T.func
    , getManyLessons: T.func
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
    const { closeSideNav, getManyLessons, getManyUserLessons, getLessonOrder, userId, orderOfPublishedLessons, lessons, userLessons } = this.props
    closeSideNav()
    getManyLessons()
    getManyUserLessons({ userId })
    getLessonOrder()
    this.setMapLessons(orderOfPublishedLessons, lessons, userLessons)
  }

  componentWillUnmount() {
    this.props.openSideNav()
  }

  componentWillReceiveProps(nextProps) {
    const { lessons, userLessons, orderOfPublishedLessons, sideNavWidth } = this.props
      , { lessons: nextLessons, userLessons: nextUserLessons, orderOfPublishedLessons: nextOrderOfPublishedLessons, sideNavWidth: nextSideNavWidth } = nextProps
      , orderHasChanged = !isEqual(orderOfPublishedLessons, nextOrderOfPublishedLessons)
      , lessonsHasChanged = !isEqual(lessons, nextLessons)
      , userLessonsHasChanged = !isEqual(userLessons, nextUserLessons)

    if(orderHasChanged || lessonsHasChanged || userLessonsHasChanged) {
      this.setMapLessons(nextOrderOfPublishedLessons, nextLessons, nextUserLessons)
    }
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
    const { lessons, orderOfPublishedLessons, sideNavWidth } = this.props
    const { selectedLessonId, mapLessons } = this.state
    const selectedLessonPosition = selectedLessonId
      ? 1 + orderOfPublishedLessons.indexOf(selectedLessonId)
      : 0

    return [
      <LessonMapBackground
        key='LessonMapBackground'
        sideNavWidth={ sideNavWidth }
      />
      ,
      <LessonMap
        key='LessonMap'
        sideNavWidth={ sideNavWidth }
        mapLessons={ mapLessons }
        selectedLessonId={ selectedLessonId }
        setSelectedLessonId={ this.setSelectedLessonId }
      />
      ,
      ...insertIf(selectedLessonId,
        <LessonCard
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
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
