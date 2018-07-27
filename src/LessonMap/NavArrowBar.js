import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import ExpandLess  from '@material-ui/icons/ExpandLess'
import ExpandMore  from '@material-ui/icons/ExpandMore'
import ChevronLeft  from '@material-ui/icons/ChevronLeft'
import ChevronRight  from '@material-ui/icons/ChevronRight'
import Lock from '@material-ui/icons/Lock'

import { NAV_OPTIONS } from './LESSON_CONSTANTS'
import * as lessonUtils from './lessonUtils'

const icons = {
  [NAV_OPTIONS.TOP]: ExpandLess,
  [NAV_OPTIONS.BOTTOM]: ExpandMore,
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
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
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
  [NAV_OPTIONS.TOP]: {
    top: 0,
    width: '100%',
    height: topHeight,
    clipPath:
      'polygon(' +
        '0% 0%, '     + /* top left */
        '0% 0%, '     + /* top left */
        '100% 0%, '   + /* top right */
        '100% 0%, '   + /* top right */
        '100% 6%, '   + /* bottom right */
        '97.5% 100%, '+ /* bottom right */
        '2.5% 100%, ' + /* bottom left */
        '0% 7% '       + /* bottom left */
      ')'
  },
  [NAV_OPTIONS.BOTTOM]: {
    bottom: 0,
    width: '100%',
    height: bottomHeight,
    clipPath:
    'polygon(' +
      '0% 0%, '     + /* top left */
      '0% 0%, '     + /* top left */
      '100% 0%, '+ /* top right */
      '100% 0%, '   + /* top right */
      '97.5% 0%, '   + /* bottom right */
      '100% 100%, '+ /* bottom right */
      '0% 100%, ' + /* bottom left */
      '2.5% 0% '       + /* bottom left */
    ')' //0 0%, 0% 5%, 100% 0.25%, 100% 0%, 97.5% 0%, 100% 100%, 2.5% 95%, 0% 0%
  },
  [NAV_OPTIONS.RIGHT]: {
    top: 0,
    height: '100%',
    width: rightWidth,
    right: 0,
    clipPath:
    'polygon(' +
      '0% 0%, '     + /* top left */
      '0% 5%, '     + /* top left */
      '100% 0.25%, '+ /* top right */
      '100% 0%, '   + /* top right */
      '100% 6%, '   + /* bottom right */
      '97.5% 100%, '+ /* bottom right */
      '2.5% 95%, ' + /* bottom left */
      '0% 0% '       + /* bottom left */
    ')'
  },
  [NAV_OPTIONS.LEFT]: {
    top: 0,
    height: `100%`,
    width: leftWidth,
    left: 0,
    clipPath:
    'polygon(' +
      '100% 0%, '+ /* top left */
      '100% 0%, '   + /* top left */
      '0% 0%, '     + /* top right */
      '0% 0.25%, '     + /* top right */
      '100% 5%, '   + /* bottom right */
      '97.5% 95%, '+ /* bottom right */
      '0% 100%, ' + /* bottom left */
      '5% 0% '       + /* bottom left */
    ')'
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
    color: 'rgba(256, 256, 256, 0.6)',
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
    activeSectionIndex: T.string,
    activeLessonId: T.string,
    lessonJustCompletedId: T.string,
    orderedCombinedLessonData: T.array.isRequired,
  }

  render() {
    const {
      classes, navArrowDirection, activeLessonId, orderedCombinedLessonData, activeSectionIndex, lessonJustCompletedId, onSectionArrowClick
    } = this.props

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
            className={ cns(classes.arrowIcon, classes[`icon-${navArrowDirection}`]) }
          />
          :
          <Lock
            viewBox='-1 -6 26 33'
            className={ cns(classes.lockIcon, classes[`icon-${navArrowDirection}`]) }
          />
        }
      </button>
    )
  }
}

export default withStyles(styles)(NavArrowBar)