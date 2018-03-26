import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { get, find, findIndex, isEqual, isEmpty, cloneDeep } from 'lodash'

import { animateScroll as scroll } from 'react-scroll'

import { LESSON_MAP_POINTS } from '../constants'
import setTimeoutAsync from '../utils/setTimeoutAsync'
import insertIf from '../utils/insertIf'
import { GLOBAL_COLORS } from '../constants'
import MapBubble from './MapBubble'

const bubbleStates = {
  AVAILABLE: 'AVAILABLE'
  , LOCKED: 'LOCKED'
}

const styles = {
  container: {
    width: '100%'
    , minHeight: '100%'
    , paddingBottom: '100%'
  }
}

const generateStatefulMapLessons = (mapLessons, selectedLessonOrder, hoveredLessonOrder, bubbleAvailabilities, lessonThemesById) =>
  (mapLessons ||[]).reduce((acc, lesson, i) => {
    const order = i + 1
      , isSelected = selectedLessonOrder === order
      , isHovered = hoveredLessonOrder === order
      , x = LESSON_MAP_POINTS[`CIRCLE_${order}_X`]
      , y = LESSON_MAP_POINTS[`CIRCLE_${order}_Y`]
      , goToPoint = LESSON_MAP_POINTS[`CIRCLE_${order}_GOTO`]
      , isLeftLabel = x > 50
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0)
      , bubbleAvailability = bubbleAvailabilities[i]
      , isAvailable = hasBeenCompleted || bubbleAvailability === bubbleStates.AVAILABLE
      , message = isAvailable ? lesson.title : 'Locked!'
      , lessonThemeName = get(lessonThemesById, `${lesson.themeId}.name`, '').toLowerCase()
      , lessonTheme = GLOBAL_COLORS[lessonThemeName]

    acc.push({
      ...lesson
      , order
      , isSelected
      , isHovered
      , x
      , y
      , goToPoint
      , isLeftLabel
      , hasBeenCompleted
      , completionPercentage
      , bubbleAvailability
      , isAvailable
      , message
      , lessonTheme
    })
    return acc
  }, [])


