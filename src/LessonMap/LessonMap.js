import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import withRouter from 'react-router-dom/withRouter'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import withStyles from '@material-ui/core/styles/withStyles'


import { getLessonOrder, getManyLessons, getManyUserLessons } from '../actions'
import withTopBarTitle from '../hocs/withTopBarTitle'
import * as lessonUtils from './lessonUtils'
import { darkerGrey } from '../colors'

import MapNavigationControls from './MapNavigationControls'
import MapViewport from './MapViewport'
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


class LessonMap extends Component {
  constructor(props) {
    super()
    this.state = {
      lessonJustCompletedId: get(props, 'location.state.lessonJustCompletedId', ''),
      activeSectionIndex: props.defaultActiveSectionIndex
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
    , defaultActiveSectionIndex: T.number.isRequired
    , activeSections: T.array.isRequired
  }

  componentDidMount() {
    const { userId } = this.props
    // retrieve lesson data
    this.props.getManyLessons()
    this.props.getManyUserLessons({ userId })
    this.props.getLessonOrder()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.defaultActiveSectionIndex !== prevProps.defaultActiveSectionIndex &&
      this.props.defaultActiveSectionIndex === this.state.activeSectionIndex
    ) {
      this.updateActiveSectionIndex(this.props.defaultActiveSectionIndex)
    }
  }

  updateActiveSectionIndex = i => this.setState({
    activeSectionIndex: i, lessonJustCompletedId: ''
  })

  render() {
    const { classes, activeLessonId, orderedCombinedLessonData } = this.props
    const { lessonJustCompletedId, activeSectionIndex } = this.state

    return (
      <div className={ classes.root }>
        <MapViewport>
          <MapSection
            activeSectionIndex={ activeSectionIndex }
            lessonJustCompletedId={ lessonJustCompletedId }
            orderedCombinedLessonData={ orderedCombinedLessonData }
            activeLessonId={ activeLessonId }
          />
          {/* Navigation must come after bubbles */}
          <MapNavigationControls
            onSectionArrowClick={ this.updateActiveSectionIndex }
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

  const orderedCombinedLessonData = lessonUtils.makeCombinedLessonData({ orderOfPublishedLessons, lessons, userLessons })
  const activeLessonId = lessonUtils.getActiveLessonId(orderedCombinedLessonData)
  const defaultActiveSectionIndex = lessonUtils.getActiveSectionIndex(orderedCombinedLessonData)

  return {
    orderedCombinedLessonData
    , userId
    , profile
    , activeLessonId
    , defaultActiveSectionIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: params => dispatch(getManyLessons(params))
    , getLessonOrder: () => dispatch(getLessonOrder())
    , getManyUserLessons: params => dispatch(getManyUserLessons(params))
  }
}

LessonMap = withTopBarTitle(LessonMap, { title: 'Lesson Map' })

LessonMap = withStyles(styles)(LessonMap)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonMap))
