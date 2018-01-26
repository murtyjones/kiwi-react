import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path, Arc, Line, Rect, Label, Tag, Layer } from 'react-konva'
import { has, get, find, findIndex, cloneDeep, isEqual, isEmpty } from 'lodash'
import update from 'immutability-helper'

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

class MapItems extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bubbleAvailabilities: props.mapLessons.map((_, i) => i + 1)
      , labels: []
      , shouldDisplayMessage: false
      , textTagMessages: props.mapLessons.map(_ => '')
      , selectedLessonOrder: -1
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

  setStateAsync = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, resolve)
    });
  }

  setBubbleAvailabilities = (mapLessons, latestActiveLessonId) =>
    this.setState({ bubbleAvailabilities: calculateBubbleAvailabilities(mapLessons, latestActiveLessonId) })

  setSelectedLessonOrder = (selectedLessonOrder) =>
    this.setState({ selectedLessonOrder })


  handleLessonBubbleClick = (e, lesson, order, isAvailable) => {
    if(isAvailable) {
      this.props.onLessonSelect(e, lesson._id)
      this.setSelectedLessonOrder(order)
    }
  }

  handleMouseOver = (e, lesson, order, isAvailable, isSelected) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    let message = isAvailable ? lesson.title : 'Not unlocked yet!'
    if(isAvailable)
      this.props.handleMouseOver()
    if(!isSelected)
      this.displayMessage(order - 1, message)
  }

  handleMouseOut = (e, lesson, order) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    this.props.handleMouseOut()
    this.displayMessage(order - 1, '')
  }

  displayMessage = (i, message) => {
    const { textTagMessages } = this.state
      , newTextTagMessages = cloneDeep(textTagMessages)
    newTextTagMessages[i] = message
    this.setState({ textTagMessages: newTextTagMessages })
  }

  render() {
    const { mapLessons, width } = this.props
    const { textTagMessages, selectedLessonOrder, bubbleAvailabilities } = this.state

    const lessonsAssets = mapLessons.reduce((acc, lesson, i) => {
      const order = i + 1
        , isSelected = selectedLessonOrder === order
        , x = LESSON_MAP_POINTS[`CIRCLE_${order}_X`]
        , y = LESSON_MAP_POINTS[`CIRCLE_${order}_Y`]
        , wasJustCompleted = get(lesson, 'justCompleted', false)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
        , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0) / 100
        , percentageToUse = hasBeenCompleted ? 1.00 : completionPercentage
        , arcFrontAngle = percentageToUse * 360
        , bubbleAvailability = bubbleAvailabilities[i]
        , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE

      const clickProps = {
        onClick: (e) => this.handleLessonBubbleClick(e, lesson, order, isAvailable)
        , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order, isAvailable)
        , onMouseOver: (e) => this.handleMouseOver(e, lesson, order, isAvailable, isSelected)
        , onMouseOut: (e) => this.handleMouseOut(e, lesson, order)
      }

      acc.push([
        <LessonLabel
          key={ `lesson-label-${i}` }
          index={ i }
          width={ width }
          x={ x }
          y={ y }
          textTagMessage={ textTagMessages[i] }
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
