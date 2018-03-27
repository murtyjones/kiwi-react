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

const MapBubble = ({ i, statefulLesson, applyNextAnimation, applyJustCompletedAnimation, handleLessonBubbleClick }) =>
  <button
    key={ i }
    className={ cns('map-bubble-button', {
      'next': statefulLesson.isLatestActive && applyNextAnimation
      , 'hvr-pulse-inverse': statefulLesson.isLatestActive
    } ) }
    onClick={ e =>
      handleLessonBubbleClick(e, statefulLesson, statefulLesson.order, statefulLesson.isAvailable)
    }
    style={ {
      ...styles.mapBubbleContainer
      , left: `${statefulLesson.x}vw`
      , top: `${statefulLesson.y}vw`
    } }
  >
    <div
      key={ `map-bubble-container-${i}` }
      className='map-bubble-container'
    >
      <div
        className={ cns('lesson-progress', { 'clickable': statefulLesson.isAvailable } ) }
      >
        <CircularProgressbar
          percentage={
            statefulLesson.isJustCompleted && !applyJustCompletedAnimation
              ? 0
              : statefulLesson.completionPercentage
          }
          initialAnimation={ true }
          className={ cns({
            'justCompleted': statefulLesson.isJustCompleted && applyJustCompletedAnimation
          }) }
          styles={ {
            path: {
              stroke: statefulLesson.lessonTheme.quaternaryColor
              , strokeOpacity: 100
            },
            trail: {
              stroke: statefulLesson.lessonTheme.tertiaryColor
              , strokeOpacity: 100
            }
          } }
        />
      </div>
      <div
        key='label'
        className={ cns('map-bubble-label', {
          'left': statefulLesson.isLeftLabel
          , 'right': !statefulLesson.isLeftLabel
        } ) }
      >
        <h2
          style={ {
            color: statefulLesson.lessonTheme.tertiaryColor
            , backgroundColor: statefulLesson.lessonTheme.quaternaryColor
          } }
        >
          { statefulLesson.message }
        </h2>
      </div>
      <div
        key='map-bubble'
        className='map-bubble'
        style={ { backgroundColor: statefulLesson.lessonTheme.primaryColor } }
      >
        <h1
          style={ {
            opacity: statefulLesson.isAvailable ? 100 : 0
            , color: statefulLesson.hasBeenCompleted || !statefulLesson.isAvailable ? statefulLesson.lessonTheme.quaternaryColor : '#FFFFFF'
          } }
        >
          { statefulLesson.order }
        </h1>
      </div>
      { statefulLesson.hasBeenCompleted &&
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
      { !statefulLesson.isAvailable &&
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