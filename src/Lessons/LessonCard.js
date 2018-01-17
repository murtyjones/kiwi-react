import React, { Component } from 'react'
import * as T from 'prop-types'
import Alarm  from 'material-ui-icons/Alarm'
import ArrowForward  from 'material-ui-icons/ArrowForward'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'

import { KiwiLink } from '../common/KiwiLink'

const mediaColor = '#808080'
const textColor = '#A9A9A9'
const timeSectionColor = '#000000'
const goButtonBackgroundColor = '#CCCCCC'

const styles = {
  container: {
    height:'100%'
  },
  media: {
    height: '50%'
    , backgroundColor: mediaColor
  },
  body: {
    height: '50%'
  },
  titleStyle: {
    fontSize: '20px'
    , fontWeight: 'bold'
  },
  text: {
    fontSize: '16px'
    , color: textColor
  },
  timeToComplete: {
    padding: '16px'
    , position: 'absolute'
    , bottom: '0'
    , left: '0'
    , paddingRight: '16px'
    , display: 'block'
  },
  alarm: {
    color: timeSectionColor
    , verticalAlign: 'middle'
  },
  circle: {
    borderRadius: '50%'
    , position: 'absolute'
    , top: '50%'
    , marginTop: '-33px'
    , right: '20px'
    , width: '66px'
    , height: '66px'
    , backgroundColor: goButtonBackgroundColor
  },
  goButton: {
    color: 'white'
    , verticalAlign: 'middle'
    , position: 'absolute'
    , top: '50%'
    , marginTop: '-25px'
    , left: '50%'
    , marginLeft: '-25px'
    , width: '50px'
    , height: '50px'
  },
  minutes: {
    paddingLeft: '5px'
    , color: timeSectionColor
    , verticalAlign: 'middle'
  }
}

const TimeToComplete = ({ minutes }) => {
  return (
    <div style={ styles.timeToComplete }>
      <Alarm
        style={ styles.alarm }
      />
      <span style={ styles.minutes }>{ minutes } MIN</span>
    </div>
  )
}

const GoButton = () => {
  return (
    <div style={ styles.circle }>
      <ArrowForward
        style={ styles.goButton }
      />
    </div>
  )
}

const LessonCard = ({ style, lesson }) => {
  return (
    <KiwiLink to={ `/lessons/${ lesson._id }` }>
      <Card style={ style } containerStyle={ styles.container }>
        <CardMedia
          style={ styles.media }
        />
        <div style={ styles.body }>
          <CardHeader
            title={ lesson.title }
            titleStyle={ styles.titleStyle }
          />
          <CardText
            style={ styles.text }
          >
            { lesson.subtitle }
          </CardText>
          <TimeToComplete minutes={ lesson.minutesToComplete } />
        </div>
        <GoButton />
      </Card>
    </KiwiLink>
  )
}

export default LessonCard