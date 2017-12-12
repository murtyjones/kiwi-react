import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path } from 'react-konva'
import { has, get, find, findIndex, cloneDeep, isEmpty } from 'lodash'

import { LESSON_MAP_POINTS, SVG_PATHS } from '../constants'

const scaleUp = { // for some reason, these must be destructed using '...' when passing to .to()
  scaleX: 1.3
  , scaleY: 1.3
  , duration: 0.2
}

const scaleDown = { // for some reason, these must be destructed using '...' when passing to .to()
  scaleX: 1
  , scaleY: 1
  , duration: 0.2
}

const colors = {
  activeStrokeColor: '#696969'
  , activeFillColor: '#FFFFFF'
  , inactiveFillColor: '#C6C6C6'
  , activeTextColor: '#000000'
  , inactiveTextColor: '#808080'
  , checkMarkCircleColor: '#808080'
  , checkMarkColor: '#FFFFFF'
}

const shapeProps = {
  defaultBubbleStyle: {
    fill: colors.inactiveFillColor
    , width: 50
    , height: 50
  },
  defaultBubbleTextStyle: {
    textFill: colors.inactiveTextColor
    , width: 35
    , height: 35
    , fontSize: 28
    , offsetX: 18
    , offsetY: 13
    , fontStyle: 'bold'
    , fontFamily: 'arial'
    , align: 'center'
  },
  checkMarkBubbleStyle: {
    offsetX: -20
    , offsetY: 20
    , width: 20
    , height: 20
    , fill: colors.checkMarkCircleColor

  },
  checkMarkStyle: {
    offsetX: -10
    , offsetY: 33
    , fill: colors.checkMarkColor
    , data: SVG_PATHS.CHECKMARK
  }
}

shapeProps.selectedBubbleStyle = {
  ...shapeProps.defaultBubbleStyle
  , fill: colors.activeFillColor
}

shapeProps.selectedBubbleTextStyle = {
  ...shapeProps.defaultBubbleTextStyle
  , textFill: colors.activeTextColor
}


