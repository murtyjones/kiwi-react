import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import find from 'lodash/find'
import withStyles from '@material-ui/core/styles/withStyles'
import { lessonLocationsBySection } from './LESSON_CONSTANTS'

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
    const lessonBubbleLocations = lessonLocationsBySection[activeSectionIndex]

    return (
      <div className={ cns(classes.root) }>
        { lessonBubbleLocations.map((coords, i) => {
          return (
            <MapBubble
              key={ i }
              i={ i }
              coords={ coords }
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