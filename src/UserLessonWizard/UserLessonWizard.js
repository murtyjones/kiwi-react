import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { get, find, isEqual, isEmpty, has, cloneDeep } from 'lodash'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'

import { postUserLesson, putUserLesson, getManyUserLessons, getLesson } from '../actions'
import UserLessonWizardForm from './UserLessonWizardForm'


const getIdFromPathName = pathname => {

}

class UserLessonWizard extends Component {
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
    , userId: T.string.isRequired
    , userLesson: T.object.isRequired
    , initialValues: T.object
    , currentValues: T.object
    , history: T.any.isRequired
  }

  componentWillMount() {
    const { getManyUserLessons, getLesson, userId, match: { params: { id } }, location: { pathname } } = this.props
    const { needsLesson } = this.state
    if(needsLesson) {
      getLesson({ id })
      getManyUserLessons({ lessonId: id, userId })
    }
  }

  componentWillReceiveProps(nextProps) {
    const lessonHasChanged = !isEqual(this.props.lesson, nextProps.lesson)
    const userLessonHasChanged = !isEqual(this.props.userLesson, nextProps.userLesson)
    if((lessonHasChanged || userLessonHasChanged) && !isEmpty(nextProps.lesson)) {
      this.setState({ isNew: false, needsLesson: false })
    }
  }

  handleSubmit = (params) => {
    const { postUserLesson, putUserLesson, userLesson } = this.props
    const _id = get(params ,'_id')
      , id = get(params, 'id')
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
    const { lesson, userLesson, initialValues, currentValues } = this.props
    const { activeSlideIndex, needsLesson } = this.state


    return !needsLesson
      ? (
        <UserLessonWizardForm
          onSubmit={ this.handleSubmit }
          lesson={ lesson }
          initialValues={ initialValues }
          currentValues={ currentValues }
          activeSlideIndex={ activeSlideIndex }
          goToNextSlide={ this.goToNextSlide }
          goToPrevSlide={ this.goToPrevSlide }
          onFinalSlideNextClick={ this.handleFinalSlideNextClick }
        />
      )
      : 'loading'

  }
}
export const UserLessonWizardComponent = UserLessonWizard


const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, lessons: { lessonsById }, userLessons: { userLessonsByLessonId } } = state
  const { match: { params: { id } } } = ownProps

  let initialValues = { answerData: [], lessonId: id }

  const lesson = lessonsById[id] || {}
  const userLesson = userLessonsByLessonId[id] || {}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLessonWizard))