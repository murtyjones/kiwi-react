import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Path } from 'react-konva'
import { isEqual } from 'lodash'
import { SVG_PATHS } from '../../constants/index'

export default class Lock extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      lockStyle: {
        offsetX: 11.5
        , offsetY: 13
        , fill: '#FFFFFF'
        , data: SVG_PATHS.LOCK
      }
    }
  }

  static propTypes = {

  }

  render() {
    const { x, y } = this.props
    const { lockStyle } = this.state

    return [
      <Path
        key='lock'
        ref={ c => this.lock = c  }
        x={ x }
        y={ y }
        { ...lockStyle }
      />
    ]
  }
}