import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle } from 'react-konva'
import { isEqual } from 'lodash'

export default class LessonBubble extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bubbleStyle: {
        fill: '#664C93'
        , width: 57
        , height: 57
      }
    }
  }

  static propTypes = {

  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(nextProps.isSelected, this.props.isSelected))
      this.scaleBubble(nextProps.isSelected)
  }

  scaleBubble = (isSelected) => {
    const scaleX = isSelected ? 1.3 : 1.0
      , scaleY = isSelected ? 1.3 : 1.0
      , duration = 0.1

    this.bubble.to({ scaleX, scaleY, duration })
    this.setState({
      ...this.state.bubbleStyle
      , scaleX
      , scaleY
    })
  }

  render() {
    const { x, y } = this.props
    const { bubbleStyle } = this.state

    return [
      <Circle // Lesson Bubble
        key='bubble'
        ref={ c => this.bubble = c  }
        x={ x }
        y={ y }
        { ...bubbleStyle }
      />
    ]
  }
}