import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import orderBy from 'lodash/orderBy'
import find from 'lodash/find'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

import { getManyLessons, getManyUserLessons, getLessonOrder, setGlobalColors } from '../actions'

import LessonList from './LessonList'
import './overrides.css'
import withTopBarTitle from '../hocs/withTopBarTitle'

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

  UNSAFE_componentWillMount() {
    const { getManyLessons, getManyUserLessons, getLessonOrder, userId, orderOfPublishedLessons, lessons, userLessons } = this.props
    getManyLessons()
    getManyUserLessons({ userId })
    getLessonOrder()
    this.setCombinedMapLessons(orderOfPublishedLessons, lessons, userLessons)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { lessons, userLessons, orderOfPublishedLessons } = this.props
      , { lessons: nextLessons, userLessons: nextUserLessons, orderOfPublishedLessons: nextOrderOfPublishedLessons } = nextProps
      , orderHasChanged = !isEqual(orderOfPublishedLessons, nextOrderOfPublishedLessons)
      , lessonsHasChanged = !isEqual(lessons, nextLessons)
      , userLessonsHasChanged = !isEqual(userLessons, nextUserLessons)

    if (orderHasChanged || lessonsHasChanged || userLessonsHasChanged)
      this.setCombinedMapLessons(nextOrderOfPublishedLessons, nextLessons, nextUserLessons)
  }

  setCombinedMapLessons = (orderOfPublishedLessons, lessons, userLessons) => {
    let activeLessonId = orderOfPublishedLessons[0] // at the very least, the first lesson should be active
    const combinedMapLessons = orderOfPublishedLessons.map((lessonId, i) => {
      const lesson = find(lessons, { _id: lessonId }) || {}
        , userLesson = find(userLessons, { lessonId }) || {}
        , prevLessonId = i > 0 ? orderOfPublishedLessons[i - 1] : ''
        , prevLesson = find(lessons, { _id: prevLessonId }) || {}
        , prevUserLesson = find(userLessons, { lessonId: prevLesson._id }) || {}

      if (!lesson) return {}
      lesson.userLesson = userLesson
      const hasBeenStartedButNotCompleted = !isEmpty(userLesson) && !userLesson.hasBeenCompleted
      const hasNotBeenStartedButIsNext = isEmpty(userLesson) && !isEmpty(prevUserLesson) && prevUserLesson.hasBeenCompleted
      if (hasBeenStartedButNotCompleted || hasNotBeenStartedButIsNext)
        activeLessonId = lesson._id
      return lesson
    })

    this.setState({ combinedMapLessons, activeLessonId })
  }

  setSelectedLessonId = selectedLessonId => this.setState({ selectedLessonId })

  render() {
    const { lessons, orderOfPublishedLessons } = this.props
    const { selectedLessonId, lessonJustCompletedId, activeLessonId, combinedMapLessons } = this.state

    return (
      <div className='betaLessonsList'>
        <LessonList
          lessons={ combinedMapLessons }
          selectedLessonId={ selectedLessonId }
          lessonJustCompletedId={ lessonJustCompletedId }
          activeLessonId={ activeLessonId }
          setSelectedLessonId={ this.setSelectedLessonId }
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { auth: { userId }, lessonMetadata: { lessonOrder }, userLessons: { userLessonsById }, lessons: { lessonsById } } = state

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
    getManyLessons: params => dispatch(getManyLessons(params))
    , getLessonOrder: () => dispatch(getLessonOrder())
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
    , setGlobalColors: params => dispatch(setGlobalColors(params))
  }
}

Lessons = withTopBarTitle(Lessons, {
  title: 'LessonMap (Beta)'
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
