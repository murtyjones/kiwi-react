import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import withRouter from 'react-router-dom/withRouter'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import cloneDeep from 'lodash/cloneDeep'
import withStyles from '@material-ui/core/styles/withStyles'


import {
  getLessonOrder, getManyLessons, getManyUserLessons, getProfileDetails
} from '../actions'
import withTopBarTitle from '../hocs/withTopBarTitle'
import {getActiveLessonId, makeCombinedLessonData} from "./lessonUtils";

const styles = theme => ({

})

class LessonsV2 extends Component {
  constructor(props) {
    super()
    this.state = {
      selectedLessonId: null
      , lessonJustCompletedId: get(props, 'location.state.lessonJustCompletedId', '')
      , activeLessonId: getActiveLessonId(props.combinedLessonData)
      , combinedMapLessons: null
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , getLessonOrder: T.func
    , getProfileDetails: T.func
    , combinedLessonData: T.object.isRequired
    , userId: T.string.isRequired
    , history: T.object.isRequired
    , profile: T.object.isRequired
  }

  componentDidMount() {
    const { userId } = this.props
    this.props.getManyLessons()
    this.props.getManyUserLessons({ userId })
    this.props.getLessonOrder()
    // get profile details (for temporaryPassword check)
    this.props.getProfileDetails({ userId })
  }

  componentDidUpdate(prevProps, prevState) {
    // redirect if student needs to set a permanent password
    if (this.props.profile.temporaryPassword) {
      this.props.history.push('/student')
    }
  }

  render() {
    return (
      <div>Hello</div>
    )
  }

}

const mapStateToProps = (state) => {
  const {
    auth: { userId },
    lessonMetadata: { lessonOrder },
    userLessons: { userLessonsById },
    lessons: { lessonsById },
    profiles: { profilesById }
  } = state

  const profile = profilesById[userId] || {}

  const userLessons = cloneDeep(Object.values(userLessonsById))
  const lessons = cloneDeep(Object.values(lessonsById).filter(each => each.isPublished))
  const orderOfPublishedLessons = get(lessonOrder, 'order', [])

  return {
    combinedLessonData: makeCombinedLessonData({ orderOfPublishedLessons, lessons, userLessons })
    , userId
    , profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: params => dispatch(getManyLessons(params))
    , getLessonOrder: () => dispatch(getLessonOrder())
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
    , getProfileDetails: params => dispatch(getProfileDetails(params))
  }
}
LessonsV2 = withTopBarTitle(LessonsV2, { title: 'Lesson Map' })

LessonsV2 = withStyles(styles)(LessonsV2)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonsV2))
