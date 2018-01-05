import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path, Arc } from 'react-konva'
import { has, get, find, findIndex, cloneDeep, isEqual, isEmpty } from 'lodash'
import update from 'immutability-helper'

import { LESSON_MAP_POINTS, SVG_PATHS } from '../constants'
import insertIf from '../utils/insertIf'
import setTimeoutAsync from '../utils/setTimeoutAsync'

const scaleUp = { // for some reason, these must be destructed using '...' when passing to .to()
  scaleX: 1.3
  , scaleY: 1.3
  , duration: 0.1
}

const scaleDown = { // for some reason, these must be destructed using '...' when passing to .to()
  scaleX: 1
  , scaleY: 1
  , duration: 0.1
}

const colors = {
  activeStrokeColor: '#696969'
  , activeFillColor: '#664C93' // #40305E
  , inactiveFillColor: '#664C93'
  , activeTextColor: '#FFFFFF'
  , inactiveTextColor: '#FFFFFF'
  , inProgressLayerTwoColor: '#543e80'
  , justCompletedLayerTwoColor: '#FFFFFF'
  , justCompletedTextColor: '#543e80'
  , checkMarkColor: '#FFFFFF'
  , completionLayerOneColor: '#7E5DB8'
  , completionLayerTwoColor: '#FFFFFF'
}