const isLessonSelected = (lessonOrUserLesson, selectedLessonId) => {
  return get(lessonOrUserLesson, '_id') === selectedLessonId || get(lessonOrUserLesson, 'lessonId') === selectedLessonId
}

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width)
      , bubbleStyles: props.mapLessons.map((_, i) => shapeProps.defaultBubbleStyle)
      , bubbleTextStyles: props.mapLessons.map((_, i) => shapeProps.defaultBubbleTextStyle)
      , selectedBubbleRef: ''
      , selectedBubbleTextRef: ''
      , selectedCheckmarkBubbleRef: ''
      , selectedCheckmarkRef: ''
    }
  }

  static propTypes = {
    onLessonSelect: T.func.isRequired
    , handleMouseOver: T.func.isRequired
    , handleMouseOut: T.func.isRequired
    , mapLessons: T.array.isRequired
  }

  componentDidMount() {
    const { mapLessons } = this.props
    mapLessons.forEach((each, index) => {
      const order = index + 1
      if(each.justCompleted) {
        setTimeout(() => {
          this.refs[`circle-${order}`].to({
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 0.5
          })
        }, 500)

      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(isEmpty(this.props.mapLessons) && !isEmpty(nextProps.mapLessons)) {
      this.setState({
        bubbleStyles: nextProps.mapLessons.map((_, i) => shapeProps.defaultBubbleStyle)
        , bubbleTextStyles: nextProps.mapLessons.map((_, i) => shapeProps.defaultBubbleTextStyle)
      })
    }
  }

  scaleDownBubble = (bubbleRef, bubbleTextRef, checkmarkBubbleRef, checkmarkeRef) => {
    this.refs[bubbleRef].to({...scaleDown})
    this.refs[bubbleTextRef].to({...scaleDown})
    this.refs[checkmarkBubbleRef].to({...scaleDown})
    this.refs[checkmarkeRef].to({...scaleDown})
  }

  scaleUpBubble = (bubbleRef, bubbleTextRef, checkmarkBubbleRef, checkmarkeRef) => {
    this.refs[bubbleRef].to({...scaleUp})
    this.refs[bubbleTextRef].to({...scaleUp})
    this.refs[checkmarkBubbleRef].to({...scaleUp})
    this.refs[checkmarkeRef].to({...scaleUp})
  }

  handleLessonBubbleClick = (e, lessonId, order) => {
    const { bubbleStyles, bubbleTextStyles, selectedBubbleRef, selectedBubbleTextRef, selectedCheckmarkBubbleRef, selectedCheckmarkRef } = this.state
      , bubbleRef = `circle-${order}`
      , bubbleTextRef = `text-${order}`
      , checkmarkBubbleRef = `checkMark-bubble-${order}`
      , checkmarkeRef = `checkMark-${order}`
      , newBubbleStyles =  cloneDeep(bubbleStyles)
      , newBubbleTextStyles = cloneDeep(bubbleTextStyles)
    
    this.props.onLessonSelect(e, lessonId)

    if(selectedBubbleRef && selectedBubbleTextRef) {
      this.scaleDownBubble(selectedBubbleRef, selectedBubbleTextRef, selectedCheckmarkBubbleRef, selectedCheckmarkRef)
    }

    this.setState({
      bubbleStyles: newBubbleStyles.map((_, i) => {
        return (i === order - 1) ? shapeProps.selectedBubbleStyle : shapeProps.defaultBubbleStyle
      })
      , bubbleTextStyles: newBubbleTextStyles.map((_, i) => {
        return (i === order - 1) ? shapeProps.selectedBubbleTextStyle : shapeProps.defaultBubbleTextStyle
      })
      , selectedBubbleRef: bubbleRef
      , selectedBubbleTextRef: bubbleTextRef
      , selectedCheckmarkBubbleRef: checkmarkBubbleRef
      , selectedCheckmarkRef: checkmarkeRef
    })

    this.scaleUpBubble(bubbleRef, bubbleTextRef, checkmarkBubbleRef, checkmarkeRef)
  }

  renderLessonBubble = (lesson, order, isSelected) => {
    const { handleMouseOver, handleMouseOut } = this.props
      , { mapDimensions, bubbleStyles, bubbleTextStyles } = this.state
      , index = order - 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleTextStyle = bubbleTextStyles[index]
      , hasBeenStartedByStudent = has(lesson, 'userLesson')
      , bubbleKeyAndRef = `circle-${order}`
      , bubbleTextKeyAndRef = `text-${order}`
      , checkmarkBubbleKeyAndRef = `checkMark-bubble-${order}`
      , checkmarkKeyAndRef = `checkMark-${order}`
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    const clickProps = {
      onClick: (e) => this.handleLessonBubbleClick(e, lesson._id, order)
      , onMouseOver: handleMouseOver
      , onMouseOut: handleMouseOut
    }

    if(hasBeenStartedByStudent) {
      const completionPercentage = 75  // mock 75% for now - will ultimately end up being this:  get(lesson, 'userLesson.completionPercentage', 0)

      if(completionPercentage === 100) {

      } else {
        // partial border styling
        // delete(bubbleStyle.fill)
        // const variance = bubbleStyle.height / 100
        // const offset = bubbleStyle.height/2
        // const gradStartPt = -1 * (completionPercentage * variance - offset)
        // bubbleStyle.fillLinearGradientStartPoint={y: gradStartPt}
        // bubbleStyle.fillLinearGradientEndPoint={y : gradStartPt + .01}
        // bubbleStyle.fillLinearGradientColorStops=
        // [0, colors.inactiveFillColor, 1, colors.activeFillColor]
      }
    }

    return [
      <Circle // Lesson Bubble
        key={ bubbleKeyAndRef }
        ref={ bubbleKeyAndRef }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...bubbleStyle }
      />
      ,
      <Text // Lesson Bubble Text
        key={ bubbleTextKeyAndRef }
        ref={ bubbleTextKeyAndRef }
        x={ x }
        y={ y }
        text={ order }
        { ...clickProps }
        { ...bubbleTextStyle }
      />
      ,
      <Circle // Checkmark Bubble
        key={ checkmarkBubbleKeyAndRef }
        ref={ checkmarkBubbleKeyAndRef }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...shapeProps.checkMarkBubbleStyle }
      />
      ,
      <Path // Checkmark Bubble Text
        key={ checkmarkKeyAndRef }
        ref={ checkmarkKeyAndRef }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...shapeProps.checkMarkStyle }
      />
    ]
  }

  render() {
    const { mapLessons, selectedLessonId = null } = this.props

    const bubbleElements = []

    mapLessons.forEach((lesson, i) => {
      const order = i + 1
      const isSelected = isLessonSelected(lesson, selectedLessonId)
      bubbleElements.push(...this.renderLessonBubble(lesson, order, isSelected))
    })

    return bubbleElements
  }
}

export default MapBubbles
