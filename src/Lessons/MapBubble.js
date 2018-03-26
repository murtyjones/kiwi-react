import React from 'react'
import Check from 'material-ui-icons/Check'
import Lock from 'material-ui-icons/Lock'
import cns from 'classnames'
import CircularProgressbar from 'react-circular-progressbar'

const checkColor = '#FFFFFF'
const lockColor = '#FFFFFF'

const styles = {
  mapBubbleContainer: {
    position: 'absolute'
  },
  icon: {
    position: 'absolute'
    , left: '50%'
    , top: '50%'
  }
}

const MapBubble = ({ lesson, lessonTheme, isLatestActive, isJustCompleted, applyNextAnimation, applyJustCompletedAnimation, i, handleLessonBubbleClick }) =>
  <button
    key={ i }
    className={ cns('map-bubble-button', {
      'next': isLatestActive && applyNextAnimation
      , 'hvr-pulse-inverse': isLatestActive
    } ) }
    onClick={ e =>
      handleLessonBubbleClick(e, lesson, lesson.order, lesson.isAvailable)
    }
    style={ {
      ...styles.mapBubbleContainer
      , left: `${lesson.x}vw`
      , top: `${lesson.y}vw`
    } }
  >
    <div
      key={ `map-bubble-container-${i}` }
      className='map-bubble-container'
    >
      <div
        className={ cns('lesson-progress', { 'clickable': lesson.isAvailable } ) }
      >
        <CircularProgressbar
          percentage={
            isJustCompleted && !applyJustCompletedAnimation
              ? 0
              : lesson.completionPercentage
          }
          initialAnimation={ true }
          className={ cns({
            'justCompleted': isJustCompleted && applyJustCompletedAnimation
          }) }
          styles={ {
            path: {
              stroke: lessonTheme.quaternaryColor
              , strokeOpacity: 100
            },
            trail: {
              stroke: lessonTheme.tertiaryColor
              , strokeOpacity: 100
            }
          } }
        />
      </div>
      <div
        key='label'
        className={ cns('map-bubble-label', {
          'left': lesson.isLeftLabel
          , 'right': !lesson.isLeftLabel
        } ) }
      >
        <h2
          style={ {
            color: lessonTheme.tertiaryColor
            , backgroundColor: lessonTheme.quaternaryColor
          } }
        >
          { lesson.message }
        </h2>
      </div>
      <div
        key='map-bubble'
        className='map-bubble'
        style={ { backgroundColor: lessonTheme.primaryColor } }
      >
        <h1
          style={ {
            opacity: lesson.isAvailable ? 100 : 0
            , color: lesson.hasBeenCompleted || !lesson.isAvailable ? lessonTheme.quaternaryColor : '#FFFFFF'
          } }
        >
          { lesson.order }
        </h1>
      </div>
      { lesson.hasBeenCompleted &&
        <Check
          className='lesson-icon'
          style={ {
            ...styles.icon
            , marginLeft: '-1.5vw'
            , marginTop: '-1.5vw'
            , width: '3vw'
            , height: '3vw'
          } }
          color={ checkColor }
        />
      }
      { !lesson.isAvailable &&
        <Lock
          className='lesson-icon'
          style={ {
            ...styles.icon
            , marginLeft: '-1vw'
            , marginTop: '-1vw'
            , width: '2vw'
            , height: '2vw'
          } }
          color={ lockColor }
        />
      }
    </div>
  </button>

export default MapBubble