const makeBubbleRef = (order) => `circle-${order}`
    , makeBubbleTextRef = (order) => `text-${order}`
    , makeCompletionLayerOneRef = (order) => `circle-completion-layer-one-${order}`
    , makeCompletionLayerTwoRef = (order) => `circle-completion-layer-two-${order}`
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
  defaultArcStyleLayerOne: {
    lineCap: 'round'
    , lineJoin: 'round'
    , innerRadius: 18
    , outerRadius: 21
    , fill: colors.completionLayerOneColor
    , clockwise: false
    , angle: 0
    , rotation: -90
  },
  defaultArcStyleLayerTwo: {
    lineCap: 'round'
    , lineJoin: 'round'
    , innerRadius: 18
    , outerRadius: 21
    , fill: colors.completionLayerTwoColor
    , clockwise: false
    , angle: 0
    , rotation: -90
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

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width)
      , bubbleStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleStyle))
      , bubbleTextStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleTextStyle))
      , arcStylesLayerOne: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultArcStyleLayerOne))
      , arcStylesLayerTwo: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultArcStyleLayerTwo))
      , selectedBubbleRef: ''
      , selectedBubbleTextRef: ''
      , selectedCheckMarkRef: ''
      , selectedCompletionLayerOneRef: ''
      , selectedCompletionLayerTwoRef: ''
    }
  }

  static propTypes = {
    onLessonSelect: T.func.isRequired
    , handleMouseOver: T.func.isRequired
    , handleMouseOut: T.func.isRequired
    , mapLessons: T.array.isRequired
    , selectedLessonId: T.string
  }

  async componentDidMount() {
    const { mapLessons } = this.props
    await this.applyLessonStates(mapLessons)
  }

  async componentWillReceiveProps(nextProps) {
    const { mapLessons } = this.props
        , { mapLessons: nextMapLessons } = nextProps
        , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)

    if(mapLessonsHasChanged) {
      await this.applyLessonStates(nextMapLessons)
    }
  }

  applyLessonStates = async(mapLessons) => {
    await setTimeoutAsync(500)
    await this.drawLayerOneForAll(mapLessons)
    mapLessons.forEach(async(lesson, index) => {
      const order = index + 1
        , wasJustCompleted = get(lesson, 'justCompleted', false)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      
      await setTimeoutAsync(500)
      if(wasJustCompleted) {
        this.handleBubbleSelectionScaling(lesson, order)
        this.setSelectedLesson(lesson, order)
        await this.drawLayerTwoForLesson(lesson, order, colors.justCompletedLayerTwoColor)
        await setTimeoutAsync(1600)
        await this.fadeText(lesson, order)
      } else if(hasBeenCompleted) {
        await this.drawLayerTwoForLesson(lesson, order, colors.inProgressLayerTwoColor)
      } else {
        await this.drawLayerTwoForLesson(lesson, order, colors.inProgressLayerTwoColor)
      }
    })
  }

  fadeText = (lesson, order) => {
    const bubbleTextRef = makeBubbleTextRef(order)
    this.refs[bubbleTextRef].to({ fill: colors.justCompletedTextColor, duration: 0.3 })
  }

  drawLayerOneForAll = async(mapLessons) => {
    const newArcStylesLayerOne = cloneDeep(this.state.arcStylesLayerOne)
    await mapLessons.forEach(async(lesson, i) => {
      const order = i + 1
        , completionLayerOneRefText = makeCompletionLayerOneRef(order)
        , newAngle = 360
      await this.refs[completionLayerOneRefText].to({
        angle: newAngle
        , duration: 1.0
      })
      await this.fillInCompletionLayer(completionLayerOneRefText, newAngle, 1.0)
      newArcStylesLayerOne[i].angle = newAngle
    })
    this.setState({ arcStylesLayerOne: newArcStylesLayerOne })
  }

  drawLayerTwoForLesson = async(lesson, order, color) => {
    const newArcStylesLayerTwo = this.state.arcStylesLayerTwo.slice()
      , completionLayerTwoRefText = makeCompletionLayerTwoRef(order)
      , i = order - 1
      , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0) / 100
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , percentageToUse = hasBeenCompleted ? 1.00 : completionPercentage
      , newAngle = percentageToUse * 360
    await this.changeCompletionLayerColor(completionLayerTwoRefText, color, 0.1)
    await this.fillInCompletionLayer(completionLayerTwoRefText, newAngle, 1.5)
    newArcStylesLayerTwo[i].angle = newAngle
    newArcStylesLayerTwo[i].fill = color
    await this.setState({ arcStylesLayerTwo: newArcStylesLayerTwo })
    
  }

  changeCompletionLayerColor = async(ref, fill, duration) =>
    await this.refs[ref].to({ fill, duration })

  fillInCompletionLayer = async(ref, angle, duration) =>
    await this.refs[ref].to({ angle, duration })

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
      , selectedCompletionLayerOneRef: makeCompletionLayerOneRef(order)
      , selectedCompletionLayerTwoRef: makeCompletionLayerTwoRef(order)
      , selectedBubbleHasBeenCompleted: get(lesson, 'userLesson.hasBeenCompleted', false)
      , selectedCheckMarkRef: makeCheckMarkRef(order)
    })

  deScaleCurrentlySelectedLesson = () => {
    const { selectedBubbleRef, selectedBubbleTextRef, selectedCheckMarkRef, selectedBubbleHasBeenCompleted, selectedCompletionLayerOneRef, selectedCompletionLayerTwoRef } = this.state
    if(selectedBubbleRef && selectedBubbleTextRef) {
      this.scaleItems([
        selectedBubbleRef
        , selectedBubbleTextRef
        , selectedCompletionLayerOneRef
        , selectedCompletionLayerTwoRef
        , ...insertIf(selectedBubbleHasBeenCompleted, selectedCheckMarkRef)
      ], scaleDown)
    }
  }

  handleBubbleSelectionScaling = (lesson, order) => {
    const bubbleRef = makeBubbleRef(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , completionLayerOneRef = makeCompletionLayerOneRef(order)
      , completionLayerTwoRef = makeCompletionLayerTwoRef(order)
      , shouldHaveCheckMark = get(lesson, 'userLesson.hasBeenCompleted', false)

    this.deScaleCurrentlySelectedLesson()

    this.scaleItems([
      bubbleRef
      , bubbleTextRef
      , completionLayerOneRef
      , completionLayerTwoRef
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
    const { mapDimensions, bubbleStyles, bubbleTextStyles, arcStylesLayerOne, arcStylesLayerTwo } = this.state
        , index = order - 1
        , bubbleStyle = bubbleStyles[index]
        , bubbleTextStyle = bubbleTextStyles[index]
        , arcStyleLayerOne = arcStylesLayerOne[index]
        , arcStyleLayerTwo = arcStylesLayerTwo[index]
        , hasBeenStarted = has(lesson, 'userLesson')
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
        , bubbleRef = makeBubbleRef(order)
        , completionLayerOneRefText = makeCompletionLayerOneRef(order)
        , completionLayerTwoRefText = makeCompletionLayerTwoRef(order)
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
      <Arc
        key={ `${completionLayerOneRefText}` }
        ref={ `${completionLayerOneRefText}` }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...arcStyleLayerOne }
      />
      ,
      <Arc
        key={ `${completionLayerTwoRefText}` }
        ref={ `${completionLayerTwoRefText}` }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...arcStyleLayerTwo }
      />
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
