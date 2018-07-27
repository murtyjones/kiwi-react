import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import withRouter from 'react-router-dom/withRouter'
import Check from '@material-ui/icons/Check'
import Lock from '@material-ui/icons/Lock'
import get from 'lodash/get'
import CircularProgressbar from 'react-circular-progressbar'

import { getLessonStatus, LESSON_STATUSES } from './lessonUtils'
import { white, lightPurple, lighterPurple } from '../colors'

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
      transform: 'scale(1.2)',
      transition: 'all 1s ease'
    }
  },
  mapBubbleContainer: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 21,
    '&:hover': {
      transform: 'scale(1.2)',
      transition: '.3s all cubic-bezier(0, 1.07, 0.78, 2.39)'
    },
    '&:hover $lessonTitleRight': {
      transform: 'translateX(0%)',
      padding: '0.8vw 1.0vw 0.8vw 3.6vw'
    },
    '&:hover $lessonTitleLeft': {
      transform: 'translateX(0%)',
      padding: '0.8vw 3.6vw 0.8vw 1.0vw'
    },
    '&:hover $bubbleLabel': {
      visibility: 'visible'
    },
  },
  lessonTitleLeft: {
    transform: 'translateX(100%)'
  },
  lessonTitleRight: {
    transform: 'translateX(-100%)'
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
    visibility: 'hidden',
    position: 'absolute',
    display: 'flex',
    top: 0,
    alignItems: 'center',
    margin: 0,
    width: 'max-content',
    height: '100%',
    overflow: 'hidden',
    '& h2': {
      margin: 0,
      textTransform: 'uppercase',
      fontSize: '1vw',
      fontWeight: 400,
      zIndex: 0,
      borderRadius: '20vw',
      transition: 'all .3s ease'
    }
  },
  labelRight: {
    left: '50%'
  },
  labelLeft: {
    right: '50%'
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
  isJustCompleted: {
    '& .CircularProgressbar-path': {
      stroke: '#FFF !important',
      transition: 'stroke-dashoffset 4s ease 0s'
    }
  },
  icon: {
    position: 'absolute',
    left: '50%',
    top: '50%'
  }
})

const placeHolderLesson = {
  lesson: { _id: null },
  userLesson: {
    trueCompletionPercentage: 0,
    hasBeenCompleted: false
  }
}

let MapBubble = props => {
  const {
    i, classes, lessonDisplayData, activeLessonId, orderedCombinedLessonData, lessonJustCompletedId
  } = props
  // const lessonJustCompletedId = '5af8a84fa8131c15fc1f260e'
  const combinedLessonUserLesson = orderedCombinedLessonData[i] ? orderedCombinedLessonData[i] : placeHolderLesson

  const { lesson, lesson: { _id }, userLesson } = combinedLessonUserLesson
  const { x, y, left } = lessonDisplayData

  const order = i + 1
  const isLatestActive = activeLessonId === combinedLessonUserLesson.lesson._id
  const isAvailable = LESSON_STATUSES.AVAILABLE === getLessonStatus(orderedCombinedLessonData, _id, activeLessonId)
  const completionPercentage = get(userLesson, 'trueCompletionPercentage', 0)
  const isJustCompleted = lessonJustCompletedId && lessonJustCompletedId === lesson._id
  const isLeftLabel = left !== undefined ? left : x > 50
  const message = isAvailable ? lesson.title : 'Locked!'
  const hasBeenCompleted = get(userLesson, 'hasBeenCompleted', false)

  const linkWrapper = children => isAvailable && _id ?
    <Link to={ `/lessons/${_id}` }>{ children }</Link>
    : children

  return linkWrapper(
    <button
      className={ cns(classes.root, {
        'hvr-pulse-inverse': isLatestActive
      } ) }
      style={ { left: `${x}%`, top: `${y}%` } }
    >
      <div className={ classes.mapBubbleContainer }>

        <div className={ cns(classes.lessonProgress, { [classes.clickable]: isAvailable } ) }>
          <CircularProgressbar
            percentage={ completionPercentage }
            initialAnimation={ isJustCompleted }
            className={ cns({ [classes.isJustCompleted]: isJustCompleted }) }
            styles={ {
              path: {
                stroke: lightPurple, strokeOpacity: 100
              },
              trail: {
                stroke: lightPurple, strokeOpacity: 100
              }
            } }
          />
        </div>

        <div
          className={ cns(classes.bubbleLabel, {
            [classes.labelLeft]: isLeftLabel,
            [classes.labelRight]: !isLeftLabel
          } ) }
        >
          <h2
            className={ cns({
              [classes.lessonTitleLeft]: isLeftLabel,
              [classes.lessonTitleRight]: !isLeftLabel
            } ) }
            style={ {
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
              opacity: isAvailable && !hasBeenCompleted ? 1.0 : hasBeenCompleted ? 0.2 : 0
              , color: white
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

MapBubble.propTypes = {
  i: T.number,
  orderedCombinedLessonData: T.array,
  classes: T.object,
  activeLessonId: T.string,
  lessonDisplayData: T.object,
  handleClick: T.object,
  history: T.object,
  lessonJustCompletedId: T.string,
}

MapBubble = withStyles(styles)(MapBubble)

MapBubble = withRouter(MapBubble)

export default MapBubble