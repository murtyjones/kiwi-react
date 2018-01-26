import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Text, Label, Tag } from 'react-konva'
import { isEqual } from 'lodash'
import { LESSON_MAP_POINTS } from '../../constants'

const setPointerDirection = (order, width) =>
  LESSON_MAP_POINTS[`CIRCLE_${order}_X`] / width >= 0.50 ? 'right': 'left'

const setLabelOffsetX = pointerDirection =>
  pointerDirection === 'right' ? 15 : -33

export default class LessonLabel extends PureComponent {
  constructor(props) {
    super(props)
    const pointerDirection = setPointerDirection(props.index + 1, props.width)
    this.state = {
      tagStyle: {
        fill: '#443268'
        , lineJoin: 'round'
        , cornerRadius: 3
        , scaleX: 0
        , offsetX: 0
        , pointerDirection
        , pointerWidth: 0
        , pointerHeight: 0
      }
      , tagTextStyle: {
        text: ''
        , fontFamily: 'Arial'
        , fontSize: 18
        , padding: 7
        , fill: 'white'
        , scaleX: 0
        , offsetX: 0
      }
    }
  }

  static propTypes = {

  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(nextProps.message, this.props.message))
      this.displayMessage(nextProps.message)
    if(!isEqual(nextProps.index, this.props.index) || !isEqual(nextProps.width, this.props.width))
      this.setState({
        tagStyle: {
          ...this.state.tagStyle
          , pointerDirection: setPointerDirection(nextProps.index + 1, nextProps.width)
        }
      })
  }

  displayMessage = (message) => {
    const { tagStyle, tagTextStyle } = this.state
      , offsetX = message ? 10 : 0
      , scaleX = message ? 1 : 0
      , duration = 0.1

    this.tagText.text(message)
    this.tag.to({ scaleX, duration, offsetX })
    this.tagText.to({ scaleX, duration, offsetX })

    this.setState({
      tagStyle: { ...tagStyle, scaleX, offsetX }
      , tagTextStyle: { ...tagTextStyle, scaleX, offsetX, text: message }
    })
  }

  render() {
    const { x, y } = this.props
    const { tagStyle, tagTextStyle } = this.state
      , labelOffsetX = setLabelOffsetX(tagStyle.pointerDirection)

    return [
      <Label key='label' x={ x } y={ y } offsetX={ labelOffsetX }>
        <Tag
          key='tag'
          ref={ c => this.tag = c  }
          { ...tagStyle }
        />
        <Text
          key='tagText'
          ref={ c => this.tagText = c  }
          { ...tagTextStyle }
        />
      </Label>
    ]
  }
}