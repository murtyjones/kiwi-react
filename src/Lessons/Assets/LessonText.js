import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Text } from 'react-konva'
import { isEqual } from 'lodash'

export default class LessonText extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bubbleTextStyle: {
        fill: '#FFFFFF'
        , width: 35
        , height: 35
        , fontSize: 28
        , offsetX: 18
        , offsetY: 13
        , fontStyle: 'bold'
        , fontFamily: 'arial'
        , align: 'center'
      }
      , bubbleTextFill: props.hasBeenCompleted ? '#543e80' : '#FFFFFF'
    }
  }

  static propTypes = {

  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(nextProps.isSelected, this.props.isSelected))
      this.scale(nextProps.isSelected)
    if(!isEqual(nextProps.hasBeenCompleted, this.props.hasBeenCompleted))
      this.setState({ bubbleTextFill: '#543e80' })
  }

  scale = (isSelected) => {
    const scaleX = isSelected ? 1.3 : 1.0
      ,   scaleY = isSelected ? 1.3 : 1.0
      ,   duration = 0.1

    this.text.to({ scaleX, scaleY, duration })
    this.setState({
      ...this.state.bubbleTextStyle
      , scaleX
      , scaleY
    })
  }

  render() {
    const { x, y, bubbleText } = this.props
    const { bubbleTextStyle, bubbleTextFill } = this.state

    return [
      <Text
        key='text'
        ref={ c => this.text = c  }
        x={ x }
        y={ y }
        text={ bubbleText }
        { ...bubbleTextStyle }
        fill={ bubbleTextFill }
      />
    ]
  }
}