import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Circle, Text, Path } from 'react-konva'
import { has, get, find, findIndex, cloneDeep, isEmpty } from 'lodash'

import { LESSON_MAP_POINTS } from '../constants'

const styles = {
  activeStrokeColor: '#696969'
  , activeFillColor: '#FFFFFF'
  , inactiveFillColor: '#C6C6C6'
  , activeTextColor: '#000000'
  , inactiveTextColor: '#808080'
  , checkMarkCircleColor: '#808080'
  , checkMarkColor: 'white'
}

const defaultBubbleStyle = {
  fill: styles.inactiveFillColor
  , width: 50
  , height: 50
}

const selectedBubbleStyle = {
  ...defaultBubbleStyle
  , fill: styles.activeFillColor
}

const defaultBubbleTextStyle = {
  textFill: styles.inactiveTextColor
  , fontSize: 28
  , offsetX: 18
  , offsetY: 13
}

const selectedBubbleTextStyle = {
  ...defaultBubbleTextStyle
  , textFill: styles.activeTextColor
}

const checkMarkSVGData = 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' // copied from material ui

const CHECK_MARK_CIRCLE_X_OFFSET = 20
const CHECK_MARK_CIRCLE_Y_OFFSET = 20
const CHECK_MARK_X_OFFSET = 10
const CHECK_MARK_Y_OFFSET = 35

const isLessonSelected = (lessonOrUserLesson, selectedLessonId) => {
  return get(lessonOrUserLesson, '_id') === selectedLessonId || get(lessonOrUserLesson, 'lessonId') === selectedLessonId
}

