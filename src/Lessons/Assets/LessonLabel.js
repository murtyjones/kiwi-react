import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Text, Label, Tag } from 'react-konva'
import { isEqual } from 'lodash'
import { LESSON_MAP_POINTS } from '../../constants'

export default class LessonLabel extends PureComponent {
  constructor(props) {
    super(props)
    const order = props.index + 1
      , x = LESSON_MAP_POINTS[`CIRCLE_${order}_X`]
      , rightOrLeftLabel = x / props.width >= 0.50 ? 'right': 'left'
    this.state = {
      tagStyle: {
        fill: '#443268'
        , lineJoin: 'round'
        , cornerRadius: 3
        , scaleX: 0
        , offsetX: 0
        , pointerDirection: rightOrLeftLabel
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
    if(!isEqual(nextProps.textTagMessage, this.props.textTagMessage))
      this.displayMessage(nextProps.textTagMessage)
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
    const { width, x, y } = this.props
    const { tagStyle, tagTextStyle } = this.state
      , rightOrLeftLabel = x / width >= 0.50 ? 'right': 'left'
      , labelOffsetX = rightOrLeftLabel === 'right' ? 15 : -33

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