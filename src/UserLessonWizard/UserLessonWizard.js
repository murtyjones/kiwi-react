import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find, isEqual, isEmpty, has, cloneDeep } from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import BluebirdPromise from 'bluebird'

import { postUserLesson, putUserLesson, getManyUserLessons, getLesson, getLessonTheme, setGlobalColors, setTopBarTitle } from '../actions'
import { GLOBAL_COLORS } from '../constants'
import UserLessonWizardForm from './UserLessonWizardForm'

const getLatestCompletedSlide = (lesson, userLesson) => {
  const slides = lesson.slides || []
  for (let i = 0, len = slides.length; i < len; i++) {
    const slide = lesson.slides[i]
    const slideAnswerData = get(userLesson, `answerData.${slide.id}`, {})
    if(!slideAnswerData.isAnsweredCorrectly) {
      return i
    }
  }
  return 0 // if all done, take to first slide
}

class UserLessonWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , lessonAndUserLessonReceived: false
    }
  }

  static propTypes = {
    postUserLesson: T.func.isRequired
    , putUserLesson: T.func.isRequired
    , getManyUserLessons: T.func.isRequired
    , setTopBarTitle: T.func.isRequired
    , getLesson: T.func.isRequired
    , lesson: T.object.isRequired
    , userId: T.string.isRequired
    , userLesson: T.object.isRequired
    , initialValues: T.object
    , history: T.any.isRequired
    , isFetchingUserLessons: T.bool.isRequired
  }

  componentWillMount() {
    const { getManyUserLessons, getLesson, getLessonTheme, lesson, userLesson, lessonTheme, userId, match: { params: { id } } } = this.props
      , lessonIsEmpty = isEmpty(lesson)
      , userLessonIsEmpty = isEmpty(userLesson)
      , themeIsEmpty = isEmpty(lessonTheme)
    if(lessonIsEmpty) getLesson({id})
    if(userLessonIsEmpty) getManyUserLessons({ lessonId: id, userId })
    if(lesson.themeId && themeIsEmpty) getLessonTheme({ id: lesson.themeId })
    if(!lessonIsEmpty && !userLessonIsEmpty) {
      const activeSlideIndex = getLatestCompletedSlide(lesson, userLesson)
      return this.setState({ activeSlideIndex, lessonAndUserLessonReceived: true })
    }
    if(!lessonIsEmpty) this.props.setTopBarTitle(lesson.title)
  }

  componentWillUnmount() {
    this.props.setGlobalColors(GLOBAL_COLORS.default)
  }

  componentWillReceiveProps(nextProps) {
    const { lesson, userLesson, userId, lessonTheme, match: { params: { id } } } = this.props
    const { lessonAndUserLessonReceived } = this.state
    const { match: { params: { id: nextId } } } = nextProps
      , lessonIdHasChanged = !isEqual(id, nextId)
      , lessonHasChanged = !isEqual(lesson, nextProps.lesson)
      , userLessonHasChanged = !isEqual(userLesson, nextProps.userLesson)
      , userIdHasChanged = !isEqual(userId, nextProps.userId)
      , lessonThemeIdHasChanged = !isEqual(nextProps.lesson.themeId, lesson.themeId)
      , lessonWasEmpty = isEmpty(lesson)
      , userLessonWasEmpty = isEmpty(userLesson)
      , newGlobalColors = GLOBAL_COLORS[(nextProps.lessonTheme.name || 'default').toLowerCase()]
      , globalColorsNeedsChanging = nextProps.globalColors.primaryColor !== newGlobalColors.primaryColor
      , titleNeedsSetting = !isEqual(nextProps.topBarTitle, nextProps.lesson.title)

    if(lessonIdHasChanged || userIdHasChanged) {
      nextProps.getLesson({ id: nextId })
      nextProps.getManyUserLessons({ lessonId: nextId, userId: nextProps.userId })
    }

    if(lessonThemeIdHasChanged) {
      nextProps.getLessonTheme({ id: nextProps.lesson.themeId })
    }

    if(lessonHasChanged || userLessonHasChanged && !lessonAndUserLessonReceived) {
      const activeSlideIndex = getLatestCompletedSlide(nextProps.lesson, nextProps.userLesson)
      this.setState({ activeSlideIndex, lessonAndUserLessonReceived: true })
    }

    if(globalColorsNeedsChanging) this.setTopBarColor(newGlobalColors)

    if(titleNeedsSetting) this.props.setTopBarTitle(nextProps.lesson.title)
  }

  setTopBarColor = newGlobalColors => this.props.setGlobalColors(newGlobalColors)

  handleSubmit = (params) => {
    const { postUserLesson, putUserLesson } = this.props
    const _id = get(params ,'_id', null)
      , id = get(params, 'id', null)
    if(_id) {
      delete params._id
      params.id = _id
      return putUserLesson(params)
    } else if (id) {
      return putUserLesson(params)
    }
    return postUserLesson(params)
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })


  handleFinalSlideNextClick = () =>
    this.props.history.push({
      pathname: '/lessons'
      , state: {
        lessonJustCompletedId: this.props.lesson._id
      }
    })

  render() {
    const { lesson, initialValues, lessonTheme, isFetchingUserLessons, globalColors } = this.props
    const { activeSlideIndex } = this.state

    return !isEmpty(lesson)
      ? (
        <UserLessonWizardForm
          onSubmit={ this.handleSubmit }
          isFetchingUserLessons={ isFetchingUserLessons }
          lesson={ lesson }
          lessonTheme={ lessonTheme }
          globalColors={ globalColors }
          initialValues={ initialValues }
          activeSlideIndex={ activeSlideIndex }
          goToNextSlide={ this.goToNextSlide }
          goToPrevSlide={ this.goToPrevSlide }
          onFinalSlideNextClick={ this.handleFinalSlideNextClick }
        />
      ) : null
  }
}
export const UserLessonWizardComponent = UserLessonWizard


const mapStateToProps = (state, ownProps) => {
  const {
    auth: { userId }
    , lessons: { lessonsById }
    , userLessons: { userLessonsByLessonId, isFetching }
    , lessonThemes: { lessonThemesById }
    , globalColors
    , topBar: { topBarTitle }
  } = state
  const { match: { params: { id } } } = ownProps

  let initialValues = { answerData: [], lessonId: id }

  const lesson = lessonsById[id] || {}
  const userLesson = userLessonsByLessonId[id] || {}
  const lessonTheme = lessonThemesById[lesson.themeId] || {}
  if(!isEmpty(userLesson)) {
    initialValues = cloneDeep(userLesson)
    initialValues.answerData = []
  }

  // this is very important: we want to organize the userLesson answerData
  // by the latest and most up-to-date order of slides in the lesson.
  get(lesson, 'slides', []).forEach((each, i) => {
    const answer = get(userLesson, `answerData[${each.id}]`, {})
    if(!isEmpty(answer)) {
      initialValues.answerData[i] = answer
    } else {
      initialValues.answerData[i] = { answer: '', id: each.id, isViewed: false }
    }
  })

  return {
    lesson
    , userLesson
    , userId
    , initialValues
    , lessonTheme
    , globalColors
    , topBarTitle
    , isFetchingUserLessons: isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postUserLesson: params => dispatch(postUserLesson(params))
    , putUserLesson: params => dispatch(putUserLesson(params))
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
    , getLesson: params => dispatch(getLesson(params))
    , getLessonTheme: params => dispatch(getLessonTheme(params))
    , setGlobalColors: params => dispatch(setGlobalColors(params))
    , setTopBarTitle: params => dispatch(setTopBarTitle(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLessonWizard))