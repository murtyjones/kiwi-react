import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path, Arc } from 'react-konva'
import { has, get, find, findIndex, cloneDeep, isEqual } from 'lodash'

import { LESSON_MAP_POINTS, SVG_PATHS } from '../constants'
import insertIf from '../utils/insertIf'

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
  , activeFillColor: '#664C93' // #40305E
  , inactiveFillColor: '#664C93'
  , activeTextColor: '#FFFFFF'
  , inactiveTextColor: '#FFFFFF'
  , completedColor: '#543e80'
  , checkMarkCircleColor: '#abd698'
  , checkMarkColor: '#FFFFFF'
  , completionLayerOneColor: '#7E5DB8'
}

const makeBubbleRef = (order) => `circle-${order}`
    , makeBubbleTextRef = (order) => `text-${order}`
    , makeCompletionLayerOneRefText = (order) => `circle-completion-layer-1-${order}`
    , makeCompletionLayerTwoRefText = (order) => `circle-completion-layer-2-${order}`
    , makeCompletionRefArray = (completionLayerRefText) => [...Array(6)].map((x, i) => `${completionLayerRefText}-${i}`)
    , makeCheckMarkRef = (order) => `checkMark-${order}`

const shapeProps = {
  defaultBubbleStyle: {
    fill: colors.inactiveFillColor
    , width: 50
    , height: 50
  },
  defaultBubbleTextStyle: {
    fill: colors.inactiveTextColor
    , width: 35
    , height: 35
    , fontSize: 28
    , offsetX: 18
    , offsetY: 13
    , fontStyle: 'bold'
    , fontFamily: 'arial'
    , align: 'center'
  },
  checkMarkStyle: {
    offsetX: -10
    , offsetY: 33
    , fill: colors.checkMarkColor
    , data: SVG_PATHS.CHECKMARK
  },
  arcStyle: {
    lineCap: 'round'
    , lineJoin: 'round'
    , innerRadius: 18
    , outerRadius: 21
    , fill: colors.completionLayerOneColor
    , clockwise: true
  },
  artAddPoints: [
    { angle: 306, rotation: -90 }
    , { angle: 306, rotation: -150 }
    , { angle: 306, rotation: -210 }
    , { angle: 306, rotation: -270 }
    , { angle: 306, rotation: -330 }
    , { angle: 306, rotation: -30 }
  ]
}

shapeProps.selectedBubbleStyle = {
  ...shapeProps.defaultBubbleStyle
  , fill: colors.activeFillColor
}

shapeProps.selectedBubbleTextStyle = {
  ...shapeProps.defaultBubbleTextStyle
  , textFill: colors.activeTextColor
}

const calculateNewAngle = (completionPercentage) =>
  360 - (completionPercentage * 3.6)


