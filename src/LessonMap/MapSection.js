import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import findIndex from 'lodash/findIndex'
import { CSSTransition } from 'react-transition-group'
import posed from 'react-pose'

import { lessonMapNavigationDataBySection, lessonMapImagesBySection, NAV_OPTIONS } from './LESSON_CONSTANTS'
import * as lessonUtils from './lessonUtils'
import { preload } from './imageUtils'
import setTimeoutAsync from '../utils/setTimeoutAsync'
import MapBubbles from './MapBubbles'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  thing1: {},
  thing2: {
    position: 'relative',
    top: -4
  },
})

const CENTERED = 'CENTERED'

let Thing = ({ className, children, hostRef, src }) =>
  <div ref={ hostRef }>
    <img
      className={ className }
      style={ { width: '100%', height: '100%' } }
      src={ src }
    />
    { children }
  </div>

const duration = 1500

Thing = posed(Thing)({
  [CENTERED]: {
    x: 0, y: 0, transition: { duration }
  },
  [NAV_OPTIONS.UP]: {
    x: 0, y: '100%', transition: { duration }
  },
  [NAV_OPTIONS.DOWN]: {
    x: 0, y: '-100%', transition: { duration }
  },
  [NAV_OPTIONS.LEFT]: {
    x: '-100%', y: 0, transition: { duration }
  },
  [NAV_OPTIONS.RIGHT]: {
    x: '100%', y: 0, transition: { duration }
  },
})


class MapSection extends Component {
  constructor(props) {
    super()

    this.state = {
      prevSectionIndex: props.activeSectionIndex,
      thingOneActive: true,
      imagesBySection: preload(lessonMapImagesBySection),
      pose: CENTERED
    }
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.activeSectionIndex !== this.props.activeSectionIndex) {
      this.setState({ prevSectionIndex: this.props.activeSectionIndex })
      const activeSectionNavigationData = lessonMapNavigationDataBySection[this.props.activeSectionIndex]
      const directionKeyIndex = findIndex(Object.values(activeSectionNavigationData.adjacentSectionIndices), {
        sectionIndex: nextProps.activeSectionIndex
      })
      if (directionKeyIndex > -1) {
        const pose = this.state.pose === CENTERED
          ? Object.keys(activeSectionNavigationData.adjacentSectionIndices)[directionKeyIndex]
          : CENTERED
        this.setState({ pose, thingOneActive: !this.state.thingOneActive })
      }
    }
  }

  render() {
    const {
      activeLessonId, orderedCombinedLessonData, lessonJustCompletedId, classes, activeSectionIndex
    } = this.props
    const { pose, thingOneActive, imagesBySection, prevSectionIndex } = this.state

    const thingOneSectionIndex = thingOneActive ? activeSectionIndex : prevSectionIndex
    const thingTwoSectionIndex = thingOneActive ? prevSectionIndex   : activeSectionIndex

    return (
      <div className={ classes.root }>

        <Thing // thing 1
          pose={ pose }
          className={ classes.thing1 }
          src={ imagesBySection[thingOneSectionIndex].src }
        >
          <MapBubbles
            lessonJustCompletedId={ lessonJustCompletedId }
            orderedCombinedLessonData={ orderedCombinedLessonData }
            activeLessonId={ activeLessonId }
            sectionIndex={ thingOneSectionIndex }
          />
        </Thing>

        <Thing // thing 2
          pose={ pose }
          className={ classes.thing2 }
          src={ imagesBySection[thingTwoSectionIndex].src }
        >
          <MapBubbles
            lessonJustCompletedId={ lessonJustCompletedId }
            orderedCombinedLessonData={ orderedCombinedLessonData }
            activeLessonId={ activeLessonId }
            sectionIndex={ thingTwoSectionIndex }
          />
        </Thing>

      </div>
    )
  }
}

MapSection.propTypes = {
  classes: T.object,
  activeSectionIndex: T.number,
  orderedCombinedLessonData: T.array,
  children: T.any,
  lessonJustCompletedId: T.string,
  activeLessonId: T.string,
}

export default withStyles(styles)(MapSection)