class MapBubbles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mapDimensions: LESSON_MAP_POINTS(props.width)
      , bubbleStyles: props.mapLessons.map((_, i) => defaultBubbleStyle)
      , bubbleTextStyles: props.mapLessons.map((_, i) => defaultBubbleTextStyle)
      , selectedBubbleRef: ''
      , selectedBubbleTextRef: ''
    }
  }

  static propTypes = {
    handleClick: T.func.isRequired
    , handleMouseOver: T.func.isRequired
    , handleMouseOut: T.func.isRequired
    , mapLessons: T.array.isRequired
  }

  componentDidMount() {
    const { mapLessons } = this.props
    mapLessons.forEach((each, index) => {
      const order = index + 1
      if(each.justCompleted) {
        setTimeout(() => {
          this.refs[`circle-${order}`].to({
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 0.5
          })
        }, 500)

      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(isEmpty(this.props.mapLessons) && !isEmpty(nextProps.mapLessons)) {
      this.setState({
        bubbleStyles: nextProps.mapLessons.map((_, i) => defaultBubbleStyle)
        , bubbleTextStyles: nextProps.mapLessons.map((_, i) => defaultBubbleTextStyle)
      })
    }
  }

  scaleDownBubble = (bubbleRef, bubbleTextRef) => {
    this.refs[bubbleRef].to({
      scaleX: 1
      , scaleY: 1
      , duration: .2
    })
    this.refs[bubbleTextRef].to({
      scaleX: 1
      , scaleY: 1
      , offsetX: defaultBubbleTextStyle.offsetX
      , offsetY: defaultBubbleTextStyle.offsetY
      , duration: .2
    })
  }

  delayedScaleUpBubble = (bubbleRef, bubbleTextRef) => {
    setTimeout(() => {
      this.refs[bubbleRef].to({
        scaleX: 1.3
        , scaleY: 1.3
        , duration: .2
      })
      this.refs[bubbleTextRef].to({
        scaleX: 1.3
        , scaleY: 1.3
        , offsetX: selectedBubbleTextStyle.offsetX
        , offsetY: selectedBubbleTextStyle.offsetY
        , duration: .2
      })
    }, 100)
  }

  handleLessonBubbleClick = (e, lessonId, order) => {
    const { bubbleStyles, bubbleTextStyles, selectedBubbleRef, selectedBubbleTextRef } = this.state
    const { handleClick } = this.props
    handleClick(e, lessonId)
    const bubbleRef = `circle-${order}`
      ,   textRef = `text-${order}`

    if(selectedBubbleRef && selectedBubbleTextRef) {
      this.scaleDownBubble(selectedBubbleRef, selectedBubbleTextRef)
    }

    const newBubbleStyles =  cloneDeep(bubbleStyles)
      , newBubbleTextStyles = cloneDeep(bubbleTextStyles)

    this.setState({
      bubbleStyles: newBubbleStyles.map((_, i) => {
        return (i === order - 1) ? selectedBubbleStyle : defaultBubbleStyle
      })
      , bubbleTextStyles: newBubbleTextStyles.map((_, i) => {
        return (i === order - 1) ? selectedBubbleTextStyle : defaultBubbleTextStyle
      })
      , selectedBubbleRef: bubbleRef
      , selectedBubbleTextRef: textRef
    })

    this.delayedScaleUpBubble(bubbleRef, textRef)
  }

  renderCircleAndText = (lesson, order, isSelected) => {
    const { handleClick, handleMouseOver, handleMouseOut } = this.props
      , { mapDimensions, bubbleStyles, bubbleTextStyles } = this.state
      , index = order - 1
      , bubbleStyle = bubbleStyles[index]
      , bubbleTextStyle = bubbleTextStyles[index]
      , hasBeenStartedByStudent = has(lesson, 'userLesson')

    const circleProps = { // defaults to inactive
      fill: bubbleStyle.fill
      , width: 50
      , height: 50
    }

    const textProps = { // defaults to inactive
      fill: styles.inactiveTextColor
      , fontSize: 28
    }

    let checkMark = []

    if(hasBeenStartedByStudent) {
      const completionPercentage = 75  // mock 75% for now - will ultimately end up being this:  get(lesson, 'userLesson.completionPercentage', 0)
      circleProps.stroke = styles.activeStrokeColor
      circleProps.strokeWidth = 5
      circleProps.fill = styles.activeFillColor
      textProps.fill = styles.activeTextColor

      if(completionPercentage === 100) {
        checkMark = [
          <Circle
            key={ `checkMark-circle-${order}` }
            x={ mapDimensions[`CIRCLE_${order}_X`] + CHECK_MARK_CIRCLE_X_OFFSET }
            y={ mapDimensions[`CIRCLE_${order}_Y`] - CHECK_MARK_CIRCLE_Y_OFFSET }
            width={ 20 }
            height={ 20 }
            onClick={ (e) => this.handleLessonBubbleClick(e, lesson._id, order) }
            onMouseOver={ handleMouseOver }
            onMouseOut={ handleMouseOut }
            fill={ styles.checkMarkCircleColor }
          />
          ,
          <Path
            x={ mapDimensions[`CIRCLE_${order}_X`] + CHECK_MARK_X_OFFSET }
            y={ mapDimensions[`CIRCLE_${order}_Y`] - CHECK_MARK_Y_OFFSET }
            data={ checkMarkSVGData }
            fill={ styles.checkMarkColor }
            scale={ { x : 1.1, y : 1.1 } }
          />
        ]
      } else {
        // partial border styling
        delete(circleProps.fill)
        const variance = circleProps.height / 100
        const offset = circleProps.height/2
        const gradStartPt = -1 * (completionPercentage * variance - offset)
        circleProps.fillLinearGradientStartPoint={y: gradStartPt}
        circleProps.fillLinearGradientEndPoint={y : gradStartPt + .01}
        circleProps.fillLinearGradientColorStops=
        [0, styles.inactiveFillColor,
          1, styles.activeFillColor]
      }
    }

    return [
      <Circle
        key={ `circle-${order}` }
        ref={ `circle-${order}` }
        x={ mapDimensions[`CIRCLE_${order}_X`] }
        y={ mapDimensions[`CIRCLE_${order}_Y`] }
        onClick={ (e) => this.handleLessonBubbleClick(e, lesson._id, order) }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        { ...bubbleStyle }
      />
      ,
      <Text
        key={ `text-${order}` }
        ref={ `text-${order}` }
        x={ mapDimensions[`CIRCLE_${order}_X`] }
        y={ mapDimensions[`CIRCLE_${order}_Y`] }
        width={ 35 }
        height={ 35 }
        text={ order }
        fontStyle={ 'bold' }
        fontFamily={ 'arial' }
        align={ 'center' }
        onClick={ (e) => this.handleLessonBubbleClick(e, lesson._id, order) }
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        { ...bubbleTextStyle }
      />
      ,
      ...checkMark
    ]
  }

  render() {
    const { mapLessons, selectedLessonId = null } = this.props

    const bubbleElements = []

    mapLessons.forEach((lesson, i) => {
      const order = i + 1
      const isSelected = isLessonSelected(lesson, selectedLessonId)
      bubbleElements.push(...this.renderCircleAndText(lesson, order, isSelected))
    })

    return bubbleElements
  }
}

export default MapBubbles
