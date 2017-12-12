import React, { Component } from 'react'
import * as T from 'prop-types'
import { Stage, Layer } from 'react-konva'
import MapLines from './MapLines'
import MapBubbles from './MapBubbles'

const heightPerLessonBubble = 150
const minHeight = 768

const styles = {
  container: {
    width: '100%'
  },
  layer1: {
    width: '100%',
    height: '400px',
  }
}

class LessonMap extends Component {
  constructor(props) {
    super(props)
    const mapLessonsLength = props.mapLessons.length
    const startingHeight = Math.max(minHeight, mapLessonsLength * heightPerLessonBubble)
    this.state = {
      stage: null,
      cursor: 'auto',
      height: startingHeight,
      heightWidthRatio: startingHeight / props.width,
      scaleX: 1,
      scaleY: 1
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      height: nextProps.width * this.state.heightWidthRatio
    })
  }

  handleLessonSelect = (e, selectedLessonId) => {
    this.props.setSelectedLessonId(selectedLessonId)
  }

  handleMouseOver = () => {
    this.setState({ cursor: 'pointer' })
  }

  handleMouseOut = () => {
    this.setState({ cursor: 'auto' })
  }

  render() {
    const { width, mapLessons, selectedLessonId, selectedLessonPosition, scaleX, scaleY } = this.props
    const { height, cursor } = this.state

    return (
      <div style={ { ...styles.container, cursor } }>
        <Stage width={ width } height={ height } scaleX={ scaleX } scaleY={ scaleY }>
          <Layer style={ styles.layer1  }>
            <MapLines
              mapLessons={ mapLessons }
              width={ width }
            />
            <MapBubbles
              mapLessons={ mapLessons }
              selectedLessonId={ selectedLessonId }
              selectedLessonPosition={ selectedLessonPosition }
              width={ width }
              onLessonSelect={ this.handleLessonSelect }
              handleMouseOver={ this.handleMouseOver }
              handleMouseOut={ this.handleMouseOut }
            />
          </Layer>
        </Stage>
      </div>
    )
  }

}

export default LessonMap