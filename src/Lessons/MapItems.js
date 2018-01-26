import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Layer } from 'react-konva'
import { get, isEqual } from 'lodash'

import { LESSON_MAP_POINTS } from '../constants'
import insertIf from '../utils/insertIf'
import LessonLabel from './Assets/LessonLabel'
import LessonBubble from './Assets/LessonBubble'
import LessonText from './Assets/LessonText'
import LessonArcBack from './Assets/LessonArcBack'
import LessonArcFront from './Assets/LessonArcFront'
import Lock from './Assets/Lock'
import CheckMark from './Assets/CheckMark'
import LessonTransparentBubble from './Assets/LessonTransparentBubble'

const bubbleStates = {
  AVAILABLE: 'AVAILABLE'
  , LOCKED: 'LOCKED'
}

const calculateBubbleAvailabilities = (mapLessons, latestActiveLessonId) => {
  let pastLatestActiveLessonId = false
  return mapLessons.map(e => {
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

class MapItems extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bubbleAvailabilities: props.mapLessons.map((_, i) => i + 1)
      , selectedLessonOrder: -1
      , hoveredLessonOrder: -1
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
  }

  componentWillReceiveProps(nextProps) {
    const { mapLessons, latestActiveLessonId } = this.props
        , { mapLessons: nextMapLessons, latestActiveLessonId: nextLatestActiveLessonId } = nextProps
        , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
        , latestActiveLessonIdHasChanged = !isEqual(latestActiveLessonId, nextLatestActiveLessonId)

    if(latestActiveLessonIdHasChanged || mapLessonsHasChanged)
      this.setBubbleAvailabilities(nextMapLessons, nextLatestActiveLessonId)
  }

  setStateAsync = (newState) =>
    new Promise((resolve) => {
      this.setState(newState, resolve)
    })

  setBubbleAvailabilities = (mapLessons, latestActiveLessonId) =>
    this.setState({ bubbleAvailabilities: calculateBubbleAvailabilities(mapLessons, latestActiveLessonId) })

  setSelectedLessonOrder = (selectedLessonOrder) =>
    this.setState({ selectedLessonOrder })

  setHoveredLessonOrder = (hoveredLessonOrder) =>
    this.setState({ hoveredLessonOrder })

  handleLessonBubbleClick = (e, lesson, order, isAvailable) => {
    if(isAvailable) {
      this.props.onLessonSelect(e, lesson._id)
      this.setSelectedLessonOrder(order)
    }
  }

  handleMouseOver = (e, order, isAvailable, isSelected) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    if(isAvailable)
      this.props.handleMouseOver()
    if(!isSelected)
      this.setHoveredLessonOrder(order)
  }

  handleMouseOut = (e) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    this.props.handleMouseOut()
    this.setHoveredLessonOrder(-1)
  }

  render() {
    const { mapLessons, width } = this.props
    const { selectedLessonOrder, hoveredLessonOrder, bubbleAvailabilities } = this.state

    const lessonsAssets = mapLessons.reduce((acc, lesson, i) => {
      const order = i + 1
        , isSelected = selectedLessonOrder === order
        , isHovered = hoveredLessonOrder === order
        , x = LESSON_MAP_POINTS[`CIRCLE_${order}_X`]
        , y = LESSON_MAP_POINTS[`CIRCLE_${order}_Y`]
        , wasJustCompleted = get(lesson, 'justCompleted', false)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
        , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0) / 100
        , percentageToUse = hasBeenCompleted ? 1.00 : completionPercentage
        , arcFrontAngle = percentageToUse * 360
        , bubbleAvailability = bubbleAvailabilities[i]
        , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE
        , message = isHovered ? isAvailable ? lesson.title : 'Not unlocked yet!' : ''

      const clickProps = {
        onClick: (e) => this.handleLessonBubbleClick(e, lesson, order, isAvailable)
        , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order, isAvailable)
        , onMouseOver: (e) => this.handleMouseOver(e, order, isAvailable, isSelected)
        , onMouseOut: this.handleMouseOut
      }

      acc.push([
        <LessonLabel
          key={ `lesson-label-${i}` }
          index={ i }
          width={ width }
          x={ x }
          y={ y }
          message={ message }
        />
        ,
        <LessonBubble
          key={ `lesson-bubble-${i}` }
          x={ x }
          y={ y }
          isSelected={ isSelected }
        />
        ,
        <LessonText
          key={ `lesson-text-${i}` }
          bubbleText={ isAvailable ? order : '' }
          x={ x }
          y={ y }
          isSelected={ isSelected }
          wasJustCompleted={ wasJustCompleted }
          hasBeenCompleted={ hasBeenCompleted }
        />
        ,
        <LessonArcBack
          key={ `lesson-arc-back-${i}` }
          x={ x }
          y={ y }
          isSelected={ isSelected }
        />
        ,
        <LessonArcFront
          key={ `lesson-arc-front-${i}` }
          x={ x }
          y={ y }
          isSelected={ isSelected }
          hasBeenCompleted={ hasBeenCompleted }
          wasJustCompleted={ wasJustCompleted }
          angle={ arcFrontAngle }
        />
        ,
        ...insertIf(!isAvailable,
          <Lock
            key={ `lesson-lock-${i}` }
            x={ x }
            y={ y }
          />
        )
        ,
        ...insertIf(hasBeenCompleted,
          <CheckMark
            key={ `lesson-checkmark-${i}` }
            x={ x }
            y={ y }
            isSelected={ isSelected }
          />
        )
        ,
        <LessonTransparentBubble
          key={ `lesson-transparent-bubble-${i}` }
          x={ x }
          y={ y }
          isSelected={ isSelected }
          clickProps={ clickProps }
        />
      ])
      return acc
    }, [])

    return <Layer>{ lessonsAssets }</Layer>
  }
}

export default MapItems
