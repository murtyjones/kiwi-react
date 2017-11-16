import React, { Component } from 'react'
import * as T from 'prop-types'
import { Stage, Circle, Layer, Line, Text } from 'react-konva'
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
    const clientWidth = this.refs.parental.clientWidth
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
    console.log(this.refs.parental.clientWidth / this.state.startingWidth)
    this.setState({
      width: this.refs.parental.clientWidth,
      scaleX: this.refs.parental.clientWidth / this.state.startingWidth,
      scaleY: this.refs.parental.clientWidth / this.state.startingWidth
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
      <div ref="parental" style={ { ...styles.container, cursor } }>
        <Stage ref="stage" width={ width } height={ 1000 } scaleX={scaleX} scaleY={scaleY}>
          <Layer ref="layer" style={  styles.layer1  }>
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