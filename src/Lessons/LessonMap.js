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
      width: window.innerWidth,
      cursor: 'auto'
    }
  }

  static propTypes = {
    lessons: T.array
    , userLessons: T.array
  }

  componentDidMount() {
    this.setState({
      //stage: this.refs.stage.getStage(),
      width: this.refs.parental.clientWidth
    })
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    this.setState({
      width: this.refs.parental.clientWidth
    })
  }

  handleClick = () => {
    console.log('clicked')
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
    const { width, cursor } = this.state

    const mockActiveLessons = [
      {
        isCompleted: true
      },
      {
        isCompleted: false
      }
    ]

    const mockInactiveLessons = [
      {

      }
    ]

    return (
      <div ref="parental" style={ { ...styles.container, cursor } }>
        <Stage ref="stage" width={ width } height={ 1000 }>
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