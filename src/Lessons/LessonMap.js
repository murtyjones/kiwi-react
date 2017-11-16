import React, { Component } from 'react'
import * as T from 'prop-types'
import { Stage, Layer } from 'react-konva'
import MapLines from './MapLines'
import MapBubbles from './MapBubbles'

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
    this.state = {
      stage: null,
      width: window.innerWidth, // this is temporary
      startingWidth: window.innerWidth,
      cursor: 'auto',
      scaleX: 1,
      scaleY: 1
    }
  }

  static propTypes = {
    lessons: T.array
    , userLessons: T.array
  }

  componentDidMount() {
    const clientWidth = this.parentalNode.clientWidth
    this.setState({
      startingWidth: clientWidth,
      width: clientWidth
    })
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    console.log(this.parentalNode.clientWidth / this.state.startingWidth)
    this.setState({
      width: this.parentalNode.clientWidth,
      scaleX: this.parentalNode.clientWidth / this.state.startingWidth,
      scaleY: this.parentalNode.clientWidth / this.state.startingWidth
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
    const { width, cursor, scaleX, scaleY } = this.state

    const mockActiveLessons = [
      {
        isCompleted: true
      },
      {
        isCompleted: false,
        completenessPercentage: 34
      }
    ]

    const mockInactiveLessons = [
      {

      },
      {

      },
      {

      }
    ]

    return (
      <div ref={ (c) => { this.parentalNode = c } } style={ { ...styles.container, cursor } }>
        <Stage width={ width } height={ 1000 } scaleX={scaleX} scaleY={scaleY}>
          <Layer style={  styles.layer1  }>
            <MapLines
              activeLessons={ mockActiveLessons }
              inactiveLessons={ mockInactiveLessons }
              width={ width }
            />
            <MapBubbles
              activeLessons={ mockActiveLessons }
              inactiveLessons={ mockInactiveLessons }
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