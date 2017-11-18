import React, { Component } from 'react'
import * as T from 'prop-types'
import { Stage, Layer } from 'react-konva'
import MapLines from './MapLines'
import MapBubbles from './MapBubbles'

const heightPerLessonBubble = 250
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
    const allLessons = props.activeLessons.length + props.inactiveLessons.length
    const startingHeight = Math.max(minHeight, allLessons * heightPerLessonBubble)
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
    activeLessons: T.array.isRequired
    , inactiveLessons: T.array.isRequired
    , width: T.number.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      height: nextProps.width * this.state.heightWidthRatio
    })
  }

  handleClick = () => {

  }

  handleMouseOver = () => {
    this.setState({
      cursor: 'pointer'
    })
  }

  handleMouseOut = () => {
    this.setState({
      cursor: 'auto'
    })
  }

  render() {
    const { width, activeLessons, inactiveLessons, scaleX, scaleY } = this.props
    const { height, cursor } = this.state

    return (
      <div style={ { ...styles.container, cursor } }>
        <Stage width={ width } height={ height } scaleX={ scaleX } scaleY={ scaleY }>
          <Layer style={ styles.layer1  }>
            <MapLines
              activeLessons={ activeLessons }
              inactiveLessons={ inactiveLessons }
              width={ width }
            />
            <MapBubbles
              activeLessons={ activeLessons }
              inactiveLessons={ inactiveLessons }
              selectedLessonId={ activeLessons[1]._id }
              width={ width }
              handleClick={ this.handleClick }
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