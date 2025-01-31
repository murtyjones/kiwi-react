import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import { lessonBubbleDisplayDataBySection } from './LESSON_CONSTANTS'
import * as lessonUtils from './lessonUtils'

import MapBubble from './MapBubble'

const styles = theme => ({
  root: {
    position: 'absolute'
    , top: 0
    , bottom: 0
    , right: 0
    , left: 0
  }
})

class MapBubbles extends Component {
  constructor() {
    super()
  }

  render() {
    const { classes, activeLessonId, sectionIndex, lessonJustCompletedId, orderedCombinedLessonData } = this.props
    const sectionLessonsBubbleDisplayData = lessonBubbleDisplayDataBySection[sectionIndex]
    const sectionStartingLessonIndex = lessonUtils.getSectionStartingLessonIndex(sectionIndex)

    return (
      <div className={ cns(classes.root) }>
        { sectionLessonsBubbleDisplayData.map((lessonDisplayData, i) => {
          return (
            <MapBubble
              key={ i + sectionStartingLessonIndex }
              i={ i + sectionStartingLessonIndex }
              lessonDisplayData={ lessonDisplayData }
              orderedCombinedLessonData={ orderedCombinedLessonData }
              lessonJustCompletedId={ lessonJustCompletedId }
              activeLessonId={ activeLessonId }
            />
          )
        } )}
      </div>
    )
  }
}

MapBubbles.propTypes = {
  classes: T.object,
  children: T.any,
  orderedCombinedLessonData: T.array,
  activeLessonId: T.string,
  sectionIndex: T.number,
  lessonJustCompletedId: T.string,
}

export default withStyles(styles)(MapBubbles)