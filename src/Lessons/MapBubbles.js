import React, { PureComponent } from 'react'
import { Circle, Text, Path } from 'react-konva'
import { has } from 'lodash'

import { LESSON_MAP_POINTS } from '../constants'

const activeLineColor = '#696969'
const activeFillColor = '#FFFFFF'
const inactiveFillColor = '#C6C6C6'
const activeTextColor = '#000000'
const inactiveTextColor = '#808080'
const checkmarkCircleColor = '#808080'
const checkmarkSVGData = 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' // copied from material ui
const checkmarkColor = 'white'

const TEXT_X_OFFSET = 23
const TEXT_Y_OFFSET = 20
const CHECKMARK_CIRCLE_X_OFFSET = 35
const CHECKMARK_CIRCLE_Y_OFFSET = 35
const CHECKMARK_X_OFFSET = 25
const CHECKMARK_Y_OFFSET = 50

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width)
    }
  }

  generateCircleAndText = ({ lesson, i }) => {
    const { handleClick, handleMouseOver, handleMouseOut } = this.props
    const { mapDimensions } = this.state

    const hasBeenStartedByStudent = has(lesson, 'isCompleted')

    const index = i + 1

    const circleProps = { // defaults to inactive
      fill: inactiveFillColor
    }

    const textProps = { // defaults to inactive
      fill: inactiveTextColor
    }

    let checkmark = []
    if(hasBeenStartedByStudent) {
      circleProps.stroke = activeLineColor
      circleProps.strokeWidth = 8
      circleProps.fill = activeFillColor

      textProps.fill = activeTextColor
      if(!lesson.isCompleted) {

      } if(lesson.isCompleted) {
        checkmark = [
          <Circle
            key={ `checkmark-circle-${index}` }
            x={ mapDimensions[`CIRCLE_${index}_X`] + CHECKMARK_CIRCLE_X_OFFSET }
            y={ mapDimensions[`CIRCLE_${index}_Y`] - CHECKMARK_CIRCLE_Y_OFFSET }
            width={ 25 }
            height={ 25 }
            onClick={ handleClick }
            onMouseOver={ handleMouseOver }
            onMouseOut={ handleMouseOut }
            fill={ checkmarkCircleColor }
          />,
          <Path
            x={ mapDimensions[`CIRCLE_${index}_X`] + CHECKMARK_X_OFFSET }
            y={ mapDimensions[`CIRCLE_${index}_Y`] - CHECKMARK_Y_OFFSET }
            data={ checkmarkSVGData }
            fill={ checkmarkColor }
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
        // fillLinearGradientStartPoint={ { x : -50, y : -50 } }
        // fillLinearGradientEndPoint={ { x : 50, y : 50 } }
        // fillLinearGradientColorStops={ [0, 'red', 1, 'yellow'] }
      />,
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
      />,
      ...checkmark
    ]
  }

  render() {
    const { activeLessons, inactiveLessons, width, ...rest } = this.props

    const bubbleElements = []

    activeLessons.forEach((lesson, i) => {
      bubbleElements.push(...this.generateCircleAndText({ lesson, i }))
    })

    inactiveLessons.forEach((lesson, i) => {
      bubbleElements.push(...this.generateCircleAndText({lesson, i: i + activeLessons.length }))
    })

    return bubbleElements
  }
}

export default MapBubbles