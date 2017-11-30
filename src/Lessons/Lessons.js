import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getManyLessons, getManyUserLessons } from '../actions'

import LessonCard from './LessonCard'
import LessonMap from './LessonMap'

const genereateMinWidth = (sideNavWidth) => {
  return 1024 - sideNavWidth
}

const styles = {
  lessonCardContainer: {
    position: 'fixed'
    , right: '20px'
    , bottom: '20px'
    , width: '350px'
    , height: '400px'
  }
}

class Lessons extends Component {
  constructor(props) {
    super(props)
    let _minWidth = genereateMinWidth(props.sideNavWidth)
    this.state = {
      width: _minWidth // this is temporary
      , startingWidth: _minWidth // this is temporary
      , scaleX: 1
      , scaleY: 1
      , minWidth: _minWidth
    }
  }

  static propTypes = {
    getManyLessons: T.func
    , getManyUserLessons: T.func
    , lessonsById: T.object
    , userLessons: T.object
    , sideNavWidth: T.number.isRequired
  }

  componentDidMount() {
    const clientWidth = this.lessonsContainerNode.clientWidth
    const width = Math.max(clientWidth, this.state.minWidth)
    this.setState({
      startingWidth: width
      , width: width
      , scaleX: width / this.state.minWidth
      , scaleY: width / this.state.minWidth

    })
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.sideNavWidth !== nextProps.sideNavWidth) {
      this.setState({ minWidth: genereateMinWidth(nextProps.sideNavWidth) })
      this.updateDimensions()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    const clientWidth = this.lessonsContainerNode.clientWidth
    const width = Math.max(clientWidth, this.state.minWidth)
    const scaleX = width / this.state.minWidth
    const scaleY = scaleX
    this.setState({ width, scaleX, scaleY })
  }


  render() {
    const { width, scaleX, scaleY } = this.state
    const { lessonsById } = this.props

    const mockActiveLessons = [
      {
        isCompleted: true
      },
      {
        _id: '123',
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

    const stageProportion = 0.70
    return (
      <div ref={ (c) => { this.lessonsContainerNode = c } }>
        <LessonMap
          width={ width * stageProportion }
          scaleX={ scaleX }
          scaleY={ scaleY }
          activeLessons={ mockActiveLessons }
          inactiveLessons={ mockInactiveLessons }
        />
        <LessonCard
          style={ {
            ...styles.lessonCardContainer,
            width: width * (1 - stageProportion) - 20,
            height: Math.max(width * (1 - stageProportion), 400),
          } }
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { lessons: { lessonsById }, sideNav: { sideNavWidth } } = state

  return {
    lessonsById
    , sideNavWidth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: (params) => dispatch(getManyLessons(params))
    , getManyUserLessons: (params) => dispatch(getManyLessons(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons))
