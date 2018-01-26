import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Arc } from 'react-konva'
import { isEqual } from 'lodash'

import setTimeoutAsync from '../utils/setTimeoutAsync'

export default class LessonArcFront extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      arcFrontStyle: {
        lineCap: 'round'
        , lineJoin: 'round'
        , innerRadius: 21
        , outerRadius: 24
        , fill: (props.hasBeenCompleted && !props.wasJustCompleted) ? '#543e80' : '#FFFFFF'
        , clockwise: false
        , angle: 0
        , rotation: -90
      }
    }
  }

  static propTypes = {

  }

  async componentDidMount() {
    await setTimeoutAsync(2500)
    this.drawArc(this.props.angle)
  }

  async componentWillReceiveProps(nextProps) {
    const isSelectedHasChanged = !isEqual(nextProps.isSelected, this.props.isSelected)
    const hasBeenCompletedHasChanged = !isEqual(nextProps.hasBeenCompleted, this.props.hasBeenCompleted)
    const wasJustCompletedHasChanged = !isEqual(nextProps.wasJustCompleted, this.props.wasJustCompleted)
    const angleHasChanged = !isEqual(nextProps.angle, this.props.angle)

    if(isSelectedHasChanged)
      this.scale(nextProps.isSelected)

    if(hasBeenCompletedHasChanged || wasJustCompletedHasChanged) {
      this.setState({
        arcFrontStyle: {
          ...this.state.arcFrontStyle
          , fill: (nextProps.hasBeenCompleted && !nextProps.wasJustCompleted) ? '#543e80' : '#FFFFFF'
        }
      })
      this.arcFront.to({ fill: (nextProps.hasBeenCompleted && !nextProps.wasJustCompleted) ? '#543e80' : '#FFFFFF' })
    }
    if(angleHasChanged) {
      await setTimeoutAsync(2500)
      this.drawArc(nextProps.angle)
    }
  }

  scale = (isSelected) => {
    const scaleX = isSelected ? 1.3 : 1.0
      ,   scaleY = isSelected ? 1.3 : 1.0
      ,   duration = 0.1

    this.setState({
      arcFrontStyle: {
        ...this.state.arcFrontStyle
        , scaleX
        , scaleY
      }
    })
    this.arcFront.to({ scaleX, scaleY, duration })
  }

  drawArc = (angle) => {
    const duration = 10.0

    this.setState({
      arcFrontStyle: {
        ...this.state.arcFrontStyle
        , angle
      }
    })
    this.arcFront.to({ angle, duration })
  }

  render() {
    const { x, y } = this.props
    const { arcFrontStyle } = this.state

    // hasBeenCompleted={ hasBeenCompleted }
    // wasJustCompleted={ wasJustCompleted }
    // angle={ newAngle }

    return [
      <Arc
        key='arcFront'
        ref={ c => this.arcFront = c  }
        x={ x }
        y={ y }
        { ...arcFrontStyle }
      />
    ]
  }
}