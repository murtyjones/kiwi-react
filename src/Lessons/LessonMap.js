import React, { Component } from 'react'
import * as T from 'prop-types'
import { Stage, Layer } from 'react-konva'
import MapLines from './MapLines'
import MapBubbles from './MapBubbles'
import { isEmpty, isEqual, get }  from 'lodash'

const heightPerLessonBubble = 150
const minHeight = 768

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
    const mapLessonsLength = props.mapLessons.length
    const startingHeight = Math.max(minHeight, mapLessonsLength * heightPerLessonBubble)
    this.state = {
      stage: null
      , cursor: 'auto'
      , height: 1500
      , heightWidthRatio: 1500 / props.width
      , scaleX: 1
      , scaleY: 1
      , latestActiveLessonId: ''
    }
  }

  static propTypes = {
    mapLessons: T.array.isRequired
    , selectedLessonId: T.string
    , selectedLessonPosition: T.number
    , scaleX: T.any
    , scaleY: T.any
    , setSelectedLessonId: T.func.isRequired
    , width: T.number.isRequired
  }

  componentWillMount() {
    this.setLatestActiveLessonId(this.props.mapLessons)
  }

  componentWillReceiveProps(nextProps) {
    const { mapLessons, width } = this.props
      , { mapLessons: nextMapLessons, width: nextWidth } = nextProps

    const mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)
      , widthHasChanged = !isEqual(width, nextWidth)

    if(widthHasChanged) {
      this.setState({ height: nextProps.width * this.state.heightWidthRatio })
    }

    if(mapLessonsHasChanged) {
      this.setLatestActiveLessonId(nextMapLessons)
    }

  }

  handleLessonSelect = (e, selectedLessonId) => {
    this.props.setSelectedLessonId(selectedLessonId)
  }

  handleMouseOver = () =>
    this.setState({ cursor: 'pointer' })

  handleMouseOut = () =>
    this.setState({ cursor: 'auto' })

  setLatestActiveLessonId = (mapLessons) => 
    this.setState({ latestActiveLessonId: getLatestActiveLesson(mapLessons) })

  render() {
    const { width, mapLessons, selectedLessonId, selectedLessonPosition, sideNavWidth, scaleX, scaleY } = this.props
    const { height, cursor, latestActiveLessonId } = this.state

    return (
      <div style={ { ...styles.container, cursor, left:  `${-sideNavWidth}px` } }>
        <Stage width={ width } height={ height } scaleX={ scaleX } scaleY={ scaleY }>
          <Layer style={ styles.layer1  }>
            { !isEmpty(mapLessons) &&
              <MapBubbles
                mapLessons={ mapLessons }
                selectedLessonId={ selectedLessonId }
                selectedLessonPosition={ selectedLessonPosition }
                latestActiveLessonId={ latestActiveLessonId }
                width={ width }
                onLessonSelect={ this.handleLessonSelect }
                handleMouseOver={ this.handleMouseOver }
                handleMouseOut={ this.handleMouseOut }
              />
            }
          </Layer>
        </Stage>
      </div>
    )
  }

}

export default LessonMap