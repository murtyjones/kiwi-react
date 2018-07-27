import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import find from 'lodash/find'
import withStyles from '@material-ui/core/styles/withStyles'
import { lessonBubbleDisplayDataBySection } from './LESSON_CONSTANTS'

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
    const { classes, activeLessonId, activeSectionIndex, lessonJustCompletedId, orderedCombinedLessonData } = this.props
    console.log(activeSectionIndex)
    const sectionLessonsBubbleDisplayData = lessonBubbleDisplayDataBySection[activeSectionIndex]
    return (
      <div className={ cns(classes.root) }>
        { sectionLessonsBubbleDisplayData.map((lessonDisplayData, i) => {
          return (
            <MapBubble
              key={ i }
              i={ i }
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
  activeSectionIndex: T.number,
  lessonJustCompletedId: T.string,
}

export default withStyles(styles)(MapBubbles)