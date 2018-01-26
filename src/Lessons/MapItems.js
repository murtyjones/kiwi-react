import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path, Arc, Line, Rect, Label, Tag, Layer } from 'react-konva'
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
  , completionArcBackColor: '#7E5DB8'
  , completionArcFrontColor: '#FFFFFF'
}

const makeBubbleRef = order => `circle-${order}`
    , makeTransparentBubbleRef = order => `circle-transparent-${order}`
    , makeBubbleTextRef = order => `text-${order}`
    , makeArcBackRef = order => `circle-completion-layer-one-${order}`
    , makeArcFrontRef = order => `circle-completion-layer-two-${order}`
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
  defaultArcStyleArcBack: {
    lineCap: 'round'
    , lineJoin: 'round'
    , innerRadius: 21
    , outerRadius: 24
    , fill: colors.completionArcBackColor
    , clockwise: false
    , angle: 0
    , rotation: -90
  },
  defaultArcStyleLayerTwo: {
    lineCap: 'round'
    , lineJoin: 'round'
    , innerRadius: 21
    , outerRadius: 24
    , fill: colors.completionArcFrontColor
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

class LessonLabel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tagStyle: cloneDeep(props.tagStyle)
      , tagTextStyle: cloneDeep(props.tagTextStyle)
    }
  }

  static propTypes = {

  }

  componentDidMount() {
    this.setTagPointerDirection()
  }

  setTagPointerDirection = () => {
    const { tagStyle } = this.state
    const { width, mapDimensions, index } = this.props
      , order = index + 1
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , rightOrLeftLabel = x / width >= 0.50 ? 'right': 'left'

    this.setState({ tagStyle: { ...tagStyle, pointerDirection: rightOrLeftLabel } })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.textTagMessage.display && !this.props.textTagMessage.display) {
      this.displayMessage(nextProps.textTagMessage.message)
    }
    if(!nextProps.shouldDisplayMessage && this.props.textTagMessage.display) {
      this.undisplayMessage()
    }
  }

  displayMessage = (message) => {
    const { index } = this.props
      , { tagStyle, tagTextStyle } = this.state
      , order = index + 1
      , tagRef = makeTagRef(order)
      , tagTextRef = makeTagTextRef(order)
      , offsetX = 10

    this[tagTextRef].text(message)
    this[tagRef].to({ scaleX: 1, duration: 0.1, offsetX })
    this[tagTextRef].to({ scaleX: 1, duration: 0.1, offsetX })
    this.setState({
      tagStyle: {
        ...tagStyle
        , scaleX: 1
        , offsetX: offsetX
      }
      , tagTextStyle: {
        ...tagTextStyle
        , scaleX: 1
        , offsetX: offsetX
        , text: message
      }
    })
  }

  undisplayMessage = () => {
    const { index } = this.props
    const { tagStyle, tagTextStyle } = this.state
      , order = index + 1
      , tagRef = makeTagRef(order)
      , tagTextRef = makeTagTextRef(order)

    this[tagTextRef].text('')
    this[tagRef].to({ scaleX: 0, duration: 0.1 })
    this[tagTextRef].to({ scaleX: 0, duration: 0.1 })
    this.setState({
      tagStyle: {
        ...tagStyle
        , scaleX: 0
        , offsetX: 0
      }
      , tagTextStyle: {
        ...tagTextStyle
        , scaleX: 0
        , offsetX: 0
        , text: ''
      }
    })
  }

  render() {
    const { index, width, x, y } = this.props
    const { tagStyle, tagTextStyle } = this.state
      , order = index + 1
      , tagRef = makeTagRef(order)
      , tagTextRef = makeTagTextRef(order)
      , rightOrLeftLabel = x / width >= 0.50 ? 'right': 'left'
      , labelOffsetX = rightOrLeftLabel === 'right' ? 15 : -33

    return [
      <Label key={ `label-${tagRef}` } x={ x } y={ y } offsetX={ labelOffsetX }>
        <Tag
          key={ tagRef }
          ref={ c => this[tagRef] = c  }
          { ...tagStyle }
        />
        <Text
          key={ tagTextRef }
          ref={ c => this[tagTextRef] = c  }
          { ...tagTextStyle }
        />
      </Label>
    ]
  }
}

