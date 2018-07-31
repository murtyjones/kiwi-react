import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import ExpandLess  from '@material-ui/icons/ExpandLess'
import ExpandMore  from '@material-ui/icons/ExpandMore'
import ChevronLeft  from '@material-ui/icons/ChevronLeft'
import ChevronRight  from '@material-ui/icons/ChevronRight'
import LockOutline from '@material-ui/icons/LockOutline'

import { NAV_OPTIONS } from './LESSON_CONSTANTS'
import * as lessonUtils from './lessonUtils'
import * as clipPaths from './clipPaths'

const icons = {
  [NAV_OPTIONS.UP]: ExpandLess,
  [NAV_OPTIONS.DOWN]: ExpandMore,
  [NAV_OPTIONS.RIGHT]: ChevronRight,
  [NAV_OPTIONS.LEFT]: ChevronLeft,
}

const topHeight = '5%', bottomHeight = '5%'
const leftWidth = '2.5%', rightWidth = '2.5%'

const styles = () => ({
  root: {
    padding: 0,
    border: 'none',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    }
  },
  isUnlocked: {
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
    },
    cursor: 'pointer',
    '& $arrowIcon': {
      color: 'white'
    }
  },
  [NAV_OPTIONS.UP]: {
    top: 0,
    width: '100%',
    height: topHeight,
    clipPath: clipPaths.up,
    '-webkit-clip-path': clipPaths.up

  },
  [NAV_OPTIONS.DOWN]: {
    bottom: 0,
    width: '100%',
    height: bottomHeight,
    clipPath: clipPaths.down,
    '-webkit-clip-path': clipPaths.down

  },
  [NAV_OPTIONS.RIGHT]: {
    top: 0,
    height: '100%',
    width: rightWidth,
    right: 0,
    clipPath: clipPaths.right,
    '-webkit-clip-path': clipPaths.right
  },
  [NAV_OPTIONS.LEFT]: {
    top: 0,
    height: `100%`,
    width: leftWidth,
    left: 0,
    clipPath: clipPaths.left,
    '-webkit-clip-path': clipPaths.left

  },
  arrowIcon: {
    display: 'block',
    margin: 'auto',
    width: 'auto',
    height: '100%',
    color: 'rgba(256, 256, 256, 0.6)'
  },
  lockIcon: {
    display: 'block',
    color: 'rgba(256, 256, 256, 1)',
    margin: 'auto',
    width: 'auto',
    height: '100%',
  },
  [`icon-${NAV_OPTIONS.LEFT}`]: {
    width: '100%',
  },
  [`icon-${NAV_OPTIONS.RIGHT}`]: {
    width: '100%',
  },
})

class NavArrowBar extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    classes: T.object.isRequired,
    navArrowDirection: T.string.isRequired,
    animationClassName: T.string.isRequired,
    activeSectionIndex: T.number,
    activeLessonId: T.string,
    lessonJustCompletedId: T.string,
    orderedCombinedLessonData: T.array.isRequired,
  }

  render() {
    const {
      animationClassName, classes, navArrowDirection, activeLessonId, orderedCombinedLessonData, activeSectionIndex, lessonJustCompletedId, onSectionArrowClick
    } = this.props

    if (!lessonUtils.doesSectionUnlockDirection(navArrowDirection, activeSectionIndex)) {
      return null
    }

    const isUnlocked = lessonUtils.getIsSectionNavArrowUnlocked({
      navArrowDirection, orderedCombinedLessonData, activeSectionIndex
    })

    const to = lessonUtils.getArrowSectionIndex(navArrowDirection, activeSectionIndex)

    const Icon = icons[navArrowDirection]

    return (
      <button
        onClick={ isUnlocked ? () => onSectionArrowClick(to) : null }
        className={ cns(classes.root, classes[navArrowDirection], {
          [classes.isUnlocked]: isUnlocked
        }) }
      >
        { isUnlocked ?
          <Icon
            viewBox='6 6 12 12'
            className={ cns(classes.arrowIcon, classes[`icon-${navArrowDirection}`], {
              [animationClassName]: !!lessonJustCompletedId
            }) }
          />
          :
          <LockOutline
            viewBox='-1 -6 26 33'
            className={ cns(classes.lockIcon, classes[`icon-${navArrowDirection}`]) }
          />
        }
      </button>
    )
  }
}

export default withStyles(styles)(NavArrowBar)