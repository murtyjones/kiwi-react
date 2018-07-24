import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import BluebirdPromise from 'bluebird'

import { postUserLesson, putUserLesson, getManyUserLessons, getManyUserVariables, getManyVariables, getLesson, setGlobalColors, setTopBarTitle } from '../actions'
import { GLOBAL_COLORS } from '../constants'
import UserLessonWizardForm from './UserLessonWizardForm'
import withTopBarTitle from '../hocs/withTopBarTitle'
import withTopBarBreadCrumb from '../hocs/withTopBarBreadCrumb'

const getLatestCompletedSlide = (lesson = {}, userLesson = {}) => {
  const slides = lesson.slides || []
  for (let i = 0, len = slides.length; i < len; i++) {
    const slide = lesson.slides[i]
    const slideAnswerData = get(userLesson, `answerData.${slide.id}`, {})
    if (!slideAnswerData.isAnsweredCorrectly) {
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
      , hasLoaded: false
    }
  }

  static propTypes = {
    postUserLesson: T.func.isRequired
    , putUserLesson: T.func.isRequired
    , getManyUserLessons: T.func.isRequired
    , getManyUserVariables: T.func.isRequired
    , getManyVariables: T.func.isRequired
    , setTopBarTitle: T.func.isRequired
    , setGlobalColors: T.func.isRequired
    , getLesson: T.func.isRequired
    , lesson: T.object.isRequired
    , userId: T.string.isRequired
    , userLesson: T.object.isRequired
    , initialValues: T.object
    , history: T.any.isRequired
    , globalColors: T.any.isRequired
    , isFetchingUserLessons: T.bool.isRequired
    , variablesWithUserValues: T.array.isRequired
  }

  async componentDidMount() {
    const { userId, match: { params: { id } } } = this.props
    const promises = [
      this.props.getManyUserVariables()
      , this.props.getManyVariables()
      , this.props.getLesson({id})
      , this.props.getManyUserLessons({ lessonId: id, userId })
    ]
    await BluebirdPromise.all(promises)
  }

  componentDidUpdate(prevProps, prevState) {
    const { lesson, userLesson } = this.props
    if (!prevState.hasLoaded && !isEmpty(lesson) && !isEmpty(userLesson)) {
      this.setState({
        hasLoaded: true,
        activeSlideIndex: getLatestCompletedSlide(lesson, userLesson)
      })
    }

    const lessonIdHasChanged = !isEqual(prevProps.match.params.id, this.props.match.params.id)
      , userIdHasChanged = !isEqual(this.props.userId, prevProps.userId)
      , newGlobalColors = GLOBAL_COLORS.defaultLesson
      , globalColorsNeedsChanging = this.props.globalColors.primaryColor !== newGlobalColors.primaryColor
      , titleNeedsSetting = !isEqual(this.props.topBarTitle, this.props.lesson.title)

    if (lessonIdHasChanged || userIdHasChanged) {
      this.props.getLesson({ id: this.props.match.params.id })
      this.props.getManyUserLessons({ lessonId: this.props.match.params.id, userId: this.props.userId })
    }

    if (globalColorsNeedsChanging)
      this.setTopBarColor(newGlobalColors)

    if (titleNeedsSetting)
      this.props.setTopBarTitle(this.props.lesson.title)
  }

  componentWillUnmount() {
    this.props.setGlobalColors(GLOBAL_COLORS.default)
  }

  setTopBarColor = newGlobalColors => this.props.setGlobalColors(newGlobalColors)

  handleSubmit = (params) => {
    const { postUserLesson, putUserLesson } = this.props
    const _id = get(params ,'_id', null)
      , id = get(params, 'id', null)
    if (_id) {
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
    const { lesson, initialValues, isFetchingUserLessons, globalColors, variablesWithUserValues } = this.props
    const { activeSlideIndex, hasLoaded } = this.state

    return hasLoaded
      ? (
        <UserLessonWizardForm
          onSubmit={ this.handleSubmit }
          isFetchingUserLessons={ isFetchingUserLessons }
          lesson={ lesson }
          globalColors={ globalColors }
          initialValues={ initialValues }
          activeSlideIndex={ activeSlideIndex }
          goToNextSlide={ this.goToNextSlide }
          goToPrevSlide={ this.goToPrevSlide }
          onFinalSlideNextClick={ this.handleFinalSlideNextClick }
          variablesWithUserValues={ variablesWithUserValues }
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
    , globalColors
    , topBar: { topBarTitle }
    , variables: { variablesById }
    , userVariables: { userVariablesById }
  } = state
  const variables = Object.values(variablesById)
  const userVariables = Object.values(userVariablesById)
  const { match: { params: { id } } } = ownProps
  const lesson = lessonsById[id] || {}
  const userLesson = userLessonsByLessonId[id] || {}

  let initialValues = { answerData: [], lessonId: id }
  if (!isEmpty(userLesson)) {
    initialValues = cloneDeep(userLesson)
    initialValues.answerData = []
  }

  // this is very important: we want to organize the userLesson answerData
  // by the latest and most up-to-date order of slides in the lesson.
  get(lesson, 'slides', []).forEach((each, i) => {
    const answerData = get(userLesson, `answerData[${each.id}]`, {})
    if (!isEmpty(answerData)) {
      initialValues.answerData[i] = answerData
    } else if (!!each.editorInput) {
      initialValues.answerData[i] = { answer: each.editorInput, id: each.id, isViewed: false }
    } else {
      initialValues.answerData[i] = { answer: '', id: each.id, isViewed: false }
    }
  })

  initialValues.userId = userId

  const variablesWithUserValues = cloneDeep(variables).map(each => {
    const userVariable = find(userVariables, { variableId: each._id }) || {}
    return { ...each, value: userVariable.value }
  })

  return {
    lesson
    , userLesson
    , userId
    , initialValues
    , globalColors
    , topBarTitle
    , isFetchingUserLessons: isFetching
    , variablesWithUserValues
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postUserLesson: params => dispatch(postUserLesson(params))
    , putUserLesson: params => dispatch(putUserLesson(params))
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
    , getManyUserVariables: params => dispatch(getManyUserVariables(params))
    , getManyVariables: params => dispatch(getManyVariables(params))
    , getLesson: params => dispatch(getLesson(params))
    , setGlobalColors: params => dispatch(setGlobalColors(params))
    , setTopBarTitle: params => dispatch(setTopBarTitle(params))
  }
}

UserLessonWizard = withTopBarBreadCrumb(UserLessonWizard, {
  breadcrumbLink: '/lessons', breadcrumbText: ''
})

UserLessonWizard = withTopBarTitle(UserLessonWizard, {
  showMiddleSection: false
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLessonWizard))
