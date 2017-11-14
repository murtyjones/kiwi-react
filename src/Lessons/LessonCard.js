import React, { Component } from 'react'
import * as T from 'prop-types'
import Alarm  from 'material-ui-icons/Alarm'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'

import { KiwiLink } from '../common/KiwiLink'

const styles = {
  container: {
    height:'100%'
  },
  media: {
    height: '50%'
    , backgroundColor: '#808080'
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
    , color: '#A9A9A9'
  },
  timeToComplete: {
    padding: '16px'
    , paddingRight: '16px'
    , display: 'block'
  },
  alarm: {
    color: '#808080'
    , verticalAlign: 'middle'
  },
  minutes: {
    paddingLeft: '5px'
    , color: '#808080'
    , verticalAlign: 'middle'
  }
}

const TimeToComplete = () => {
  return (
    <div style={ styles.timeToComplete }>
      <Alarm
        style={ styles.alarm }
      />
      <span style={ styles.minutes }>5 minutes</span>
    </div>
  )
}

const renderLessonCard = ({ style }) => {
  return (
    <KiwiLink to={'/#'}>
      <Card style={ style } containerStyle={ styles.container }>
        <CardMedia
          style={ styles.media }
        />
        <div style={ styles.body }>
          <CardHeader
            title={ '2. Lesson' }
            titleStyle={ styles.titleStyle }
          />
          <CardText
            style={ styles.text }
          >
            This is my lesson. There are many like it, but this one is mine. My lesson is my best friend. It is my life.
          </CardText>
          <TimeToComplete
          />
        </div>
      </Card>
    </KiwiLink>
  )
}

export default renderLessonCard