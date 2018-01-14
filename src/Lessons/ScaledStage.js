import React, { Component, cloneElement, Children } from 'react'
import * as T from 'prop-types'
import { Stage, Layer } from 'react-konva'
import { debounce }  from 'lodash'

const widthAnchor = 1680 // standard macbook screen size
const heightAnchor = 3800
const targetHeightWidthRatio = heightAnchor / widthAnchor

function renderChildren({ children, width }) {
  return Children.map(children, child => {
    return cloneElement(child, { width })
  })
}

export default class LessonMap extends Component {
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

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = debounce(() => {
    // for performance reasons, only resize
    // the stage once every 150ms during
    // a window resizing. There is a small impact
    // on UX but less expensive for the browser
    this.setState({
      width: document.documentElement.clientWidth
      , height: document.documentElement.clientWidth * this.state.targetHeightWidthRatio
    })
  }, 150)


  render() {
    const { width, height } = this.state
    const { children } = this.props
    const scaleXY = width / widthAnchor
    return (
      <Stage width={ width } height={ height } scaleX={ scaleXY } scaleY={ scaleXY }>
        <Layer>
          { renderChildren({ children, height, width }) }
        </Layer>
      </Stage>
    )
  }
}