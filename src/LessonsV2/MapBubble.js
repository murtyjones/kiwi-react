import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import withRouter from 'react-router-dom/withRouter'
import Check from '@material-ui/icons/Check'
import Lock from '@material-ui/icons/Lock'
import get from 'lodash/get'
import CircularProgressbar from 'react-circular-progressbar'

import { getLessonStatus, LESSON_STATUSES } from './lessonUtils'
import { GLOBAL_COLORS } from '../constants'
import { purple, lightPurple, white } from '../colors'

const bubbleColors = GLOBAL_COLORS.defaultLesson
const checkColor = '#FFFFFF'
const lockColor = '#FFFFFF'

const styles = theme => ({
  root: {
    position: 'absolute',
    border: 'none',
    background: 'transparent',
    padding: 0,
    margin: 0,
    boxShadow: 'none',
    outline: 'none',
    '& next': {
      transform: 'scale(1.2)', transition: 'all 1s ease'
    }
  },
  mapBubbleContainer: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 21,
    '&:hover': {
      transform: 'scale(1.2)',
      transition: '.3s all cubic-bezier(0, 1.07, 0.78, 2.39)'
    }
  },
  lessonProgress: {
    transition: '.3s all ease',
    position: 'absolute',
    zIndex: 20,
    width: '88%',
    marginLeft: '-44%',
    height: '88%',
    marginTop: '-44%',
    left: '50%',
    top: '50%'
  },
  clickable: {
    cursor: 'pointer'
  },
  bubbleLabel: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    alignItems: 'center',
    margin: 0,
    width: 'max-content',
    height: '100%',
    overflow: 'hidden',
    right: '50%',
    '& left': {
      right: '50%'
    },
    '& h2': {
      transform: 'translateX(100%)',
      padding: '0.8vw 3.6vw 0.8vw 1.0vw'
    }
  },
  mapBubble: {
    position: 'inherit',
    display: 'inline-block',
    borderRadius: '50%',
    border: 'none',
    outline: 'none',
    padding: 'calc(1.2vw)',
    transition: '.3s all ease',
    boxShadow: 'rgba(0,0,0,0.4) 2px 2px 8px 0',
    '& h1': {
      fontFamily: 'Roboto, serif',
      fontWeight: 600,
      fontSize: 'calc(2.0vw)',
      margin: 0,
      color: '#FFF',
      borderRadius: '50%',
      width: 'calc(2.0vw)',
      height: 'calc(2.0vw)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  justCompleted: {

  },
  icon: {
    position: 'absolute'
    , left: '50%'
    , top: '50%'
  },
  '@global': {
    '.justCompleted > .CircularProgressbar-path': {
      transition: 'stroke-dashoffset 4s ease 0s'
    }
  }
})

class MapBubble extends Component {
  constructor() {
    super()
  }

  handleClick = () => {
    const { orderedCombinedLessonData, i } = this.props
    const { lesson: { _id } } = orderedCombinedLessonData[i]
    this.props.history.push(`/lessons/${_id}`)
  }

  render() {
    const { i, classes, coords, activeLessonId, orderedCombinedLessonData, lessonJustCompletedId } = this.props

    const combinedLessonUserLesson = orderedCombinedLessonData[i]

    if (!combinedLessonUserLesson)
      return null

    const { lesson, userLesson } = combinedLessonUserLesson

    const { x, y } = coords

    const order = i + 1
    const isLatestActive = activeLessonId === combinedLessonUserLesson.lesson._id
    const isAvailable = LESSON_STATUSES.AVAILABLE === getLessonStatus(orderedCombinedLessonData, activeLessonId)
    // const isAvailable = false
    const completionPercentage = get(userLesson, 'trueCompletionPercentage', 0)
    const isJustCompleted = lessonJustCompletedId === lesson._id
    const isLeftLabel = x > 50
    const message = isAvailable ? lesson.title : 'Locked!'
    const hasBeenCompleted = get(userLesson, 'hasBeenCompleted', false)

    return (
      <button
        className={ cns(classes.root, {
          'hvr-pulse-inverse': isLatestActive
        } ) }
        style={ { left: `${x}%`, top: `${y}%` } }
        onClick={ this.handleClick }
      >
        <div className={ classes.mapBubbleContainer }>
          <div className={ cns(classes.lessonProgress, { [classes.clickable]: isAvailable } ) }>
            <CircularProgressbar
              percentage={
                isJustCompleted /*&& !applyJustCompletedAnimation*/ ? 0 : completionPercentage
              }
              initialAnimation={ true }
              className={ cns({
                justCompleted: isJustCompleted /*&& applyJustCompletedAnimation*/
              }) }
              styles={ {
                path: {
                  stroke: bubbleColors.textColor, strokeOpacity: 100
                },
                trail: {
                  stroke: lightPurple, strokeOpacity: 100
                }
              } }
            />
          </div>

          <div
            className={ cns(classes.bubbleLabel, { 'left': isLeftLabel } ) }
          >
            <h2 style={ {
                color: '#FFFFFF' // hardcoded
                , backgroundColor: '#624F8F' // hardcoded
              } }
            >
              { message }
            </h2>
          </div>

          <div
            className={ classes.mapBubble }
            style={ { backgroundColor: '#624F8F' } } // hardcoded
          >
            <h1
              style={ {
                opacity: isAvailable ? 100 : 0
                , color: hasBeenCompleted || !isAvailable ? bubbleColors.textColor : '#FFFFFF'
              } }
            >
              { order }
            </h1>
          </div>


          { hasBeenCompleted &&
            <Check
              className={ classes.icon }
              style={ {
                marginLeft: '-1.5vw'
                , marginTop: '-1.5vw'
                , width: '3vw'
                , height: '3vw'
                , color: lockColor
              } }
            />
          }

          { !isAvailable &&
            <Lock
              className={ classes.icon }
              style={ {
                marginLeft: '-1vw'
                , marginTop: '-1vw'
                , width: '2vw'
                , height: '2vw'
                , color: lockColor
              } }
            />
          }


        </div>
      </button>
    )
  }
}

MapBubble.propTypes = {
  i: T.number,
  orderedCombinedLessonData: T.array,
  classes: T.object,
  activeLessonId: T.string,
  coords: T.object,
  handleClick: T.object,
  history: T.object,
}

MapBubble = withStyles(styles)(MapBubble)

MapBubble = withRouter(MapBubble)

export default MapBubble