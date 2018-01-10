import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path, Arc, Line, Rect, Label, Tag } from 'react-konva'
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

const bubbleStates = {
  AVAILABLE: 'AVAILABLE'
  , LOCKED: 'LOCKED'
}

const colors = {
  activeStrokeColor: '#696969'
  , activeFillColor: '#664C93' // #40305E
  , inactiveFillColor: '#664C93'
  , activeTextColor: '#FFFFFF'
  , inactiveTextColor: '#FFFFFF'
  , inProgressLayerTwoColor: '#543e80'
  , justCompletedLayerTwoColor: '#FFFFFF'
  , completedTextColor: '#543e80'
  , checkMarkColor: '#FFFFFF'
  , tagColor: '#443268'
  , lockColor: '#FFFFFF'
  , completionLayerOneColor: '#7E5DB8'
  , completionLayerTwoColor: '#FFFFFF'
}

const makeBubbleRef = order => `circle-${order}`
    , makeTransparentBubbleRef = order => `circle-transparent-${order}`
    , makeBubbleTextRef = order => `text-${order}`
    , makeCompletionLayerOneRef = order => `circle-completion-layer-one-${order}`
    , makeCompletionLayerTwoRef = order => `circle-completion-layer-two-${order}`
    , makeCompletionRefArray = (completionLayerRefText) => [...Array(6)].map((x, i) => `${completionLayerRefText}-${i}`)
    , makeCheckMarkRef = order => `checkMark-${order}`
    , makeTagRef = order => `tag-${order}`
    , makeTagTextRef = order => `tag-text-${order}`
    , makeLockRef =  order => `lock-${order}`

