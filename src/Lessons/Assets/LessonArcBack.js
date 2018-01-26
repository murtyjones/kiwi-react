import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Arc } from 'react-konva'
import { isEqual } from 'lodash'

import setTimeoutAsync from '../../utils/setTimeoutAsync'

export default class LessonArcBack extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      arcBackStyle: {
        lineCap: 'round'
        , lineJoin: 'round'
        , innerRadius: 21
        , outerRadius: 24
        , fill: '#7E5DB8'
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
    this.drawArc()
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(nextProps.isSelected, this.props.isSelected))
      this.scale(nextProps.isSelected)
  }

  scale = (isSelected) => {
    const scaleX = isSelected ? 1.3 : 1.0
      ,   scaleY = isSelected ? 1.3 : 1.0
      ,   duration = 0.1

    this.arcBack.to({ scaleX, scaleY, duration })
    this.setState({
      ...this.state.arcBackStyle
      , scaleX
      , scaleY
    })
  }

  drawArc = () => {
    const angle = 360
      ,   duration = 1.0

    this.arcBack.to({ angle, duration })
    this.setState({
      arcBackStyle: {
        ...this.state.arcBackStyle
        , angle
      }
    })
  }

  render() {
    const { x, y } = this.props
    const { arcBackStyle } = this.state

    return [
      <Arc
        key='arcBack'
        ref={ c => this.arcBack = c  }
        x={ x }
        y={ y }
        { ...arcBackStyle }
      />
    ]
  }
}