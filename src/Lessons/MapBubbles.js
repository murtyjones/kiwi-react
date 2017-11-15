import React, { PureComponent } from 'react'
import { Circle, Text, Path } from 'react-konva'
//import Done from 'material-ui-icons/Done'

import { LESSON_MAP } from '../constants'

const activeLineColor = '#696969'
const inactiveColor = '#D3D3D3'
const checkmarkCircleColor = '#a7a7a7'
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
  }

  generateCircleAndText = ({ isActive, lesson, i, MAP }) => {
    const { handleClick, handleMouseOver, handleMouseOut } = this.props
    const index = i + 1

    const rest = {
      fill: 'white'
    }

    let checkmark = []
    if(isActive) {
      if(!lesson.isCompleted) {
        rest.stroke = activeLineColor
        rest.strokeWidth = 8
      } else {

        checkmark = [
          <Circle
            key={ `checkmark-circle-${index}` }
            x={ MAP[`CIRCLE_${index}_X`] + CHECKMARK_CIRCLE_X_OFFSET }
            y={ MAP[`CIRCLE_${index}_Y`] - CHECKMARK_CIRCLE_Y_OFFSET }
            width={ 25 }
            height={ 25 }
            onClick={ handleClick }
            onMouseOver={ handleMouseOver }
            onMouseOut={ handleMouseOut }
            fill={ checkmarkCircleColor }
          />,
          <Path
            x={ MAP[`CIRCLE_${index}_X`] + CHECKMARK_X_OFFSET }
            y={ MAP[`CIRCLE_${index}_Y`] - CHECKMARK_Y_OFFSET }
            data={ checkmarkSVGData }
            fill={ checkmarkColor }
            scale={ { x : 1, y : 1 } }
          />
        ]
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
      ...checkmark
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