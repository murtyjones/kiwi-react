import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path, Arc } from 'react-konva'
import { has, get, find, findIndex, cloneDeep, isEqual } from 'lodash'

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
  , activeFillColor: '#664C93' // #40305E
  , inactiveFillColor: '#664C93'
  , activeTextColor: '#FFFFFF'
  , inactiveTextColor: '#FFFFFF'
  , checkMarkCircleColor: '#abd698'
  , checkMarkColor: '#FFFFFF'
  , completionLayer1Color: '#7E5DB8'
}

const makeBubbleRef = (order) => `circle-${order}`
  , makeBubbleTextRef = (order) => `text-${order}`
  , makeCompletionLayer1Ref = (order) => `circle-completion-layer-1-${order}`
  , makeCompletionLayer2Ref = (order) => `circle-completion-layer-2-${order}`
  , makeCheckMarkBubbleRef = (order) => `checkMark-bubble-${order}`
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
  checkMarkBubbleStyle: {
    offsetX: -20
    , offsetY: 20
    , width: 17
    , height: 17
    , fill: colors.checkMarkCircleColor

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
    , fill: colors.completionLayer1Color
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
      , selectedCheckMarkBubbleRef: ''
      , selectedCheckMarkRef: ''
    }
  }

  static propTypes = {
    onLessonSelect: T.func.isRequired
    , handleMouseOver: T.func.isRequired
    , handleMouseOut: T.func.isRequired
    , mapLessons: T.array.isRequired
  }

  componentDidMount() {
    this.pageLoadActions(this.props.mapLessons)
  }

  componentWillMount() {
    this.pageLoadActions(this.props.mapLessons)
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.mapLessons, nextProps.mapLessons)) {
      this.setState({
        bubbleStyles: nextProps.mapLessons.map((_, i) => shapeProps.defaultBubbleStyle)
        , bubbleTextStyles: nextProps.mapLessons.map((_, i) => shapeProps.defaultBubbleTextStyle)
      })
      this.pageLoadActions(nextProps.mapLessons)
    }
  }

  pageLoadActions = (mapLessons) => {
    mapLessons.forEach((lesson, index) => {
      const order = index + 1
        , wasJustCompleted = lesson.justCompleted
        , completionPercentage = get(lesson, 'userLesson.completionPercentage', null)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
        , hasBeenStarted = has(lesson, 'userLesson')
        , bubbleRef = makeBubbleRef(order)
        , completionRef = makeCompletionLayer1Ref(order)
        , bubbleTextRef = makeBubbleTextRef(order)
        , checkMarkBubbleRef = makeCheckMarkBubbleRef(order)
        , checkMarkRef = makeCheckMarkRef(order)
      if(wasJustCompleted) {
        setTimeout(() => {
          this.scaleItems(
            [bubbleRef]
            , scaleUp
          )
        }, 500)
      } else if(hasBeenCompleted) {
          this.scaleItems(
            [checkMarkBubbleRef, checkMarkRef]
            , {
              scaleX: 1,
              scaleY: 1,
              duration: 0
            })
      } else {
        this.scaleItems(
          [checkMarkBubbleRef, checkMarkRef]
          , {
            scaleX: 0,
            scaleY: 0,
            duration: 0
          }
        )
      }
      // if(this.refs[completionRef] && completionPercentage) {
      //   console.log(completionPercentage)
      //   this.refs[completionRef].to({
      //     angle: calculateNewAngle(completionPercentage),
      //     duration: 1.0
      //   })
      // }
    })
  }

  scaleItems = (itemRefs, scaleProps) => {
    itemRefs.forEach(eachRef => {
      if(this.refs[eachRef])
        this.refs[eachRef].to({...scaleProps})
    })
  }

  handleLessonBubbleClick = (e, lesson, order) => {
    const { bubbleStyles, bubbleTextStyles, selectedBubbleRef, selectedBubbleTextRef, selectedCheckMarkBubbleRef, selectedCheckMarkRef, selectedBubbleHasBeenCompleted, selectedCompletionRef } = this.state
      , bubbleRef = makeBubbleRef(order)
      , completionRef = makeCompletionLayer1Ref(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkBubbleRef = makeCheckMarkBubbleRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , completionRefs = [...Array(6)].map((x, i) => `${completionRef}-${i}`)
      , selectedCompletionRefs = [...Array(6)].map((x, i) => `${selectedCompletionRef}-${i}`)
      , newBubbleStyles =  cloneDeep(bubbleStyles)
      , newBubbleTextStyles = cloneDeep(bubbleTextStyles)
      , hasBeenStarted = has(lesson, 'userLesson')
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', 0)


    this.props.onLessonSelect(e, lesson._id)

    if(selectedBubbleRef && selectedBubbleTextRef) {
      const itemsRef = [selectedBubbleRef, selectedBubbleTextRef, ...selectedCompletionRefs]
      if(selectedBubbleHasBeenCompleted) {
        itemsRef.push(selectedCheckMarkBubbleRef)
        itemsRef.push(selectedCheckMarkRef)
      }
      this.scaleItems(itemsRef, scaleDown)
    }

    this.setState({
      bubbleStyles: newBubbleStyles.map((_, i) => {
        return (i === order - 1) ? shapeProps.selectedBubbleStyle : shapeProps.defaultBubbleStyle
      }),
      bubbleTextStyles: newBubbleTextStyles.map((_, i) => {
        return (i === order - 1) ? shapeProps.selectedBubbleTextStyle : shapeProps.defaultBubbleTextStyle
      })
      , selectedBubbleRef: bubbleRef
      , selectedBubbleTextRef: bubbleTextRef
      , selectedCompletionRef: completionRef
      , selectedBubbleHasBeenCompleted: hasBeenCompleted
      , selectedCheckMarkBubbleRef: checkMarkBubbleRef
      , selectedCheckMarkRef: checkMarkRef
    })

    const _itemsRef = [bubbleRef, bubbleTextRef, ...completionRefs]
    if(hasBeenCompleted) {
      _itemsRef.push(checkMarkBubbleRef)
      _itemsRef.push(checkMarkRef)
    }

    this.scaleItems(_itemsRef, scaleUp)
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

  renderLessonBubble = (lesson, order, isSelected) => {
    const { handleMouseOver, handleMouseOut } = this.props
      , { mapDimensions, bubbleStyles, bubbleTextStyles } = this.state
      , index = order - 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleTextStyle = bubbleTextStyles[index]
      , hasBeenStarted = has(lesson, 'userLesson')
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', 0)
      , bubbleRef = makeBubbleRef(order)
      , completionLayer1Ref = makeCompletionLayer1Ref(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkBubbleRef = makeCheckMarkBubbleRef(order)
      , checkMarkRef = makeCheckMarkRef(order)

      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    const clickProps = {
      onClick: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order)
      , onMouseOver: this.handleMouseOver
      , onMouseOut: this.handleMouseOut
    }
    
    // if(hasBeenStarted) {
      // if(completionPercentage === 100) {

      // } else {

        // partial border styling
        // delete(bubbleStyle.fill)
        // const variance = bubbleStyle.height / 100
        // const offset = bubbleStyle.height/2
        // const gradStartPt = -1 * (completionPercentage * variance - offset)
        // bubbleStyle.fillLinearGradientStartPoint={y: gradStartPt}
        // bubbleStyle.fillLinearGradientEndPoint={y : gradStartPt + .01}
        // bubbleStyle.fillLinearGradientColorStops=
        // [0, colors.inactiveFillColor, 1, colors.activeFillColor]
    //   }
    // }

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
          key={ `${completionLayer1Ref}-${i}` }
          ref={ `${completionLayer1Ref}-${i}` }
          x={ x }
          y={ y }
          { ...clickProps }
          { ...shapeProps.arcStyle }
          { ...shapeProps.artAddPoints[i] }
        />
      )
      ,
      <Circle // CheckMark Bubble
        key={ checkMarkBubbleRef }
        ref={ checkMarkBubbleRef }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...shapeProps.checkMarkBubbleStyle }
      />
      ,
      <Path // CheckMark Bubble Text
        key={ checkMarkRef }
        ref={ checkMarkRef }
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
