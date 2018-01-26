import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path, Arc, Line, Rect, Label, Tag, Layer } from 'react-konva'
import { has, get, find, findIndex, cloneDeep, isEqual, isEmpty } from 'lodash'
import update from 'immutability-helper'

import { LESSON_MAP_POINTS, SVG_PATHS } from '../constants'
import insertIf from '../utils/insertIf'
import setTimeoutAsync from '../utils/setTimeoutAsync'
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

const makeTagRef = order => `tag-${order}`

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
      mapDimensions: LESSON_MAP_POINTS(props.width, props.height)
      , bubbleAvailabilities: props.mapLessons.map((_, i) => i + 1)
      , selectedTagRef: ''
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
    const { mapLessons, latestActiveLessonId, width, height } = this.props
        , { mapLessons: nextMapLessons, latestActiveLessonId: nextLatestActiveLessonId, width: nextWidth, height: nextHeight } = nextProps
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

  setSelectedLesson = (lesson, order) =>
    this.setState({
      selectedLessonOrder: order
      , selectedTagRef: makeTagRef(order)
    })


  handleLessonBubbleClick = (e, lesson, order) => {
    const { bubbleAvailabilities } = this.state
      , i = order - 1
      , isAvailable = bubbleAvailabilities[i] === bubbleStates.AVAILABLE

    if(isAvailable) {
      this.props.onLessonSelect(e, lesson._id)
      this.setSelectedLesson(lesson, order)
    }
  }

  handleMouseOver = (e, lesson, order, isAvailable) => {
    e.cancelBubble = true
    e.evt.preventDefault()
    const { selectedTagRef } = this.state
      , tagRef = makeTagRef(order)
      , isAlreadySelected = selectedTagRef === tagRef
    let message = isAvailable ? lesson.title : 'Not unlocked yet!'
    if(isAvailable)
      this.props.handleMouseOver()
    if(!isAlreadySelected)
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
    const { mapDimensions, textTagMessages, selectedLessonOrder, bubbleAvailabilities } = this.state

    const lessonsAssets = mapLessons.reduce((acc, lesson, i) => {
      const order = i + 1
        , isSelected = selectedLessonOrder === order
        , x = mapDimensions[`CIRCLE_${order}_X`]
        , y = mapDimensions[`CIRCLE_${order}_Y`]
        , wasJustCompleted = get(lesson, 'justCompleted', false)
        , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
        , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0) / 100
        , percentageToUse = hasBeenCompleted ? 1.00 : completionPercentage
        , arcFrontAngle = percentageToUse * 360
        , bubbleAvailability = bubbleAvailabilities[i]
        , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE

      const clickProps = {
        onClick: (e) => this.handleLessonBubbleClick(e, lesson, order)
        , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order)
        , onMouseOver: (e) => this.handleMouseOver(e, lesson, order, isAvailable)
        , onMouseOut: (e) => this.handleMouseOut(e, lesson, order)
      }

      acc.push([
        <LessonLabel
          key={ `lesson-label-${i}` }
          index={ i }
          width={ width }
          mapDimensions={ mapDimensions }
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