const shapeProps = {
  defaultBubbleStyle: {
    fill: colors.inactiveFillColor
    , width: 57
    , height: 57
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
  defaultBubbleTextColor: colors.inactiveTextColor,
  defaultCheckMarkStyle: {
    stroke: colors.checkMarkColor
    , strokeWidth: 4
    , offsetX: 15
    , offsetY: 0
    , points: []
  },
  selectedCheckMarkStyle: {
    stroke: colors.checkMarkColor
    , strokeWidth: 6
    , offsetX: 15
    , offsetY: 0
  },
  defaultArcStyleLayerOne: {
    lineCap: 'round'
    , lineJoin: 'round'
    , innerRadius: 21
    , outerRadius: 24
    , fill: colors.completionLayerOneColor
    , clockwise: false
    , angle: 0
    , rotation: -90
  },
  defaultArcStyleLayerTwo: {
    lineCap: 'round'
    , lineJoin: 'round'
    , innerRadius: 21
    , outerRadius: 24
    , fill: colors.completionLayerTwoColor
    , clockwise: false
    , angle: 0
    , rotation: -90
  },
  lockStyle: {
    offsetX: 11.5
    , offsetY: 13
    , fill: colors.lockColor
    , data: SVG_PATHS.LOCK
  },
  tagStyle: {
    fill: colors.tagColor
    , lineJoin: 'round'
    , cornerRadius: 3
    , scaleX: 0
    , offsetX: 0
    , pointerDirection: 'left'
    , pointerWidth: 0
    , pointerHeight: 0
  },
  tagTextStyle: {
    text: ''
    , fontFamily: 'Arial'
    , fontSize: 18
    , padding: 7
    , fill: 'white'
    , scaleX: 0
    , offsetX: 0
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

const calculateBubbleAvailabilities = (mapLessons, latestActiveLessonId) => {
  let pastLatestActiveLessonId = false
  return mapLessons.map((e, i) => {
    const order = i + 1
    if(!pastLatestActiveLessonId && e._id !== latestActiveLessonId) {
      return bubbleStates.AVAILABLE
    } else if(!pastLatestActiveLessonId && e._id === latestActiveLessonId) {
      pastLatestActiveLessonId = true
      return bubbleStates.AVAILABLE
    } else if(pastLatestActiveLessonId) {
      return bubbleStates.LOCKED
    }
  })
}

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width)
      , bubbleStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleStyle))
      , bubbleTextStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleTextStyle))
      , bubbleAvailabilities: props.mapLessons.map((_, i) => i + 1)
      , bubbleTextColors: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleTextColor))
      , checkMarkStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultCheckMarkStyle))
      , checkMarkPoints: props.mapLessons.map(_ => [])
      , tagStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.tagStyle))
      , tagTextStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.tagTextStyle))
      , arcStylesLayerOne: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultArcStyleLayerOne))
      , arcStylesLayerTwo: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultArcStyleLayerTwo))
      , selectedBubbleRef: ''
      , selectedBubbleTextRef: ''
      , selectedCheckMarkRef: ''
      , selectedCompletionLayerOneRef: ''
      , selectedCompletionLayerTwoRef: ''
      , selectedTagRef: ''
    }
  }

  static propTypes = {
    onLessonSelect: T.func.isRequired
    , handleMouseOver: T.func.isRequired
    , handleMouseOut: T.func.isRequired
    , mapLessons: T.array.isRequired
    , selectedLessonId: T.string
    , latestActiveLessonId: T.string
  }

  componentWillMount() {
    const { mapLessons, latestActiveLessonId } = this.props
    this.setBubbleAvailabilities(mapLessons, latestActiveLessonId)
    this.setStartingCheckMarkPoints(mapLessons)
    this.setStartingBubbleTextColors(mapLessons)
  }

  async componentDidMount() {
    const { mapLessons } = this.props
    await this.applyLessonStates(mapLessons)
  }

  async componentWillReceiveProps(nextProps) {
    const { mapLessons, latestActiveLessonId } = this.props
        , { mapLessons: nextMapLessons, latestActiveLessonId: nextLatestActiveLessonId } = nextProps
        , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
        , latestActiveLessonIdHasCHanged = !isEqual(latestActiveLessonId, nextLatestActiveLessonId)

    if(mapLessonsHasChanged) {
      this.setStartingCheckMarkPoints(nextMapLessons)
      this.setStartingBubbleTextColors(nextMapLessons)
      await this.applyLessonStates(nextMapLessons)
    }

    if(latestActiveLessonIdHasCHanged || mapLessonsHasChanged) {
      this.setBubbleAvailabilities(nextMapLessons, nextLatestActiveLessonId)
    }
  }

  setStateAsync = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, resolve)
    });
  }

  setStartingCheckMarkPoints = (mapLessons) => {
    const { checkMarkPoints, mapDimensions } = this.state
    const newCheckMarkPoints = cloneDeep(checkMarkPoints)
    mapLessons.forEach((lesson, i) => {
      const order = i + 1
        , x = mapDimensions[`CIRCLE_${order}_X`]
        , y = mapDimensions[`CIRCLE_${order}_Y`]
        , wasJustCompleted = get(lesson, 'justCompleted', false)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      if(hasBeenCompleted && !wasJustCompleted) {

        newCheckMarkPoints[i] = [ x, y, x+10, y+10, x+30, y-10 ]
      }
    })
    this.setState({ checkMarkPoints: newCheckMarkPoints })
  }

  setStartingBubbleTextColors = (mapLessons) => {
    const { bubbleTextStyles, bubbleTextColors, mapDimensions } = this.state
    const newBubbleTextStyles = cloneDeep(bubbleTextStyles)
    const newBubbleTextColors = cloneDeep(bubbleTextColors)
    mapLessons.forEach((lesson, i) => {
      const wasJustCompleted = get(lesson, 'justCompleted', false)
        ,  hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      if(hasBeenCompleted && !wasJustCompleted) {
        newBubbleTextStyles[i].fill = colors.completedTextColor
        newBubbleTextColors[i] = colors.completedTextColor
      }
    })
    this.setState({
      bubbleTextStyles: newBubbleTextStyles
      , bubbleTextColors: newBubbleTextColors
    })
  }

  setBubbleAvailabilities = (mapLessons, latestActiveLessonId) =>
    this.setState({ bubbleAvailabilities: calculateBubbleAvailabilities(mapLessons, latestActiveLessonId) })

  applyLessonStates = async(mapLessons) => {
    const { checkMarkPoints, mapDimensions } = this.state
    await setTimeoutAsync(500)
    await this.drawLayerOneForAll(mapLessons)
    mapLessons.forEach(async(lesson, index) => {
      const order = index + 1
        , x = mapDimensions[`CIRCLE_${order}_X`]
        , y = mapDimensions[`CIRCLE_${order}_Y`]
        , wasJustCompleted = get(lesson, 'justCompleted', false)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)

      if(wasJustCompleted) {
        await this.fadeText(lesson, order)
      }

      await setTimeoutAsync(500)
      if(wasJustCompleted) {
        this.handleBubbleSelectionScaling(lesson, order)
        this.setSelectedLesson(lesson, order)
        await this.drawLayerTwoForLesson(lesson, order, colors.justCompletedLayerTwoColor)
        await setTimeoutAsync(1600)
        this.drawCheckMark(lesson, order)
      } else if(hasBeenCompleted) {
        await this.drawLayerTwoForLesson(lesson, order, colors.inProgressLayerTwoColor)
      } else {
        await this.drawLayerTwoForLesson(lesson, order, colors.inProgressLayerTwoColor)
      }
    })
  }

  drawCheckMark = (lesson, order) => {
    const { mapDimensions, checkMarkPoints } = this.state
      , i = order - 1
      , newCheckMarkPoints = cloneDeep(checkMarkPoints)
      , checkMarkRef = makeCheckMarkRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    this.refs[checkMarkRef].to({ duration: 1, points: [ x, y ] })
    this.refs[checkMarkRef].to({ duration: 1, points: [ x, y, x+10, y+10 ] })
    this.refs[checkMarkRef].to({ duration: 1, points: [ x, y, x+10, y+10, x+30, y-10 ] })

    newCheckMarkPoints[i] = [ x, y, x+10, y+10, x+30, y-10 ]
    this.setState({ checkMarkPoints: newCheckMarkPoints })

  }

  fadeText = (lesson, order) => {
    const { bubbleTextStyles, bubbleTextColors } = this.state
      , newBubbleTextStyles = cloneDeep(bubbleTextStyles)
      , newBubbleTextColors = cloneDeep(bubbleTextColors)
      , i = order - 1
    const bubbleTextRef = makeBubbleTextRef(order)
    this.refs[bubbleTextRef].to({ fill: colors.completedTextColor, duration: 0.3 })
    newBubbleTextStyles[i].fill = colors.completedTextColor
    newBubbleTextColors[i] = colors.completedTextColor
    this.setState({
      bubbleTextStyles: newBubbleTextStyles
      , bubbleTextColors: newBubbleTextColors
    })
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
      , checkMarkStyles: cloneDeep(this.state.checkMarkStyles).map((_, i) =>
        (i === order - 1) ? shapeProps.selectedCheckMarkStyle : shapeProps.defaultCheckMarkStyle
      )
      , selectedBubbleRef: makeBubbleRef(order)
      , selectedBubbleTextRef: makeBubbleTextRef(order)
      , selectedCompletionLayerOneRef: makeCompletionLayerOneRef(order)
      , selectedCompletionLayerTwoRef: makeCompletionLayerTwoRef(order)
      , selectedBubbleHasBeenCompleted: get(lesson, 'userLesson.hasBeenCompleted', false)
      , selectedCheckMarkRef: makeCheckMarkRef(order)
      , selectedTagRef: makeTagRef(order)
    })

  deScaleCurrentlySelectedLesson = (order) => {
    const { selectedBubbleRef, selectedBubbleTextRef, selectedCheckMarkRef, selectedBubbleHasBeenCompleted, selectedCompletionLayerOneRef, selectedCompletionLayerTwoRef } = this.state
    if(selectedBubbleRef && selectedBubbleTextRef) {

      if(selectedBubbleHasBeenCompleted) {
        this.scaleCheckMark(selectedCheckMarkRef, order, 'down')
      }

      this.scaleBubbleText(selectedBubbleTextRef, selectedBubbleHasBeenCompleted, order, scaleUp)

      this.scaleItems([
        selectedBubbleRef
        , selectedCompletionLayerOneRef
        , selectedCompletionLayerTwoRef
      ], scaleDown)
    }
  }

  scaleUpNewlySelectedLesson = (lesson, order) => {
    const bubbleRef = makeBubbleRef(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , completionLayerOneRef = makeCompletionLayerOneRef(order)
      , completionLayerTwoRef = makeCompletionLayerTwoRef(order)
      , shouldHaveCheckMark = get(lesson, 'userLesson.hasBeenCompleted', false)

    if(shouldHaveCheckMark) {
      this.scaleCheckMark(checkMarkRef, order, 'up')
    }
    
    this.scaleBubbleText(bubbleTextRef, shouldHaveCheckMark, order, scaleUp)

    this.scaleItems([
      bubbleRef, completionLayerOneRef, completionLayerTwoRef
    ], scaleUp)
  }

  scaleBubbleText = (ref, hasBeenCompleted, order, scaleParams) => {
    const { bubbleTextColors } = this.state
      , newBubbleTextColors = cloneDeep(bubbleTextColors)
      , i = order - 1

    this.refs[ref].to({...scaleParams})
    if(hasBeenCompleted) {
      newBubbleTextColors[i] = colors.completedTextColor
    } else {
      newBubbleTextColors[i] = colors.activeTextColor
    }

    this.setState({ bubbleTextColors: newBubbleTextColors })
  }

  handleBubbleSelectionScaling = (lesson, order) => {
    this.deScaleCurrentlySelectedLesson(order)
    this.scaleUpNewlySelectedLesson(lesson, order)
  }

  scaleItems = (itemRefs, scaleProps) =>
    itemRefs.forEach(eachRef => {
      if(this.refs[eachRef])
        this.refs[eachRef].to({...scaleProps}/*must be passed with this strange destruction*/)
    })

  scaleCheckMark = (ref, order, direction) => {
    const { checkMarkStyles } = this.state
      , newCheckMarkStyles = cloneDeep(checkMarkStyles)
      , i = order - 1
      , directionIsUp = direction === 'up'
      , strokeWidth = directionIsUp
        ? shapeProps.selectedCheckMarkStyle.strokeWidth
        : shapeProps.defaultCheckMarkStyle.strokeWidth

    this.refs[ref].to({ strokeWidth, duration: 0.1})
    newCheckMarkStyles[i].strokeWidth = strokeWidth
    this.setState({ checkMarkStyles: newCheckMarkStyles })
  }

  handleLessonBubbleClick = (e, lesson, order) => {
    const { bubbleAvailabilities } = this.state
      , i = order - 1
      , isAvailable = bubbleAvailabilities[i] === bubbleStates.AVAILABLE

    if(isAvailable) {
      this.props.onLessonSelect(e, lesson._id)
      this.handleBubbleSelectionScaling(lesson, order)
      this.setSelectedLesson(lesson, order)
    }
  }

  handleMouseOver = (e, lesson, order, isAvailable) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    const { selectedTagRef } = this.state
      , toxRef = makeTagRef(order)
      , isAlreadySelected = selectedTagRef === toxRef
    let message = isAvailable ? lesson.title : 'Not unlocked yet!'
    if(isAvailable)
      this.props.handleMouseOver()
    if(!isAlreadySelected)
      this.displayMessage(order, message)
  }

  handleMouseOut = (e, lesson, order, isAvailable) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    this.props.handleMouseOut()
    this.undisplayMessage(order)
  }

  displayMessage = (order, message) => {
    const tagRef = makeTagRef(order)
      , tagTextRef = makeTagTextRef(order)
      , offsetX = 10
      , i = order - 1
      , { tagStyles, tagTextStyles } = this.state
      , newTagStyles = cloneDeep(tagStyles)
      , newTagTextStyles = cloneDeep(tagTextStyles)

    this.refs[tagTextRef].text(message)
    this.refs[tagRef].to({ scaleX: 1, duration: 0.1, offsetX })
    this.refs[tagTextRef].to({ scaleX: 1, duration: 0.1, offsetX })
    newTagStyles[i].scaleX = 1
    newTagTextStyles[i].scaleX = 1
    newTagStyles[i].offsetX = offsetX
    newTagTextStyles[i].offsetX = offsetX
    newTagTextStyles[i].text = message
    this.setState({ tagStyles: newTagStyles, tagTextStyles: newTagTextStyles })
  }

  undisplayMessage = (order) => {
    const tagRef = makeTagRef(order)
      , tagTextRef = makeTagTextRef(order)
      , i = order - 1
      , { tagStyles, tagTextStyles } = this.state
      , newTagStyles = cloneDeep(tagStyles)
      , newTagTextStyles = cloneDeep(tagTextStyles)
    this.refs[tagTextRef].text('')
    this.refs[tagRef].to({ scaleX: 0, duration: 0.1 })
    this.refs[tagTextRef].to({ scaleX: 0, duration: 0.1 })
    newTagStyles[i].scaleX = 0
    newTagTextStyles[i].scaleX = 0
    newTagTextStyles[i].text = ''
    this.setState({ tagStyles: newTagStyles, tagTextStyles: newTagTextStyles })
  }

  renderLessonBubble = (lesson, order) => {
    const { mapDimensions, bubbleStyles, bubbleAvailabilities, bubbleTextStyles, tagStyles, tagTextStyles, bubbleTextColors, checkMarkStyles, checkMarkPoints, arcStylesLayerOne, arcStylesLayerTwo } = this.state
      , index = order - 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleTextStyle = bubbleTextStyles[index]
      , bubbleAvailability = bubbleAvailabilities[index]
      , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE
      , bubbleText = isAvailable ? order : null
      , bubbleTextColor = bubbleTextColors[index]
      , checkMarkStyle = checkMarkStyles[index]
      , oneCheckMarkPoints = checkMarkPoints[index]
      , arcStyleLayerOne = arcStylesLayerOne[index]
      , arcStyleLayerTwo = arcStylesLayerTwo[index]
      , tagStyle = tagStyles[index]
      , tagTextStyle = tagTextStyles[index]
      , hasBeenStarted = has(lesson, 'userLesson')
      , wasJustCompleted = get(lesson, 'justCompleted', false)
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , bubbleRef = makeBubbleRef(order)
      , transparentBubbleRef = makeTransparentBubbleRef(order)
      , completionLayerOneRefText = makeCompletionLayerOneRef(order)
      , completionLayerTwoRefText = makeCompletionLayerTwoRef(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , tagRef = makeTagRef(order)
      , tagTextRef = makeTagTextRef(order)
      , lockRef = makeLockRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    const clickProps = {
      onClick: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onMouseOver: (e) => this.handleMouseOver(e, lesson, order, isAvailable)
      , onMouseOut: (e) => this.handleMouseOut(e, lesson, order, isAvailable)
    }

    return [
      <Label key={ `label-${tagRef}` } x={ x } y={ y } offsetX={ -33 }>
        <Tag
          key={ tagRef }
          ref={ tagRef }
          { ...tagStyle }
        />
        <Text
          key={ tagTextRef }
          ref={ tagTextRef }
          { ...tagTextStyle }
        />
      </Label>
      ,
      <Circle // Lesson Bubble
        key={ bubbleRef }
        ref={ bubbleRef }
        x={ x }
        y={ y }
        { ...bubbleStyle }
      />
      ,
      <Text // Lesson Bubble Text
        key={ bubbleTextRef }
        ref={ bubbleTextRef }
        x={ x }
        y={ y }
        text={ bubbleText }
        { ...bubbleTextStyle }
        fill={ bubbleTextColor }
      />
      ,
      <Arc
        key={ completionLayerOneRefText }
        ref={ completionLayerOneRefText }
        x={ x }
        y={ y }
        { ...arcStyleLayerOne }
      />
      ,
      <Arc
        key={ completionLayerTwoRefText }
        ref={ completionLayerTwoRefText }
        x={ x }
        y={ y }
        { ...arcStyleLayerTwo }
      />
      ,
      ...insertIf(hasBeenCompleted,
        <Line
          key={ checkMarkRef }
          ref={ checkMarkRef }
          { ...checkMarkStyle }
          points={ oneCheckMarkPoints }
        />
      )
      ,
      ...insertIf(!isAvailable,
        <Path
          key={ lockRef }
          ref={ lockRef }
          x={ x }
          y={ y }
          { ...shapeProps.lockStyle }
        />
      )
      ,
      <Circle // Transparent circle to handle clickable stuff
        key={ transparentBubbleRef }
        ref={ transparentBubbleRef }
        x={ x }
        y={ y }
        opacity={ 0 }
        { ...clickProps }
        { ...bubbleStyle }
      />
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
