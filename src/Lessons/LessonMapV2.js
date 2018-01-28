import React, { Component } from 'react'
import * as T from 'prop-types'
import MapItems from './MapItemsV2'
import { isEmpty, isEqual, get }  from 'lodash'

const styles = {
  container: {
    width: '100vw'
    , position: 'absolute'
    , zIndex: 1000
  },
  layer1: {
    width: '100%',
    height: '400px',
  }
}

const getLatestActiveLesson = mapLessons => {
  for (let i = 0, length = mapLessons.length; i < length; i++) {
    const lesson = mapLessons[i]
      , hasBeenCompleted = get(lesson, 'userLesson.hasBeenCompleted', '')
    if(!hasBeenCompleted)
      return lesson._id
  }
  return ''
}

class LessonMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: 'auto'
      , latestActiveLessonId: ''
    }
  }

  static propTypes = {
    mapLessons: T.array.isRequired
    , selectedLessonId: T.string
    , selectedLessonPosition: T.number
    , setSelectedLessonId: T.func.isRequired
  }

  componentWillMount() {
    this.setLatestActiveLessonId(this.props.mapLessons)
  }

  componentWillReceiveProps(nextProps) {
    const { mapLessons } = this.props
      , { mapLessons: nextMapLessons } = nextProps
      , mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)

    if(mapLessonsHasChanged)
      this.setLatestActiveLessonId(nextMapLessons)
  }

  handleLessonSelect = (e, selectedLessonId) =>
    this.props.setSelectedLessonId(selectedLessonId)

  handleMouseOver = () => this.setState({ cursor: 'pointer' })

  handleMouseOut = () => this.setState({ cursor: 'auto' })

  setLatestActiveLessonId = (mapLessons) => 
    this.setState({ latestActiveLessonId: getLatestActiveLesson(mapLessons) })

  render() {
    const { mapLessons, selectedLessonId, selectedLessonPosition } = this.props
    const { cursor, latestActiveLessonId } = this.state

    return (
      <div style={ { ...styles.container, cursor } }>
        { !isEmpty(mapLessons) &&
          <MapItems
            mapLessons={ mapLessons }
            selectedLessonId={ selectedLessonId }
            selectedLessonPosition={ selectedLessonPosition }
            latestActiveLessonId={ latestActiveLessonId }
            onLessonSelect={ this.handleLessonSelect }
            handleMouseOver={ this.handleMouseOver }
            handleMouseOut={ this.handleMouseOut }
          />
        }
      </div>
    )
  }

}

export default LessonMap