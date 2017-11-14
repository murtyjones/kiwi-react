import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getManyLessons } from '../actions'
import { Stage, Circle, Layer, Line, Text } from 'react-konva'
import renderLessonCard from './LessonCard'

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
  },
  card: {
    position: 'fixed'
    , right: '20px'
    , bottom: '20px'
    , width: '350px'
    , height: '400px'
  }
}

const activeLineColor = '#696969'
const inactiveColor = '#D3D3D3'

class Lessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: null,
      width: window.innerWidth,
      height: window.innerHeight,
      cursor: 'auto'
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
    console.log('clicked')
  }

  handleMouseOver = () => {
    console.log()
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
    const { lessons } = this.props
    const { width, height, cursor } = this.state
    const circle1x = width / 5
      , circle1y = height / 6
      , circle2x = width / 2
      , circle2y = height / 2
      , circle3x = width / 3.25
      , circle3y = height / 1.1

    return (
      <div ref="parental" style={ { ...styles.container, cursor } }>
        <Stage ref="stage" width={ width } height={ 1000 }>
          <Layer style={  styles.layer1  }>
            <Line
              points={ [
                circle1x, circle1y
                , width / 3, height / 7
                , width / 2.5, height / 2.5
                , circle2x, circle2y
              ] }
              stroke={ activeLineColor }
              strokeWidth={ 13 }
              lineCap={ 'round' }
              lineJoin={ 'round' }
              tension={ 0.5 }
            />
            <Line
              points={ [
                circle2x, circle2y
                , width / 2, height / 1.5
                , width / 2.5, height / 1.3
                , circle3x, circle3y
              ] }
              stroke={ inactiveColor }
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
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
            />
            <Text
              x={ circle1x-23 }
              y={ circle1y-20 }
              width={ 50 }
              height={ 50 }
              fontSize={ 40 }
              text={ '1' }
              fontStyle={ 'bold' }
              fontFamily={ 'arial' }
              fill={ 'black' }
              align={ 'center' }
              onClick={ this.handleClick }
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
            />
            <Circle
              x={ circle2x }
              y={ circle2y }
              width={ 100 }
              height={ 100 }
              fill={ 'white' }
              stroke={ activeLineColor }
              strokeWidth={ 8 }
              onClick={ this.handleClick }
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
            />
            <Text
              x={ circle2x-23 }
              y={ circle2y-20 }
              width={ 50 }
              height={ 50 }
              fontSize={ 40 }
              text={ '2' }
              fontStyle={ 'bold' }
              fontFamily={ 'arial' }
              fill={ 'black' }
              align={ 'center' }
              onClick={ this.handleClick }
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
            />
            <Circle
              x={ circle3x }
              y={ circle3y }
              width={ 100 }
              height={ 100 }
              fill={ 'white' }
              // stroke={ inactiveColor }
              // strokeWidth={ 8 }
              onClick={ this.handleClick }
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
            />
            <Text
              x={ circle3x-23 }
              y={ circle3y-20 }
              width={ 50 }
              height={ 50 }
              fontSize={ 40 }
              text={ '3' }
              fontStyle={ 'bold' }
              fontFamily={ 'arial' }
              fill={ 'black' }
              align={ 'center' }
              onClick={ this.handleClick }
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
            />
          </Layer>
        </Stage>
        { renderLessonCard({ style: styles.card }) }
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
