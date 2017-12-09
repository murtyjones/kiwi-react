import React, { PureComponent } from 'react'
import { Circle, Text, Path } from 'react-konva'
import { has, get } from 'lodash'

import { LESSON_MAP_POINTS } from '../constants'

const styles = {
  activeStrokeColor: '#696969'
  , activeFillColor: '#FFFFFF'
  , inactiveFillColor: '#C6C6C6'
  , activeTextColor: '#000000'
  , inactiveTextColor: '#808080'
  , checkMarkCircleColor: '#808080'
  , checkMarkColor: 'white'
}

const checkMarkSVGData = 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' // copied from material ui

const CHECK_MARK_CIRCLE_X_OFFSET = 20
const CHECK_MARK_CIRCLE_Y_OFFSET = 20
const CHECK_MARK_X_OFFSET = 10
const CHECK_MARK_Y_OFFSET = 35

const isLessonSelected = (lessonOrUserLesson, selectedLessonId) => {
  return get(lessonOrUserLesson, '_id') === selectedLessonId || get(lessonOrUserLesson, 'lessonId') === selectedLessonId
}

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width)
    }
  }

  renderCircleAndText = (lesson, index, isSelected) => {
    const { handleClick, handleMouseOver, handleMouseOut } = this.props
    const { mapDimensions } = this.state

    const hasBeenStartedByStudent = has(lesson, 'userLesson')

    const circleProps = { // defaults to inactive
      fill: styles.inactiveFillColor
      , width: 50
      , height: 50
    }

    const textProps = { // defaults to inactive
      fill: styles.inactiveTextColor
      , fontSize: 28
    }

    let checkMark = []

    let TEXT_X_OFFSET = 18
    let TEXT_Y_OFFSET = 13

    if(isSelected) {
      circleProps.width = 80
      circleProps.height = 80
      textProps.fontSize = 45
      circleProps.fill = styles.activeFillColor

      TEXT_Y_OFFSET = TEXT_Y_OFFSET + 10
    }

    if(hasBeenStartedByStudent) {
      const completionPercentage = 75  // mock 75% for now - will ultimately end up being this:  get(lesson, 'userLesson.completionPercentage', 0)
      circleProps.stroke = styles.activeStrokeColor
      circleProps.strokeWidth = 5
      circleProps.fill = styles.activeFillColor
      textProps.fill = styles.activeTextColor

      if(completionPercentage === 100) {
        checkMark = [
          <Circle
            key={ `checkMark-circle-${index}` }
            x={ mapDimensions[`CIRCLE_${index}_X`] + CHECK_MARK_CIRCLE_X_OFFSET }
            y={ mapDimensions[`CIRCLE_${index}_Y`] - CHECK_MARK_CIRCLE_Y_OFFSET }
            width={ 20 }
            height={ 20 }
            onClick={ (e) => handleClick(e, lesson._id) }
            onMouseOver={ handleMouseOver }
            onMouseOut={ handleMouseOut }
            fill={ styles.checkMarkCircleColor }
          />,
          <Path
            x={ mapDimensions[`CIRCLE_${index}_X`] + CHECK_MARK_X_OFFSET }
            y={ mapDimensions[`CIRCLE_${index}_Y`] - CHECK_MARK_Y_OFFSET }
            data={ checkMarkSVGData }
            fill={ styles.checkMarkColor }
            scale={ { x : 1.1, y : 1.1 } }
          />
        ]
      } else {
        // partial border styling
      }
    }

    return [
      <Circle
        key={ `circle-${index}` }
        x={ mapDimensions[`CIRCLE_${index}_X`] }
        y={ mapDimensions[`CIRCLE_${index}_Y`] }
        onClick={ (e) => handleClick(e, lesson._id) }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        { ...circleProps }
      />
      ,
      <Text
        key={ `text-${index}` }
        x={ mapDimensions[`CIRCLE_${index}_X`] - TEXT_X_OFFSET }
        y={ mapDimensions[`CIRCLE_${index}_Y`] - TEXT_Y_OFFSET }
        width={ 35 }
        height={ 35 }
        text={ index }
        fontStyle={ 'bold' }
        fontFamily={ 'arial' }
        align={ 'center' }
        onClick={ (e) => handleClick(e, lesson._id) }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        { ...textProps }
      />
      ,
      ...checkMark
    ]
  }

  render() {
    const { mapLessons, selectedLessonId = null } = this.props

    const bubbleElements = []

    mapLessons.forEach((lesson, i) => {
      const overallLessonIndex = i + 1
      const isSelected = isLessonSelected(lesson, selectedLessonId)
      bubbleElements.push(...this.renderCircleAndText(lesson, overallLessonIndex, isSelected))
    })

    return bubbleElements
  }
}

export default MapBubbles