class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapLessons: []
      , mapDimensions: LESSON_MAP_POINTS(props.width)
      , bubbleStyles: props.mapLessons.map((_, i) => shapeProps.defaultBubbleStyle)
      , bubbleTextStyles: props.mapLessons.map((_, i) => shapeProps.defaultBubbleTextStyle)
      , selectedBubbleRef: ''
      , selectedBubbleTextRef: ''
      , selectedCheckMarkRef: ''
    }
  }

  static propTypes = {
    onLessonSelect: T.func.isRequired
    , handleMouseOver: T.func.isRequired
    , handleMouseOut: T.func.isRequired
    , mapLessons: T.array.isRequired
    , selectedLessonId: T.string
  }

  componentWillMount() {
    const { mapLessons } = this.props
    this.applyLessonStates(mapLessons)
  }

  componentWillReceiveProps(nextProps) {
    const { mapLessons } = this.props
        , { mapLessons: nextMapLessons } = nextProps
        , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)

    if(mapLessonsHasChanged) {
      this.applyLessonStates(nextMapLessons)
    }
  }

  applyLessonStates = (mapLessons) =>
    mapLessons.forEach((lesson, index) => {
      const order = index + 1
          , wasJustCompleted = lesson.justCompleted
          , completionPercentage = get(lesson, 'userLesson.completionPercentage', null)
          , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
          , hasBeenStarted = has(lesson, 'userLesson')
          , bubbleRef = makeBubbleRef(order)
          , completionRefs = makeCompletionRefArray(makeCompletionLayerOneRefText(order))
          , bubbleTextRef = makeBubbleTextRef(order)
          , checkMarkRef = makeCheckMarkRef(order)

      if(wasJustCompleted) {
        setTimeout(() => {
          this.handleBubbleSelectionScaling(lesson, order)
          this.setSelectedLesson(lesson, order)
          this.completionAnimation(lesson)
        }, 500)
      }
    })

  completionAnimation = () => {

  }

  setSelectedLesson = (lesson, order) =>
    this.setState({
      bubbleStyles: cloneDeep(this.state.bubbleStyles).map((_, i) =>
        (i === order - 1) ? shapeProps.selectedBubbleStyle : shapeProps.defaultBubbleStyle
      )
      , bubbleTextStyles: cloneDeep(this.state.bubbleTextStyles).map((_, i) =>
        (i === order - 1) ? shapeProps.selectedBubbleTextStyle : shapeProps.defaultBubbleTextStyle
      )
      , selectedBubbleRef: makeBubbleRef(order)
      , selectedBubbleTextRef: makeBubbleTextRef(order)
      , selectedCompletionLayerOneRefs: makeCompletionRefArray(makeCompletionLayerOneRefText(order))
      , selectedBubbleHasBeenCompleted: get(lesson, 'userLesson.hasBeenCompleted', false)
      , selectedCheckMarkRef: makeCheckMarkRef(order)
    })

  handleBubbleSelectionScaling = (lesson, order) => {
    const { selectedBubbleRef, selectedBubbleTextRef, selectedCheckMarkRef, selectedBubbleHasBeenCompleted, selectedCompletionLayerOneRefs } = this.state
      , bubbleRef = makeBubbleRef(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , completionRefs = makeCompletionRefArray(makeCompletionLayerOneRefText(order))
      , shouldHaveCheckMark = get(lesson, 'userLesson.hasBeenCompleted', false)

    if(selectedBubbleRef && selectedBubbleTextRef) {
      this.scaleItems([
        selectedBubbleRef
        , selectedBubbleTextRef
        , ...selectedCompletionLayerOneRefs
        , ...insertIf(selectedBubbleHasBeenCompleted, selectedCheckMarkRef)
      ], scaleDown)
    }

    this.scaleItems([
      bubbleRef
      , bubbleTextRef
      , ...completionRefs
      , ...insertIf(shouldHaveCheckMark, checkMarkRef)
    ], scaleUp)
  }

  scaleItems = (itemRefs, scaleProps) =>
    itemRefs.forEach(eachRef => {
      if(this.refs[eachRef])
        this.refs[eachRef].to({...scaleProps}/*must be passed with this strange destruction*/)
    })

  handleLessonBubbleClick = (e, lesson, order) => {
    this.props.onLessonSelect(e, lesson._id)
    this.handleBubbleSelectionScaling(lesson, order)
    this.setSelectedLesson(lesson, order)
  }

  handleMouseOver = (e) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    this.props.handleMouseOver()
  }

  handleMouseOut = (e) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    this.props.handleMouseOut()
  }

  renderLessonBubble = (lesson, order) => {
    const { handleMouseOver, handleMouseOut } = this.props
      , { mapDimensions, bubbleStyles, bubbleTextStyles } = this.state
      , index = order - 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleTextStyle = bubbleTextStyles[index]
      , hasBeenStarted = has(lesson, 'userLesson')
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , bubbleRef = makeBubbleRef(order)
      , completionLayerOneRefText = makeCompletionLayerOneRefText(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    const clickProps = {
      onClick: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onMouseOver: this.handleMouseOver
      , onMouseOut: this.handleMouseOut
    }

    return [
      <Circle // Lesson Bubble
        key={ bubbleRef }
        ref={ bubbleRef }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...bubbleStyle }
      />
      ,
      <Text // Lesson Bubble Text
        key={ bubbleTextRef }
        ref={ bubbleTextRef }
        x={ x }
        y={ y }
        text={ order }
        { ...clickProps }
        { ...bubbleTextStyle }
      />
      ,
      [...Array(6)].map((e, i) =>
        <Arc
          key={ `${completionLayerOneRefText}-${i}` }
          ref={ `${completionLayerOneRefText}-${i}` }
          x={ x }
          y={ y }
          { ...clickProps }
          { ...shapeProps.arcStyle }
          { ...shapeProps.artAddPoints[i] }
        />
      )
      ,
      ...insertIf(hasBeenCompleted,
        <Path // CheckMark Bubble Text
          key={ checkMarkRef }
          ref={ checkMarkRef }
          x={ x }
          y={ y }
          { ...clickProps }
          { ...shapeProps.checkMarkStyle }
        />
      )
    ]
  }

  render() {
    const { mapLessons } = this.props

    return mapLessons.reduce((acc, lesson, i) => {
      acc.push(...this.renderLessonBubble(lesson, i + 1))
      return acc
    }, [])
  }
}

export default MapBubbles
