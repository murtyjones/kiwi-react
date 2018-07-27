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
import { getActiveLessonId, getActiveSectionIndex, makeCombinedLessonData } from './lessonUtils'
import { darkerGrey } from '../colors'

import MapViewport from './MapViewport'
import MapBubbles from './MapBubbles'
import MapSection from './MapSection'

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: darkerGrey,
    display: 'flex'
  }
})


class Lessons extends Component {
  constructor(props) {
    super()
    this.state = {
      lessonJustCompletedId: get(props, 'location.state.lessonJustCompletedId', '')
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
    , activeLessonId: T.string
    , activeSectionIndex: T.number.isRequired
  }

  componentDidMount() {
    const { userId } = this.props
    // retrieve lesson data
    this.props.getManyLessons()
    this.props.getManyUserLessons({ userId })
    this.props.getLessonOrder()
  }

  render() {
    const { classes, activeLessonId, activeSectionIndex, orderedCombinedLessonData } = this.props
    const { lessonJustCompletedId } = this.state

    return (
      <div className={ classes.root }>
        <MapViewport>
          <MapSection
            activeSectionIndex={ activeSectionIndex }
          />
          <MapBubbles
            lessonJustCompletedId={ lessonJustCompletedId }
            orderedCombinedLessonData={ orderedCombinedLessonData }
            activeLessonId={ activeLessonId }
            activeSectionIndex={ activeSectionIndex }
          />
        </MapViewport>
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

  const orderedCombinedLessonData = makeCombinedLessonData({ orderOfPublishedLessons, lessons, userLessons })
  const activeLessonId = getActiveLessonId(orderedCombinedLessonData)
  const activeSectionIndex = getActiveSectionIndex(orderedCombinedLessonData)

  return {
    orderedCombinedLessonData
    , userId
    , profile
    , activeLessonId
    , activeSectionIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: params => dispatch(getManyLessons(params))
    , getLessonOrder: () => dispatch(getLessonOrder())
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
  }
}

Lessons = withTopBarTitle(Lessons, { title: 'Lesson Map' })

Lessons = withStyles(styles)(Lessons)

Lessons = withRedirectIfTempPassword(Lessons)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
