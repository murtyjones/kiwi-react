import React, { Component } from 'react'
import * as T from 'prop-types'
import { Stage, Layer } from 'react-konva'
import MapLines from './MapLines'
import MapBubbles from './MapBubbles'
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

const widthAnchor = 1680 // standard macbook screen size
const heightAnchor = 4000
const targetHeightWidthRatio = heightAnchor / widthAnchor

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
      stage: null
      , cursor: 'auto'
      , latestActiveLessonId: ''
      , width: widthAnchor
      , height: heightAnchor
      , targetHeightWidthRatio
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

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    this.setState({
      width: document.documentElement.clientWidth
      , height: document.documentElement.clientWidth * this.state.targetHeightWidthRatio
    })
  }

  componentWillReceiveProps(nextProps) {
    const { mapLessons } = this.props
      , { mapLessons: nextMapLessons } = nextProps

    const mapLessonsHasChanged = !isEqual(mapLessons, nextMapLessons)

    if(mapLessonsHasChanged) {
      this.setLatestActiveLessonId(nextMapLessons)
    }

  }

  handleLessonSelect = (e, selectedLessonId) =>
    this.props.setSelectedLessonId(selectedLessonId)

  handleMouseOver = () =>
    this.setState({ cursor: 'pointer' })

  handleMouseOut = () =>
    this.setState({ cursor: 'auto' })

  setLatestActiveLessonId = (mapLessons) => 
    this.setState({ latestActiveLessonId: getLatestActiveLesson(mapLessons) })

  render() {
    const { mapLessons, selectedLessonId, selectedLessonPosition, sideNavWidth } = this.props
    const { width, height, cursor, latestActiveLessonId } = this.state
    const scaleXY = width / widthAnchor

    return (
      <div style={ { ...styles.container, cursor, left:  `${-sideNavWidth}px` } }>
        <Stage width={ width } height={ height } scaleX={ scaleXY } scaleY={ scaleXY }>
          <Layer>
            { !isEmpty(mapLessons) &&
              <MapBubbles
                mapLessons={ mapLessons }
                selectedLessonId={ selectedLessonId }
                selectedLessonPosition={ selectedLessonPosition }
                latestActiveLessonId={ latestActiveLessonId }
                width={ window.innerWidth }
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