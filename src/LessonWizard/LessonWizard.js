import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find, isEqual, isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { postUserLesson, putUserLesson, getManyUserLessons, getLesson } from '../actions'
import LessonWizardForm from './LessonWizardForm'


class LessonWizard extends Component {
  constructor(props) {
    super(props)
    const isNew = props.match.path.includes('new')
    const lessonIsLoaded = !isEmpty(props.lesson)
    this.state = {
      activeSlideIndex: 0
      , isNew
      , needsLesson: !lessonIsLoaded
    }
  }

  static propTypes = {
    postUserLesson: T.func.isRequired
    , putUserLesson: T.func.isRequired
    , getManyUserLessons: T.func.isRequired
    , getLesson: T.func.isRequired
    , lesson: T.object.isRequired
    , userLesson: T.object.isRequired
  }

  componentWillMount() {
    const { getManyUserLessons, getLesson, match: { params: { id } } } = this.props
    const { needsLesson } = this.state
    if(needsLesson) {
      getLesson({ id })
      getManyUserLessons({ lessonId: id }).then(results => {

      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const lessonHasChanged = !isEqual(this.props.lesson, nextProps.lesson)
    const userLessonHasChanged = !isEqual(this.props.userLesson, nextProps.userLesson)
    if(lessonHasChanged && userLessonHasChanged) {
      this.setState({ isNew: false, needsLesson: false })
    }
  }

  handleSubmit = (params) => {
    const { postUserLesson, putUserLesson } = this.props
    const _id = params._id
    if(_id) {
      delete params._id
      params.id = _id
      return putUserLesson(params)
    }
    return postUserLesson(params).then(res => {
      this.props.history.push(`/lessons/${res._id}`)
    })
  }

  goToNextSlide = () => {
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })
  }

  goToPrevSlide = () => {
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })
  }

  render() {
    const { lesson, userLesson } = this.props
    const { activeSlideIndex, needsLesson } = this.state
    return !needsLesson ?
      <LessonWizardForm
        onSubmit={ this.handleSubmit }
        lesson={ lesson }
        initialValues={ userLesson }
        activeSlideIndex={ activeSlideIndex }
        goToNextSlide={ this.goToNextSlide }
        goToPrevSlide={ this.goToPrevSlide }
      />
      : 'loading'

  }
}
export const LessonWizardComponent = LessonWizard


const mapStateToProps = (state, ownProps) => {
  const { lessons: { lessonsById }, userLessons: { userLessonsById } } = state
  const { match: { params: { id } } } = ownProps

  const lesson = lessonsById[id] || {}
  const userLesson = userLessonsById[id] || {}

  return {
    lesson
    , userLesson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postUserLesson: params => dispatch(postUserLesson(params))
    , putUserLesson: params => dispatch(putUserLesson(params))
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
    , getLesson: params => dispatch(getLesson(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonWizard))