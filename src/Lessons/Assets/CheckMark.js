import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Line } from 'react-konva'
import { isEqual } from 'lodash'

import setTimeoutAsync from '../../utils/setTimeoutAsync'

export default class LessonBubble extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkMarkStyle: {
        stroke: '#FFFFFF'
        , strokeWidth: 4
        , offsetX: 15
        , offsetY: 0
        , points: []
      }
    }
  }

  static propTypes = {

  }

  async componentDidMount() {
    await setTimeoutAsync(2500)
    this.drawCheckMark(this.props.x, this.props.y)
  }

  async componentWillReceiveProps(nextProps) {
    const isSelectedHasChanged = !isEqual(nextProps.isSelected, this.props.isSelected)
    const xHasChanged = !isEqual(nextProps.x, this.props.x)
    const yHasChanged = !isEqual(nextProps.y, this.props.y)

    if(isSelectedHasChanged)
      this.scale(nextProps.isSelected)

    await setTimeoutAsync(2500)
    if(xHasChanged || yHasChanged)
      this.drawCheckMark(nextProps.x, nextProps.y)
  }

  scale = (isSelected) => {
    const strokeWidth = isSelected ? 6 : 4
      , duration = 0.1

    this.checkMark.to({ strokeWidth, duration })
    this.setState({
      checkMarkStyle: {
        ...this.state.checkMarkStyle
        , strokeWidth
      }
    })
  }

  drawCheckMark = (x, y) => {
    const finalPoints = [ x, y, x+10, y+10, x+30, y-10 ]
    this.checkMark.to({ duration: 1, points: [ x, y ] })
    this.checkMark.to({ duration: 1, points: [ x, y, x+10, y+10 ] })
    this.checkMark.to({ duration: 1, points: finalPoints })
    this.setState({
      checkMarkStyle: {
        ...this.state.checkMarkStyle
        , points: finalPoints
      }
    })
  }

  render() {
    const { points } = this.props
    const { checkMarkStyle } = this.state

    return [
      <Line
        key='checkMark'
        ref={ c => this.checkMark = c  }
        points={ points }
        { ...checkMarkStyle }
      />
    ]
  }
}