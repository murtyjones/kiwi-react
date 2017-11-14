import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getManyLessons } from '../actions'
import { Stage, Circle, Layer, Line, Text } from 'react-konva'

const styles = {
  container: {
    width: '100%'
  },
  stage: {
    width: '700px',
    height: '400px',
  },
  layer1: {
    width: '100%',
    height: '400px',
  }
}

const strokeColor = '#696969'

class Lessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'green',
      stage: null,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , lessons: T.object
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
      width: this.refs.parental.clientWidth,
      height: window.innerHeight
    })
  }

  handleClick = () => {
    // window.Konva is a global variable for Konva framework namespace
    this.setState({
      color: window.Konva.Util.getRandomColor()
    })
  }

  render() {
    const { lessons } = this.props
    const { color, width, height } = this.state
    const circle1x = width / 2
    const circle1y = height / 6
    const circle2x = width / 2
    const circle2y = height / 2

    return (
      <div ref="parental" style={ styles.container }>
        <Stage ref="stage" width={ width } height={ height }>
          <Layer style={  styles.layer1  }>
            <Line
              points={ [circle1x, circle1y, width / 1.5, height / 3 , circle2x, circle2y] }
              stroke={ strokeColor }
              strokeWidth={ 13 }
              lineCap={ 'round' }
              lineJoin={ 'round' }
              tension={ 0.5 }
            />
            <Circle
              ref={ 'circle1' }
              x={ circle1x }
              y={ circle1y }
              width={ 100 }
              height={ 100 }
              fill={ 'white' }
              onClick={ this.handleClick }
            />
            <Text
              x={ circle1x-23 }
              y={ circle1y-20 }
              width={ 50 }
              height={ 50 }
              fontSize={ 40 }
              text={ '1' }
              fontFamily={ 'arial' }
              fill={ 'black' }
              align="center"
              onClick={ this.handleClick }
            />
            <Circle
              x={ circle2x }
              y={ circle2y }
              width={ 100 }
              height={ 100 }
              fill={ 'white' }
              stroke={ strokeColor }
              strokeWidth={ 8 }
              onClick={ this.handleClick }
            />
          </Layer>
        </Stage>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { lessons: { lessonsById } } = state

  return {
    lessons: lessonsById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: (params) => dispatch(getManyLessons(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
