import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { NAV_OPTIONS } from './LESSON_CONSTANTS'
import NavArrowBar from './NavArrowBar'

const styles = () => ({

})



class MapNavigation extends Component {
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
          navArrowDirection={ NAV_OPTIONS.TOP }
          { ...rest }
        />
        <NavArrowBar
          navArrowDirection={ NAV_OPTIONS.RIGHT }
          { ...rest }
        />
        <NavArrowBar
          navArrowDirection={ NAV_OPTIONS.BOTTOM }
          { ...rest }
        />
        <NavArrowBar
          navArrowDirection={ NAV_OPTIONS.LEFT }
          { ...rest }
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(MapNavigation)