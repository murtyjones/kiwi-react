import React, { Component } from 'react'
import * as T from 'prop-types'
import Alarm  from 'material-ui-icons/Alarm'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'

import { KiwiLink } from '../common/KiwiLink'

const mediaColor = '#808080'
const textColor = '#A9A9A9'
const timeSectionColor = '#808080'

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
    , paddingRight: '16px'
    , display: 'block'
  },
  alarm: {
    color: timeSectionColor
    , verticalAlign: 'middle'
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
      <span style={ styles.minutes }>{ minutes } minutes</span>
    </div>
  )
}

const LessonCard = ({ style, lesson }) => {
  return (
    <KiwiLink to={ `/lesson/${ lesson._id }` }>
      <Card style={ style } containerStyle={ styles.container }>
        <CardMedia
          style={ styles.media }
        />
        <div style={ styles.body }>
          <CardHeader
            title={ `${lesson.order}. ${lesson.title}` }
            titleStyle={ styles.titleStyle }
          />
          <CardText
            style={ styles.text }
          >
            { lesson.subtitle }
          </CardText>
          <TimeToComplete minutes={ lesson.minutesToComplete } />
        </div>
      </Card>
    </KiwiLink>
  )
}

export default LessonCard