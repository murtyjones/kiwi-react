import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find, isEqual, isEmpty, has, cloneDeep } from 'lodash'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import BluebirdPromise from 'bluebird'

import { postUserLesson, putUserLesson, getManyUserLessons, getLesson, getLessonTheme } from '../actions'
import UserLessonWizardForm from './UserLessonWizardForm'

class UserLessonWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
    }
  }

  static propTypes = {
    postUserLesson: T.func.isRequired
    , putUserLesson: T.func.isRequired
    , getManyUserLessons: T.func.isRequired
    , getLesson: T.func.isRequired
    , lesson: T.object.isRequired
    , userId: T.string.isRequired
    , userLesson: T.object.isRequired
    , initialValues: T.object
    , currentValues: T.object
    , history: T.any.isRequired
  }

  componentWillMount() {
    const { getManyUserLessons, getLesson, getLessonTheme, userId, match: { params: { id } } } = this.props
    BluebirdPromise.all([
      getLesson({ id })
      , getManyUserLessons({ lessonId: id, userId })
    ]).then(([lesson, userLessonAsArray]) => {
      const userLesson = userLessonAsArray[0]
      getLessonTheme({ id: lesson.themeId })
      for (let i = 0, len = lesson.slides.length; i < len; i++) {
        const slide = lesson.slides[i]
        const slideAnswerData = get(userLesson, `answerData.${slide.id}`, {})
        if(!slideAnswerData.isAnsweredCorrectly) {
          return this.setState({ activeSlideIndex: i })
        }
      }
    })
  }

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

  goToNextSlide = () => {
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })
  }

  goToPrevSlide = () => {
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })
  }

  handleFinalSlideNextClick = () => {
    return this.props.history.push({
      pathname: '/lessons'
      , state: {
        userLessonJustCompletedId: this.props.userLesson._id
      }
    })
  }

  render() {
    const { lesson, initialValues, currentValues, theme } = this.props
    const { activeSlideIndex } = this.state
    return !isEmpty(lesson)
      ? (
        <UserLessonWizardForm
          onSubmit={ this.handleSubmit }
          lesson={ lesson }
          theme={ theme }
          initialValues={ initialValues }
          currentValues={ currentValues }
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
  const { auth: { userId }, lessons: { lessonsById }, userLessons: { userLessonsByLessonId }, lessonThemes: { lessonThemesById } } = state
  const { match: { params: { id } } } = ownProps

  let initialValues = { answerData: [], lessonId: id }

  const lesson = lessonsById[id] || {}
  const userLesson = userLessonsByLessonId[id] || {}
  const theme = lessonThemesById[lesson.themeId] || {}
  const currentValues = getFormValues('userLesson')(state) || {}
  if(!isEmpty(userLesson)) {
    initialValues = cloneDeep(userLesson)
    initialValues.answerData = []
  }

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
    , currentValues
    , theme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postUserLesson: params => dispatch(postUserLesson(params))
    , putUserLesson: params => dispatch(putUserLesson(params))
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
    , getLesson: params => dispatch(getLesson(params))
    , getLessonTheme: params => dispatch(getLessonTheme(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLessonWizard))