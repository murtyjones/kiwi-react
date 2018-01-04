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
    , makeCompletionLayer1RefText = (order) => `circle-completion-layer-1-${order}`
    , makeCompletionLayer2Ref = (order) => `circle-completion-layer-2-${order}`
    , makeCompletionRefArray = (completionLayerRefText) => [...Array(6)].map((x, i) => `${completionLayerRefText}-${i}`)
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
      mapLessons: []
      , mapDimensions: LESSON_MAP_POINTS(props.width)
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
    , selectedLessonId: T.string
  }

  componentWillMount() {
    const { mapLessons, selectedLessonId } = this.props
    this.setAllStyles(mapLessons)
    this.setMapLessons(mapLessons, selectedLessonId)
  }

  componentWillReceiveProps(nextProps) {
    const { mapLessons, selectedLessonId } = this.props
        , { mapLessons: nextMapLessons, selectedLessonId: nextSelectedLessonId } = nextProps
        , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
        , selectedLessonIdHasChanged = selectedLessonId !== nextSelectedLessonId

    if(mapLessonsHasChanged) {
      this.setAllStyles(nextMapLessons)
    }

    if(mapLessonsHasChanged || selectedLessonIdHasChanged) {
      this.setMapLessons(nextMapLessons, nextSelectedLessonId)
    }
  }

  componentWillUpdate(_, nextState) {
    const { mapLessons } = this.state
        , { mapLessons: nextMapLessons } = nextState
        , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)

    if(mapLessonsHasChanged) {
      this.handleLessonStateChange(nextMapLessons)
    }
  }

  handleLessonStateChange = (mapLessons) =>
    mapLessons.forEach((lesson, index) => {
      const order = lesson.order
        , wasJustCompleted = lesson.justCompleted
        , completionPercentage = get(lesson, 'userLesson.completionPercentage', null)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
        , hasBeenStarted = has(lesson, 'userLesson')
        , bubbleRef = makeBubbleRef(order)
        , completionLayerRefText = makeCompletionLayer1RefText(order)
        , completionRefs = makeCompletionRefArray(completionLayerRefText)
        , bubbleTextRef = makeBubbleTextRef(order)
        , checkMarkBubbleRef = makeCheckMarkBubbleRef(order)
        , checkMarkRef = makeCheckMarkRef(order)

      if(wasJustCompleted) {
        setTimeout(() => {
          this.handleBubbleSelectionScaling(lesson)
          this.setSelectedLesson(lesson)
        }, 500)
      }
    })

  pageLoadActions = (mapLessons) => {
    mapLessons.forEach((lesson, index) => {
      const order = index + 1
        , wasJustCompleted = lesson.justCompleted
        , completionPercentage = get(lesson, 'userLesson.completionPercentage', null)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
        , hasBeenStarted = has(lesson, 'userLesson')
        , bubbleRef = makeBubbleRef(order)
        , completionLayerRefText = makeCompletionLayer1RefText(order)
        , completionRefs = makeCompletionRefArray(completionLayerRefText)
        , bubbleTextRef = makeBubbleTextRef(order)
        , checkMarkBubbleRef = makeCheckMarkBubbleRef(order)
        , checkMarkRef = makeCheckMarkRef(order)
      if(wasJustCompleted) {
        setTimeout(() => {
          this.scaleItems(
            [bubbleRef, bubbleTextRef, ...completionRefs]
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

  setAllStyles = (mapLessons) =>
    this.setState({
      bubbleStyles: mapLessons.map((_, i) => shapeProps.defaultBubbleStyle)
      , bubbleTextStyles: mapLessons.map((_, i) => shapeProps.defaultBubbleTextStyle)
    })

  setSelectedLesson = (lesson) => {
    const order = lesson.order
    const { bubbleStyles, bubbleTextStyles } = this.state
      , copyOfCurrentBubbleStyles =  cloneDeep(bubbleStyles)
      , copyOfCurrentBubbleTextStyles = cloneDeep(bubbleTextStyles)
      , bubbleRef = makeBubbleRef(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkBubbleRef = makeCheckMarkBubbleRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , completionLayerRefText = makeCompletionLayer1RefText(order)
      , completionRefs = makeCompletionRefArray(completionLayerRefText)
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', 0)

    this.setState({
      bubbleStyles: copyOfCurrentBubbleStyles.map((_, i) => {
        return (i === order - 1) ? shapeProps.selectedBubbleStyle : shapeProps.defaultBubbleStyle
      })
      , bubbleTextStyles: copyOfCurrentBubbleTextStyles.map((_, i) => {
        return (i === order - 1) ? shapeProps.selectedBubbleTextStyle : shapeProps.defaultBubbleTextStyle
      })
      , selectedBubbleRef: bubbleRef
      , selectedBubbleTextRef: bubbleTextRef
      , selectedCompletionRefs: completionRefs
      , selectedBubbleHasBeenCompleted: hasBeenCompleted
      , selectedCheckMarkBubbleRef: checkMarkBubbleRef
      , selectedCheckMarkRef: checkMarkRef
    })
  }

  setMapLessons = (mapLessons, selectedLessonId) =>
    this.setState({ mapLessons:
      mapLessons.reduce((acc, lesson, i) => {
        const order = i + 1
        const isSelected = isLessonSelected(lesson, selectedLessonId)
        acc.push({ ...lesson, order, isSelected })
        return acc
      }, [])
    })

  handleBubbleSelectionScaling = (lesson) => {
    const { selectedBubbleRef, selectedBubbleTextRef, selectedCheckMarkBubbleRef, selectedCheckMarkRef, selectedBubbleHasBeenCompleted, selectedCompletionRefs } = this.state
      , order = lesson.order
      , bubbleRef = makeBubbleRef(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkBubbleRef = makeCheckMarkBubbleRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , completionLayerRefText = makeCompletionLayer1RefText(order)
      , completionRefs = makeCompletionRefArray(completionLayerRefText)
      , shouldHaveCheckMark = get(lesson, 'userLesson.hasBeenCompleted', 0)

    let itemsRef

    if(selectedBubbleRef && selectedBubbleTextRef) {
      itemsRef = [selectedBubbleRef, selectedBubbleTextRef, ...selectedCompletionRefs]
      if(selectedBubbleHasBeenCompleted) {
        itemsRef.push(selectedCheckMarkBubbleRef)
        itemsRef.push(selectedCheckMarkRef)
      }
      this.scaleItems(itemsRef, scaleDown)
    }


    itemsRef = [bubbleRef, bubbleTextRef, ...completionRefs]
    // if(shouldHaveCheckMark) {
    //   itemsRef.push(checkMarkBubbleRef)
    //   itemsRef.push(checkMarkRef)
    // }

    this.scaleItems(itemsRef, scaleUp)
  }

  scaleItems = (itemRefs, scaleProps) =>
    itemRefs.forEach(eachRef => {
      if(this.refs[eachRef])
        this.refs[eachRef].to({...scaleProps}/*must be passed with this strange destruction*/)
    })

  handleLessonBubbleClick = (e, lesson) => {
    this.props.onLessonSelect(e, lesson._id)
    this.handleBubbleSelectionScaling(lesson)
    this.setSelectedLesson(lesson)
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

  renderLessonBubble = (lesson) => {
    const { handleMouseOver, handleMouseOut } = this.props
      , { mapDimensions, bubbleStyles, bubbleTextStyles } = this.state
      , order = lesson.order
      , index = order - 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleTextStyle = bubbleTextStyles[index]
      , hasBeenStarted = has(lesson, 'userLesson')
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , bubbleRef = makeBubbleRef(order)
      , completionLayer1RefText = makeCompletionLayer1RefText(order)
      , bubbleTextRef = makeBubbleTextRef(order)
      , checkMarkRef = makeCheckMarkRef(order)
      , x = mapDimensions[`CIRCLE_${order}_X`]
      , y = mapDimensions[`CIRCLE_${order}_Y`]

    const clickProps = {
      onClick: (e) => this.handleLessonBubbleClick(e, lesson)
      , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson)
      , onMouseOver: this.handleMouseOver
      , onMouseOut: this.handleMouseOut
    }

    let conditional = []

    if(hasBeenCompleted) conditional.push(
      <Path // CheckMark Bubble Text
        key={ checkMarkRef }
        ref={ checkMarkRef }
        x={ x }
        y={ y }
        { ...clickProps }
        { ...shapeProps.checkMarkStyle }
      />
    )

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
          key={ `${completionLayer1RefText}-${i}` }
          ref={ `${completionLayer1RefText}-${i}` }
          x={ x }
          y={ y }
          { ...clickProps }
          { ...shapeProps.arcStyle }
          { ...shapeProps.artAddPoints[i] }
        />
      )
      ,
      ...conditional
    ]
  }

  render() {
    const { mapLessons } = this.state

    return mapLessons.reduce((acc, lesson, i) => {
      acc.push(...this.renderLessonBubble(lesson, lesson.order, lesson.isSelected))
      return acc
    }, [])
  }
}

export default MapBubbles
