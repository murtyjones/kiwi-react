import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderBy, find, findIndex, get, cloneDeep, isEqual } from 'lodash'

import { getManyLessons, getManyUserLessons, getLessonOrder, openSideNav, closeSideNav } from '../actions'


import LessonCard from './LessonCard'
import LessonMap from './LessonMap'
import LessonMapBackground from './LessonMapBackground'

const stageProportion = 1

const minWidth = 1024

const generateMinWidth = (sideNavWidth) => {
  return 1024 - sideNavWidth
}

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
      width: minWidth // this is temporary
      , startingWidth: minWidth // this is temporary
      , scaleX: 1
      , scaleY: 1
      , minWidth: minWidth
      , selectedLessonId: null
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

  componentWillUnmount() {
    this.props.openSideNav()
    window.removeEventListener("resize", this.updateDimensions)
  }

  componentWillReceiveProps(nextProps) {
    const { lessons, userLessons, orderOfPublishedLessons, sideNavWidth } = this.props
      , { lessons: nextLessons, userLessons: nextUserLessons, orderOfPublishedLessons: nextOrderOfPublishedLessons, sideNavWidth: nextSideNavWidth } = nextProps
      , orderHasChanged = !isEqual(orderOfPublishedLessons, nextOrderOfPublishedLessons)
      , lessonsHasChanged = !isEqual(lessons, nextLessons)
      , userLessonsHasChanged = !isEqual(userLessons, nextUserLessons)
      , sideNavHasChanged = sideNavWidth !== nextSideNavWidth

    if(sideNavHasChanged) {
      this.updateDimensions()
    }
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
    const { lessons, orderOfPublishedLessons, sideNavWidth } = this.props
    const { width, scaleX, scaleY, selectedLessonId, mapLessons } = this.state
    const selectedLessonPosition = selectedLessonId
      ? 1 + orderOfPublishedLessons.indexOf(selectedLessonId)
      : 0

    return [
      <LessonMapBackground
        key='LessonMapBackground'
        sideNavWidth={ sideNavWidth }
      />
      ,
      <div
        key='LessonMap'
        ref={ c => { this.lessonsContainerNode = c } }
        style={ styles.mapContainer}
      >
        <LessonMap
          width={ width * stageProportion }
          sideNavWidth={ sideNavWidth }
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
            style={ styles.lessonCardContainer }
          />
        }
      </div>
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
