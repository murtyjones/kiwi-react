import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { get, isEqual, isEmpty, cloneDeep } from 'lodash'
import cns from 'classnames'
import CircularProgressbar from 'react-circular-progressbar'

import { LESSON_MAP_POINTS } from '../constants'
import insertIf from '../utils/insertIf'

const bubbleStates = {
  AVAILABLE: 'AVAILABLE'
  , LOCKED: 'LOCKED'
}

const styles = {
  container: {
    width: '100%'
    , minHeight: '100%'
    , paddingBottom: '100%'
  },
  mapBubbleContainer: {
    position: 'absolute'
  }
}

const generateStatefulMapLessons = (mapLessons, selectedLessonOrder, hoveredLessonOrder, bubbleAvailabilities) =>
  (mapLessons ||[]).reduce((acc, lesson, i) => {
    const order = i + 1
      , isSelected = selectedLessonOrder === order
      , isHovered = hoveredLessonOrder === order
      , x = LESSON_MAP_POINTS[`CIRCLE_${order}_X`]
      , y = LESSON_MAP_POINTS[`CIRCLE_${order}_Y`]
      , wasJustCompleted = get(lesson, 'justCompleted', false)
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0)
      , bubbleAvailability = bubbleAvailabilities[i]
      , isAvailable = bubbleAvailability === bubbleStates.AVAILABLE
      , message = isAvailable ? lesson.title : 'Not unlocked yet!'
    acc.push({
      ...lesson
      , order
      , isSelected
      , isHovered
      , x
      , y
      , wasJustCompleted
      , hasBeenCompleted
      , completionPercentage
      , bubbleAvailability
      , isAvailable
      , message
    })
    return acc
  }, [])


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
      , statefulMapLessons: props.mapLessons.map(_ => {})
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

  componentWillUpdate(nextProps, nextState) {
    const { mapLessons } = this.props
    const { selectedLessonOrder, hoveredLessonOrder, bubbleAvailabilities } = this.state
    const { mapLessons: nextMapLessons } = nextProps
    const { selectedLessonOrder: nextSelectedLessonOrder, hoveredLessonOrder: nextHoveredLessonOrder, bubbleAvailabilities: nextBubbleAvailabilities } = nextState
    const mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
    const selectedLessonOrderHasChanged = !isEqual(selectedLessonOrder, nextSelectedLessonOrder)
    const hoveredLessonOrderHasChanged = !isEqual(hoveredLessonOrder, nextHoveredLessonOrder)
    const bubbleAvailabilitiesHasChanged = !isEqual(bubbleAvailabilities, nextBubbleAvailabilities)
    const needsRemapping = nextState.statefulMapLessons[0] === undefined

    if(needsRemapping || mapLessonsHasChanged || selectedLessonOrderHasChanged || hoveredLessonOrderHasChanged || bubbleAvailabilitiesHasChanged)
      this.setStatefulMapLessons(nextMapLessons, nextSelectedLessonOrder, nextHoveredLessonOrder, nextBubbleAvailabilities)
  }

  setStateAsync = (newState) => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  setStatefulMapLessons = (...params) =>
    this.setState({ statefulMapLessons: generateStatefulMapLessons(...params) })

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

  handleLessonBubbleBlur = (e, lesson, order, isAvailable) => {
    if(isAvailable) {
      this.props.onLessonSelect(e, null)
      this.setSelectedLessonOrder(null)
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
    const { statefulMapLessons } = this.state

    const lessonsAssets = statefulMapLessons.reduce((acc, lesson, i) => {
      if(isEmpty(lesson)) return null

      const { order, isAvailable, isSelected, x, y, message, wasJustCompleted, hasBeenCompleted, completionPercentage } = lesson

      const clickProps = {
        onClick: (e) => this.handleLessonBubbleClick(e, lesson, order, isAvailable)
        , onBlur: (e) => this.handleLessonBubbleBlur(e, lesson, order, isAvailable)
        , onTouchEnd: (e) => this.handleLessonBubbleClick(e, lesson, order, isAvailable)
        , onMouseOver: (e) => this.handleMouseOver(e, order, isAvailable, isSelected)
        , onMouseOut: this.handleMouseOut
      }

      acc.push([
        <div
          key={ i }
          onClick={ clickProps.onClick }
          onBlur={ clickProps.onBlur }
          style={ {
            ... styles.mapBubbleContainer
            , left: x
            , top: y
          } }
        >
          <div
            key={ `map-bubble-container-${i}` }
            className='map-bubble-container'
          >
            <div
              className='lesson-progress'
              onClick={ clickProps.onClick }
              onBlur={ clickProps.onBlur }
            >
              <CircularProgressbar
                percentage={ completionPercentage }
                initialAnimation={ true }
              />
            </div>
            <div key='label' className='map-bubble-label'>
              <h2>{ message }</h2>
            </div>
            <button key='map-bubble' className='map-bubble'>
              <h1 className={ cns({ 'done': hasBeenCompleted }) }>{ order }</h1>
            </button>
          </div>
        </div>
      ])
      return acc
    }, [])

    return (
      <div style={ styles.container }>
        { lessonsAssets }
      </div>
    )
  }
}

export default MapItems