class MapItems extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width, props.height)
      , bubbleStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleStyle))
      , bubbleTextStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleTextStyle))
      , bubbleAvailabilities: props.mapLessons.map((_, i) => i + 1)
      , bubbleTextColors: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultBubbleTextColor))
      , checkMarkStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultCheckMarkStyle))
      , checkMarkPoints: props.mapLessons.map(_ => [])
      , tagStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.tagStyle))
      , tagTextStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.tagTextStyle))
      , arcStylesArcBack: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultArcStyleArcBack))
      , arcFrontStyles: props.mapLessons.map(_ => cloneDeep(shapeProps.defaultArcStyleLayerTwo))
      , selectedBubbleRef: ''
      , selectedBubbleTextRef: ''
      , selectedCheckMarkRef: ''
      , selectedArcBackRef: ''
      , selectedArcFrontRef: ''
      , selectedTagRef: ''
      , labels: []
      , shouldDisplayMessage: false
      , textTagMessages: props.mapLessons.map(_ => { return { display: false, message: '' } })
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
    this.setTagPointerDirections(mapLessons)
    await this.applyLessonStates(mapLessons)
  }

  async componentWillReceiveProps(nextProps) {
    const { mapLessons, latestActiveLessonId, width, height } = this.props
        , { mapLessons: nextMapLessons, latestActiveLessonId: nextLatestActiveLessonId, width: nextWidth, height: nextHeight } = nextProps
        , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
        , latestActiveLessonIdHasChanged = !isEqual(latestActiveLessonId, nextLatestActiveLessonId)


    if(mapLessonsHasChanged) {
      this.setStartingCheckMarkPoints(nextMapLessons)
      this.setStartingBubbleTextColors(nextMapLessons)
      await this.applyLessonStates(nextMapLessons)
    }

    if(latestActiveLessonIdHasChanged || mapLessonsHasChanged)
      this.setBubbleAvailabilities(nextMapLessons, nextLatestActiveLessonId)
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

  setTagPointerDirections = (mapLessons) => {
    const { tagStyles } = this.state
    let newTagStyles = cloneDeep(tagStyles)
    newTagStyles = mapLessons.map((e, i) => {
      const { width } = this.props
        , { mapDimensions } = this.state
        , order = i + 1
        , { tagStyles, tagTextStyles } = this.state
        , newTagStyles = cloneDeep(tagStyles)
        , x = mapDimensions[`CIRCLE_${order}_X`]
        , rightOrLeftLabel = x / width >= 0.50 ? 'right': 'left'
      newTagStyles[i].pointerDirection = rightOrLeftLabel
      return newTagStyles[i]
    })
    this.setState({ tagStyles: newTagStyles })
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
    await this.drawArcBackForAll(mapLessons)
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

    this[checkMarkRef].to({ duration: 1, points: [ x, y ] })
    this[checkMarkRef].to({ duration: 1, points: [ x, y, x+10, y+10 ] })
    this[checkMarkRef].to({ duration: 1, points: [ x, y, x+10, y+10, x+30, y-10 ] })

    newCheckMarkPoints[i] = [ x, y, x+10, y+10, x+30, y-10 ]
    this.setState({ checkMarkPoints: newCheckMarkPoints })

  }

  fadeText = (lesson, order) => {
    const { bubbleTextStyles, bubbleTextColors } = this.state
      , newBubbleTextStyles = cloneDeep(bubbleTextStyles)
      , newBubbleTextColors = cloneDeep(bubbleTextColors)
      , i = order - 1
    const bubbleTextRef = makeBubbleTextRef(order)
    this[bubbleTextRef].to({ fill: colors.completedTextColor, duration: 0.3 })
    newBubbleTextStyles[i].fill = colors.completedTextColor
    newBubbleTextColors[i] = colors.completedTextColor
    this.setState({
      bubbleTextStyles: newBubbleTextStyles
      , bubbleTextColors: newBubbleTextColors
    })
  }

  drawArcBackForAll = async(mapLessons) => {
    const newArcStylesArcBack = cloneDeep(this.state.arcStylesArcBack)
    await mapLessons.forEach(async(lesson, i) => {
      const order = i + 1
        , completionArcBackRefText = makeArcBackRef(order)
        , newAngle = 360
      await this[completionArcBackRefText].to({
        angle: newAngle
        , duration: 1.0
      })
      await this.fillInCompletionLayer(completionArcBackRefText, newAngle, 1.0)
      newArcStylesArcBack[i].angle = newAngle
    })
    this.setState({ arcStylesArcBack: newArcStylesArcBack })
  }

  drawLayerTwoForLesson = async(lesson, order, color) => {
    const newArcStylesLayerTwo = this.state.arcFrontStyles.slice()
      , completionArcFrontRefText = makeArcFrontRef(order)
      , i = order - 1
      , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0) / 100
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , percentageToUse = hasBeenCompleted ? 1.00 : completionPercentage
      , newAngle = percentageToUse * 360
    await this.changeCompletionLayerColor(completionArcFrontRefText, color, 0.1)
    await this.fillInCompletionLayer(completionArcFrontRefText, newAngle, 1.5)
    newArcStylesLayerTwo[i].angle = newAngle
    newArcStylesLayerTwo[i].fill = color
    await this.setState({ arcFrontStyles: newArcStylesLayerTwo })
    
  }

  changeCompletionLayerColor = async(ref, fill, duration) =>
    await this[ref].to({ fill, duration })

  fillInCompletionLayer = async(ref, angle, duration) =>
    await this[ref].to({ angle, duration })

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
      , selectedArcBackRef: makeArcBackRef(order)
      , selectedArcFrontRef: makeArcFrontRef(order)
      , selectedBubbleHasBeenCompleted: get(lesson, 'userLesson.hasBeenCompleted', false)
      , selectedCheckMarkRef: makeCheckMarkRef(order)
      , selectedTagRef: makeTagRef(order)
    })

  deScaleCurrentlySelectedLesson = (order) => {
    const { selectedBubbleRef, selectedBubbleTextRef, selectedCheckMarkRef, selectedBubbleHasBeenCompleted, selectedArcBackRef, selectedArcFrontRef } = this.state
    if(selectedBubbleRef && selectedBubbleTextRef) {

      if(selectedBubbleHasBeenCompleted) {
        this.scaleCheckMark(selectedCheckMarkRef, order, 'down')
      }

      this.scaleBubbleText(selectedBubbleTextRef, selectedBubbleHasBeenCompleted, order, scaleUp)

      this.scaleItems([
        selectedBubbleRef
        , selectedArcBackRef
        , selectedArcFrontRef
      ], scaleDown)
    }
  }

  scaleUpNewlySelectedLesson = (lesson, order) => {
    const bubbleRef = makeBubbleRef(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , completionArcBackRef = makeArcBackRef(order)
      , completionArcFrontRef = makeArcFrontRef(order)
      , shouldHaveCheckMark = get(lesson, 'userLesson.hasBeenCompleted', false)

    if(shouldHaveCheckMark) {
      this.scaleCheckMark(checkMarkRef, order, 'up')
    }
    
    this.scaleBubbleText(bubbleTextRef, shouldHaveCheckMark, order, scaleUp)

    this.scaleItems([
      bubbleRef, completionArcBackRef, completionArcFrontRef
    ], scaleUp)
  }

  scaleBubbleText = (ref, hasBeenCompleted, order, scaleParams) => {
    const { bubbleTextColors } = this.state
      , newBubbleTextColors = cloneDeep(bubbleTextColors)
      , i = order - 1

    this[ref].to({...scaleParams})
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
      if(this[eachRef])
        this[eachRef].to({...scaleProps}/*must be passed with this strange destruction*/)
    })

  scaleCheckMark = (ref, order, direction) => {
    const { checkMarkStyles } = this.state
      , newCheckMarkStyles = cloneDeep(checkMarkStyles)
      , i = order - 1
      , directionIsUp = direction === 'up'
      , strokeWidth = directionIsUp
        ? shapeProps.selectedCheckMarkStyle.strokeWidth
        : shapeProps.defaultCheckMarkStyle.strokeWidth

    this[ref].to({ strokeWidth, duration: 0.1})
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
      this.displayMessage(order - 1, true, message)
  }

  handleMouseOut = (e, lesson, order, isAvailable) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    this.props.handleMouseOut()
    this.displayMessage(order - 1, false, '')
  }

  renderLock = (lesson, index) => {
    const { mapDimensions, bubbleAvailabilities } = this.state
      , order = index + 1
      , bubbleAvailability = bubbleAvailabilities[index]
      , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE
      , lockRef = makeLockRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    return [
      ...insertIf(!isAvailable,
        <Path
          key={ lockRef }
          ref={ c => this[lockRef] = c  }
          x={ x }
          y={ y }
          { ...shapeProps.lockStyle }
        />
      )
    ]
  }

  renderLessonTransparentBubble = (lesson, index) => {
    const { mapDimensions, bubbleStyles, bubbleAvailabilities } = this.state
      , order = index + 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleAvailability = bubbleAvailabilities[index]
      , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE
      , transparentBubbleRef = makeTransparentBubbleRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]


    const clickProps = {
      onClick: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onMouseOver: (e) => this.handleMouseOver(e, lesson, order, isAvailable)
      , onMouseOut: (e) => this.handleMouseOut(e, lesson, order, isAvailable)
    }

    return [
      <Circle // Transparent circle to handle clickable stuff
        key={ transparentBubbleRef }
        ref={ c => this[transparentBubbleRef] = c  }
        x={ x }
        y={ y }
        opacity={ 0 }
        { ...clickProps }
        { ...bubbleStyle }
      />
    ]
  }

  renderCheckMark = (lesson, index) => {
    const { checkMarkStyles, checkMarkPoints } = this.state
      , order = index + 1
      , checkMarkStyle = checkMarkStyles[index]
      , oneCheckMarkPoints = checkMarkPoints[index]
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , checkMarkRef = makeCheckMarkRef(order)

    return [
      ...insertIf(hasBeenCompleted,
        <Line
          key={ checkMarkRef }
          ref={ c => this[checkMarkRef] = c  }
          { ...checkMarkStyle }
          points={ oneCheckMarkPoints }
        />
      )
    ]
  }

  renderArcFront = (lesson, index) => {
    const { mapDimensions, arcFrontStyles } = this.state
      , order = index + 1
      , arcFrontStyle = arcFrontStyles[index]
      , completionArcFrontRefText = makeArcFrontRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    return [
      <Arc
        key={ completionArcFrontRefText }
        ref={ c => this[completionArcFrontRefText] = c  }
        x={ x }
        y={ y }
        { ...arcFrontStyle }
      />
    ]
  }

  renderArcBack = (lesson, index) => {
    const { mapDimensions, arcStylesArcBack } = this.state
      , order = index + 1
      , arcBackStyle = arcStylesArcBack[index]
      , completionArcBackRefText = makeArcBackRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    return [
      <Arc
        key={ completionArcBackRefText }
        ref={ c => this[completionArcBackRefText] = c  }
        x={ x }
        y={ y }
        { ...arcBackStyle }
      />
    ]
  }

  renderText = (lesson, index) => {
    const { mapDimensions, bubbleAvailabilities, bubbleTextStyles, bubbleTextColors } = this.state
      , order = index + 1
      , bubbleTextStyle = bubbleTextStyles[index]
      , bubbleAvailability = bubbleAvailabilities[index]
      , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE
      , bubbleText = isAvailable ? order : null
      , bubbleTextColor = bubbleTextColors[index]
      , bubbleTextRef = makeBubbleTextRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    return [
      <Text // Lesson Bubble Text
        key={ bubbleTextRef }
        ref={ c => this[bubbleTextRef] = c  }
        x={ x }
        y={ y }
        text={ bubbleText }
        { ...bubbleTextStyle }
        fill={ bubbleTextColor }
      />
    ]
  }

  renderBubble = (lesson, index) => {
    const { mapDimensions, bubbleStyles } = this.state
      , order = index + 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleRef = makeBubbleRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    return [
      <Circle // Lesson Bubble
        key={ bubbleRef }
        ref={ c => this[bubbleRef] = c  }
        x={ x }
        y={ y }
        { ...bubbleStyle }
      />
    ]
  }

  displayMessage = (i, bool, message) => {
    const { textTagMessages } = this.state
      , newTextTagMessages = cloneDeep(textTagMessages)
    newTextTagMessages[i] = { display: bool, message }
    this.setState({ textTagMessages: newTextTagMessages })
  }

  render() {
    const { mapLessons, width } = this.props
    const { mapDimensions, tagStyles, tagTextStyles, textTagMessages } = this.state

    const lessonsAssets = mapLessons.reduce((acc, lesson, i) => {
      const order = i + 1
      acc.push([
        <LessonLabel
          key={ `lesson-label-${i}` }
          index={ i }
          width={ width }
          mapDimensions={ mapDimensions }
          x={ mapDimensions[`CIRCLE_${order}_X`] }
          y={ mapDimensions[`CIRCLE_${order}_Y`] }
          tagStyle={ tagStyles[i] }
          tagTextStyle={ tagTextStyles[i] }
          textTagMessage={ textTagMessages[i] }
        />
        , ...this.renderBubble(lesson, i)
        , ...this.renderText(lesson, i)
        , ...this.renderArcBack(lesson, i)
        , ...this.renderArcFront(lesson, i)
        , ...this.renderLock(lesson, i)
        , ...this.renderCheckMark(lesson, i)
        , ...this.renderLessonTransparentBubble(lesson, i)
      ])
      return acc
    }, [])

    return <Layer>{ lessonsAssets }</Layer>
  }
}

export default MapItems
