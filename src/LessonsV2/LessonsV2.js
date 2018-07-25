import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import withRouter from 'react-router-dom/withRouter'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import withStyles from '@material-ui/core/styles/withStyles'


import { getLessonOrder, getManyLessons, getManyUserLessons } from '../actions'
import withTopBarTitle from '../hocs/withTopBarTitle'
import withRedirectIfTempPassword from '../hocs/withRedirectIfTempPassword'
import { getActiveLessonId, makeCombinedLessonData } from './lessonUtils'

const styles = theme => ({
  root: {}
})

class LessonsV2 extends Component {
  constructor(props) {
    super()
    this.state = {
      selectedLessonId: null
      , lessonJustCompletedId: get(props, 'location.state.lessonJustCompletedId', '')
      , activeLessonId: getActiveLessonId(props.orderedCombinedLessonData)
      , combinedMapLessons: null
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , getLessonOrder: T.func
    , orderedCombinedLessonData: T.array.isRequired
    , userId: T.string.isRequired
    , history: T.object.isRequired
    , profile: T.object.isRequired
    , classes: T.object.isRequired
  }

  componentDidMount() {
    const { userId } = this.props
    // retrieve lesson data
    this.props.getManyLessons()
    this.props.getManyUserLessons({ userId })
    this.props.getLessonOrder()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        hello
      </div>
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
    orderedCombinedLessonData: makeCombinedLessonData({ orderOfPublishedLessons, lessons, userLessons })
    , userId
    , profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: params => dispatch(getManyLessons(params))
    , getLessonOrder: () => dispatch(getLessonOrder())
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
  }
}

LessonsV2 = withTopBarTitle(LessonsV2, { title: 'Lesson Map' })

LessonsV2 = withStyles(styles)(LessonsV2)

LessonsV2 = withRedirectIfTempPassword(LessonsV2)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonsV2))
