import React, { PureComponent } from 'react'
import { Circle, Text } from 'react-konva'

import { LESSON_MAP } from '../constants'

const activeLineColor = '#696969'
const inactiveColor = '#D3D3D3'

const TEXT_X_OFFSET = 23
const TEXT_Y_OFFSET = 20

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
  }

  generateCircleAndText = ({ isActive, lesson, i, MAP }) => {
    const { handleClick, handleMouseOver, handleMouseOut } = this.props
    const index = i + 1

    const rest = {
      fill: 'white'
    }

    if(isActive) {
      if(!lesson.isCompleted) {
        rest.stroke = activeLineColor
        rest.strokeWidth = 8
      }
    }

    return [
      <Circle
        key={ `circle-${index}` }
        x={ MAP[`CIRCLE_${index}_X`] }
        y={ MAP[`CIRCLE_${index}_Y`] }
        width={ 100 }
        height={ 100 }
        onClick={ handleClick }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        { ...rest }
      />,
      <Text
        key={ `text-${index}` }
        x={ MAP[`CIRCLE_${index}_X`] - TEXT_X_OFFSET }
        y={ MAP[`CIRCLE_${index}_Y`] - TEXT_Y_OFFSET }
        width={ 50 }
        height={ 50 }
        fontSize={ 40 }
        text={ index }
        fontStyle={ 'bold' }
        fontFamily={ 'arial' }
        fill={ 'black' }
        align={ 'center' }
        onClick={ handleClick }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
      />,
    ]
  }

  render() {
    const { activeLessons, inactiveLessons, width, ...rest } = this.props
    const MAP = LESSON_MAP(width)

    const bubbleElements = []

    activeLessons.forEach((lesson, i) => {
      bubbleElements.push(...this.generateCircleAndText({
        isActive: true,
        lesson,
        i,
        MAP
      }))
    })

    inactiveLessons.forEach((lesson, i) => {
      bubbleElements.push(...this.generateCircleAndText({
        isActive: false,
        lesson,
        i: i + activeLessons.length,
        MAP
      }))
    })

    return bubbleElements
  }
}

export default MapBubbles