const calculateBubbleAvailabilities = (mapLessons, activeLessonId) => {
  let pastActiveLessonId = false
  return mapLessons.map(e => {
    if(!pastActiveLessonId && e._id !== activeLessonId) {
      return bubbleStates.AVAILABLE
    } else if(!pastActiveLessonId && e._id === activeLessonId) {
      pastActiveLessonId = true
      return bubbleStates.AVAILABLE
    } else if(pastActiveLessonId) {
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
      , applyNextAnimation: false
      , applyJustCompletedAnimation: false
      , isAnimatingToSelected: false
    }
  }

  static propTypes = {
    onLessonSelect: T.func.isRequired
    , mapLessons: T.array.isRequired
    , selectedLessonId: T.string
    , activeLessonId: T.string
    , lessonJustCompletedId: T.string.isRequired
    , lessonThemesById: T.object
  }

  componentWillMount() {
    const { mapLessons, activeLessonId } = this.props
    this.setBubbleAvailabilities(mapLessons, activeLessonId)
  }

  componentWillReceiveProps(nextProps) {
    const {mapLessons, activeLessonId} = this.props
      , {mapLessons: nextMapLessons, activeLessonId: nextActiveLessonId} = nextProps
      , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
      , activeLessonIdHasChanged = !isEqual(activeLessonId, nextActiveLessonId)

    if(activeLessonIdHasChanged || mapLessonsHasChanged)
      this.setBubbleAvailabilities(nextMapLessons, nextActiveLessonId)
  }

  componentWillUpdate(nextProps, nextState) {
    const { mapLessons, activeLessonId, lessonJustCompletedId, lessonThemesById, selectedLessonId } = this.props
    const { selectedLessonOrder, hoveredLessonOrder, bubbleAvailabilities, statefulMapLessons } = this.state
    const { mapLessons: nextMapLessons, activeLessonId: nextActiveLessonId, lessonJustCompletedId: nextLessonJustCompletedId, lessonThemesById: nextLessonThemesById, selectedLessonId: nextSelectedLessonId } = nextProps
    const { selectedLessonOrder: nextSelectedLessonOrder, hoveredLessonOrder: nextHoveredLessonOrder, bubbleAvailabilities: nextBubbleAvailabilities, statefulMapLessons: nextStatefulMapLessons } = nextState
    const mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
    const selectedLessonOrderHasChanged = !isEqual(selectedLessonOrder, nextSelectedLessonOrder)
    const hoveredLessonOrderHasChanged = !isEqual(hoveredLessonOrder, nextHoveredLessonOrder)
    const bubbleAvailabilitiesHasChanged = !isEqual(bubbleAvailabilities, nextBubbleAvailabilities)
    const lessonThemesByIdHasChanged = !isEqual(lessonThemesById, nextLessonThemesById)
    const needsRemapping = nextState.statefulMapLessons[0] === undefined
    const activeLessonIdHasChanged = !isEqual(activeLessonId, nextActiveLessonId)
    const lessonJustCompletedIdHasChanged = !isEqual(lessonJustCompletedId, nextLessonJustCompletedId)
    const statefulMapLessonsHasChanged = !isEqual(statefulMapLessons, nextStatefulMapLessons)
    const selectedLessonIdHasChanged = !isEqual(selectedLessonId, nextSelectedLessonId)

    if(needsRemapping || mapLessonsHasChanged || selectedLessonOrderHasChanged || hoveredLessonOrderHasChanged || bubbleAvailabilitiesHasChanged || lessonThemesByIdHasChanged)
      this.setStatefulMapLessons(nextMapLessons, nextSelectedLessonOrder, nextHoveredLessonOrder, nextBubbleAvailabilities, nextLessonThemesById)
    if(selectedLessonIdHasChanged)
      this.goToSelectedLesson(nextSelectedLessonId, nextStatefulMapLessons)
    else if(!nextState.isAnimatingToSelected && (activeLessonIdHasChanged || lessonJustCompletedIdHasChanged || statefulMapLessonsHasChanged))
      this.goToActiveLesson(nextActiveLessonId, nextStatefulMapLessons, nextLessonJustCompletedId)
  }

  goToSelectedLesson = async (selectedLessonId, statefulMapLessons) => {
    await this.setStateAsync({ isAnimatingToSelected: true })
    const lesson = find(statefulMapLessons, { _id: selectedLessonId })
    await setTimeoutAsync(100)
    this.scrollTo(window.innerWidth * get(lesson, 'goToPoint', 0))
    await this.setStateAsync({ isAnimatingToSelected: false })
  }

  goToActiveLesson = async (activeLessonId, statefulMapLessons, lessonJustCompletedId) => {
    const i = findIndex(statefulMapLessons, { _id: activeLessonId })
    const currLesson = statefulMapLessons[i]
    const prevLesson = i > 0 ? statefulMapLessons[i-1] : {}
    const prevWasJustCompleted = prevLesson._id === lessonJustCompletedId

    // go to just completed lesson and trigger animation
    if(prevWasJustCompleted) {
      await setTimeoutAsync(150)
      this.scrollTo(window.innerWidth * get(prevLesson, 'goToPoint', 0))
      this.setState({ applyJustCompletedAnimation: true })
    }
    // go to next lesson
    await setTimeoutAsync(prevWasJustCompleted ? 4000 : 150)
    this.scrollTo(window.innerWidth * get(currLesson, 'goToPoint', 0))

    // trigger next lesson animation
    if(prevWasJustCompleted) {
      await setTimeoutAsync(600)
      this.setState({ applyNextAnimation: true })
    }
  }

  scrollTo = to => scroll.scrollTo(to)

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  setStatefulMapLessons = (...params) =>
    this.setState({ statefulMapLessons: generateStatefulMapLessons(...params) })

  setBubbleAvailabilities = (mapLessons, activeLessonId) =>
    this.setState({ bubbleAvailabilities: calculateBubbleAvailabilities(mapLessons, activeLessonId) })

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

  handleLessonBubbleBlur = (e, isAvailable) => {
    if(isAvailable) {
      this.props.onLessonSelect(e, null)
      this.setSelectedLessonOrder(null)
    }
  }

  render() {
    const { statefulMapLessons, applyJustCompletedAnimation, applyNextAnimation, lessonThemesById } = this.state
    const { activeLessonId, lessonJustCompletedId } = this.props

    const lessonsAssets = statefulMapLessons.reduce((acc, lesson, i) => {
      if(isEmpty(lesson)) return null

      const { lessonTheme = GLOBAL_COLORS['neighborhood'] } = lesson
      const isLatestActive = activeLessonId === lesson._id
      const isJustCompleted = lessonJustCompletedId === lesson._id

      acc.push([
        <MapBubble
          lesson={ lesson }
          lessonTheme={ lessonTheme }
          isLatestActive={ isLatestActive }
          isJustCompleted={ isJustCompleted }
          applyNextAnimation={ applyNextAnimation }
          applyJustCompletedAnimation={ applyJustCompletedAnimation }
          i={ i }
          handleLessonBubbleClick={ this.handleLessonBubbleClick }
        />
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
