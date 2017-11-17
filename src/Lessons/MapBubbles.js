import React, { PureComponent } from 'react'
import { Circle, Text, Path } from 'react-konva'
import { has } from 'lodash'

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

const TEXT_X_OFFSET = 23
const TEXT_Y_OFFSET = 20
const CHECK_MARK_CIRCLE_X_OFFSET = 35
const CHECK_MARK_CIRCLE_Y_OFFSET = 35
const CHECK_MARK_X_OFFSET = 25
const CHECK_MARK_Y_OFFSET = 50

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width)
    }
  }

  generateCircleAndText = (lesson, index) => {
    const { handleClick, handleMouseOver, handleMouseOut } = this.props
    const { mapDimensions } = this.state

    const hasBeenStartedByStudent = has(lesson, 'isCompleted')

    const circleProps = { // defaults to inactive
      fill: styles.inactiveFillColor
    }

    const textProps = { // defaults to inactive
      fill: styles.inactiveTextColor
    }

    let checkMark = []
    if(hasBeenStartedByStudent) {
      circleProps.stroke = styles.activeStrokeColor
      circleProps.strokeWidth = 8
      circleProps.fill = styles.activeFillColor

      textProps.fill = styles.activeTextColor
      if(!lesson.isCompleted) {

      } if(lesson.isCompleted) {
        checkMark = [
          <Circle
            key={ `checkMark-circle-${index}` }
            x={ mapDimensions[`CIRCLE_${index}_X`] + CHECK_MARK_CIRCLE_X_OFFSET }
            y={ mapDimensions[`CIRCLE_${index}_Y`] - CHECK_MARK_CIRCLE_Y_OFFSET }
            width={ 25 }
            height={ 25 }
            onClick={ handleClick }
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
      }
    }

    return [
      <Circle
        key={ `circle-${index}` }
        x={ mapDimensions[`CIRCLE_${index}_X`] }
        y={ mapDimensions[`CIRCLE_${index}_Y`] }
        width={ 70 }
        height={ 70 }
        onClick={ handleClick }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        { ...circleProps }
      />
      ,
      <Text
        key={ `text-${index}` }
        x={ mapDimensions[`CIRCLE_${index}_X`] - TEXT_X_OFFSET }
        y={ mapDimensions[`CIRCLE_${index}_Y`] - TEXT_Y_OFFSET }
        width={ 50 }
        height={ 50 }
        fontSize={ 40 }
        text={ index }
        fontStyle={ 'bold' }
        fontFamily={ 'arial' }
        align={ 'center' }
        onClick={ handleClick }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        { ...textProps }
      />
      ,
      ...checkMark
    ]
  }

  render() {
    const { activeLessons, inactiveLessons, ...rest } = this.props

    const bubbleElements = []

    activeLessons.forEach((lesson, i) => {
      const overallLessonIndex = i + 1
      bubbleElements.push(...this.generateCircleAndText(lesson, overallLessonIndex))
    })

    inactiveLessons.forEach((lesson, i) => {
      const overallLessonIndex = i + 1 + activeLessons.length
      bubbleElements.push(...this.generateCircleAndText(lesson, overallLessonIndex))
    })

    return bubbleElements
  }
}

export default MapBubbles