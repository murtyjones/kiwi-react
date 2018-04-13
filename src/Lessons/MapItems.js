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

const generateStatefulMapLessons = ({ mapLessons, bubbleAvailabilities, lessonThemesById, activeLessonId, lessonJustCompletedId }) =>
  (mapLessons ||[]).reduce((acc, lesson, i) => {
    const order = i + 1
      , x = LESSON_MAP_POINTS[`CIRCLE_${order}_X`]
      , y = LESSON_MAP_POINTS[`CIRCLE_${order}_Y`]
      , goToPoint = LESSON_MAP_POINTS[`CIRCLE_${order}_GOTO`]
      , isLeftLabel = x > 50
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', false)
      , completionPercentage = get(lesson, 'userLesson.trueCompletionPercentage', 0)
      , bubbleAvailability = bubbleAvailabilities[i]
      , isAvailable = hasBeenCompleted || bubbleAvailability === bubbleStates.AVAILABLE
      , message = isAvailable ? lesson.title : 'Locked!'
      , lessonThemeName = get(lessonThemesById, `${lesson.themeId}.name`, '').toLowerCase() || 'neighborhood'
      , lessonTheme = GLOBAL_COLORS[lessonThemeName]
      , isLatestActive = activeLessonId === lesson._id
      , isJustCompleted = lessonJustCompletedId === lesson._id

    acc.push({
      ...lesson
      , order
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
      , isLatestActive
      , isJustCompleted
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

  async componentDidUpdate(prevProps, prevState) {
    const { mapLessons, activeLessonId, lessonJustCompletedId, selectedLessonId } = this.props
    const activeLessonIdHasChanged = !isEqual(activeLessonId, prevProps.activeLessonId)
    const lessonJustCompletedIdHasChanged = !isEqual(lessonJustCompletedId, prevProps.lessonJustCompletedId)
    const mapLessonsHasChanged = !isEqual(mapLessons, prevProps.mapLessons)
    const selectedLessonIdHasChanged = !isEqual(selectedLessonId, prevProps.selectedLessonId)

    if(selectedLessonIdHasChanged)
      await this.goToSelectedLesson(selectedLessonId)
    else if(!this.state.isAnimatingToSelected && (activeLessonIdHasChanged || lessonJustCompletedIdHasChanged || mapLessonsHasChanged))
      await this.goToActiveLesson(activeLessonId, lessonJustCompletedId)
  }

  goToSelectedLesson = async (selectedLessonId) => {
    const statefulMapLessons = this.generateStatefulMapLessons()
    await this.setStateAsync({ isAnimatingToSelected: true })
    const lesson = find(statefulMapLessons, { _id: selectedLessonId })
    await setTimeoutAsync(100)
    this.scrollTo(window.innerWidth * get(lesson, 'goToPoint', 0))
    await this.setStateAsync({ isAnimatingToSelected: false })
  }

  goToActiveLesson = async (activeLessonId, lessonJustCompletedId) => {
    const statefulMapLessons = this.generateStatefulMapLessons()
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

  generateStatefulMapLessons = () => {
    const { mapLessons, lessonThemesById, activeLessonId, lessonJustCompletedId } = this.props
    const { bubbleAvailabilities } = this.state
    return generateStatefulMapLessons({ mapLessons, bubbleAvailabilities, lessonThemesById, activeLessonId, lessonJustCompletedId })
  }

  scrollTo = to => scroll.scrollTo(to)

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  setBubbleAvailabilities = (mapLessons, activeLessonId) =>
    this.setState({ bubbleAvailabilities: calculateBubbleAvailabilities(mapLessons, activeLessonId) })

  handleLessonBubbleClick = (e, lesson, order, isAvailable) => {
    if(isAvailable) {
      this.props.onLessonSelect(e, lesson._id)
    }
  }

  render() {
    const { applyJustCompletedAnimation, applyNextAnimation } = this.state
    const statefulMapLessons = this.generateStatefulMapLessons()

    return (
      <div style={ styles.container }>
        { statefulMapLessons.reduce((acc, statefulLesson, i) => {
          if(isEmpty(statefulLesson))
            return null

          acc.push([
            <MapBubble
              key={ i }
              statefulLesson={ statefulLesson }
              applyNextAnimation={ applyNextAnimation }
              applyJustCompletedAnimation={ applyJustCompletedAnimation }
              handleLessonBubbleClick ={ this.handleLessonBubbleClick }
            />
          ])
          return acc
        }, []) }
      </div>
    )
  }
}

export default MapItems
