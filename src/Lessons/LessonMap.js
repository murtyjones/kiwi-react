import React, { Component } from 'react'
import * as T from 'prop-types'
import MapItems from './MapItems'
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

class LessonMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: 'auto'
    }
  }

  static propTypes = {
    mapLessons: T.array.isRequired
    , selectedLessonId: T.string
    , selectedLessonPosition: T.number
    , setSelectedLessonId: T.func.isRequired
    , lessonJustCompletedId: T.string.isRequired
    , activeLessonId: T.string
  }

  handleLessonSelect = (e, selectedLessonId) =>
    this.props.setSelectedLessonId(selectedLessonId)

  render() {
    const { mapLessons, selectedLessonId, activeLessonId, lessonJustCompletedId, selectedLessonPosition } = this.props
    const { cursor, latestActiveLessonId } = this.state

    return (
      <div style={ { ...styles.container, cursor } }>
        { !isEmpty(mapLessons) &&
          <MapItems
            mapLessons={ mapLessons }
            selectedLessonId={ selectedLessonId }
            activeLessonId={ activeLessonId }
            lessonJustCompletedId={ lessonJustCompletedId }
            selectedLessonPosition={ selectedLessonPosition }
            latestActiveLessonId={ latestActiveLessonId }
            onLessonSelect={ this.handleLessonSelect }
          />
        }
      </div>
    )
  }

}

export default LessonMap