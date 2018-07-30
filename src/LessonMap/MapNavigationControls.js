import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { NAV_OPTIONS } from './LESSON_CONSTANTS'
import NavArrowBar from './NavArrowBar'

const styles = () => ({

})



class MapNavigationControls extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    classes: T.object.isRequired,
    activeSectionIndex: T.number.isRequired,
    activeLessonId: T.string.isRequired,
    lessonJustCompletedId: T.string,
    orderedCombinedLessonData: T.array.isRequired,
    onSectionArrowClick: T.func.isRequired,
  }

  render() {
    const {
      activeSectionIndex, activeLessonId, orderedCombinedLessonData, lessonJustCompletedId, onSectionArrowClick
    } = this.props

    const rest = {
      activeSectionIndex,
      activeLessonId,
      orderedCombinedLessonData,
      lessonJustCompletedId,
      onSectionArrowClick,
    }

    return (
      <Fragment>
        <NavArrowBar
          navArrowDirection={ NAV_OPTIONS.UP }
          animationClassName='rubberBandRepeat'
          { ...rest }
        />
        <NavArrowBar
          navArrowDirection={ NAV_OPTIONS.RIGHT }
          animationClassName='rubberBandRepeat'
          { ...rest }
        />
        <NavArrowBar
          navArrowDirection={ NAV_OPTIONS.DOWN }
          animationClassName='rubberBandRepeat'
          { ...rest }
        />
        <NavArrowBar
          navArrowDirection={ NAV_OPTIONS.LEFT }
          animationClassName='rubberBandRepeat'
          { ...rest }
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(MapNavigationControls)