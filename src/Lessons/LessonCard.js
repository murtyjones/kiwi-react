import React, { Component } from 'react'
import * as T from 'prop-types'
import Alarm  from 'material-ui-icons/Alarm'
import ArrowForward  from 'material-ui-icons/ArrowForward'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'

import { KiwiLink } from '../common/KiwiLink'

const mediaColor = '#808080'
const textColor = '#A9A9A9'
const timeSectionColor = '#CCCCCC'

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
  title: {
    fontSize: '20px'
    , fontWeight: 'bold'
    , display: 'block'
  },
  subtitle: {
    display: 'block'
    , marginTop: '15px'
  },
  text: {
    fontSize: '16px'
    , color: textColor
  },
  timeToCompleteContainer: {
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
    , boxShadow: 'rgba(0,0,0,0.4) 3px 3px 8px 0px'
  },
  goButton: {
    color: 'white'
    , verticalAlign: 'middle'
    , position: 'absolute'
    , top: '50%'
    , left: '50%'
  },
  minutes: {
    paddingLeft: '5px'
    , color: timeSectionColor
    , verticalAlign: 'middle'
  }
}

const TimeToComplete = ({ minutes }) => {
  return (
    <div style={ styles.timeToCompleteContainer }>
      <Alarm
        style={ styles.alarm }
      />
      <span style={ styles.minutes }>{ minutes } MIN</span>
    </div>
  )
}

const GoButton = () => {
  return (
    <div
      className='map-card-circle'
      style={ styles.circle }
    >
      <ArrowForward
        className='map-card-arrow'
        style={ styles.goButton }
      />
    </div>
  )
}

const LessonCard = ({ style, lesson }) => {
  return (
    <KiwiLink to={ `/lessons/${ lesson._id }` }>
      <Card
        className='map-card'
        style={ style }
        containerStyle={ styles.container }
      >
        <CardMedia
          className='map-card-image'
          style={ {
            ...styles.media
            , backgroundImage: `url(${ lesson.imageUrl })`
          } }
        />
        <div style={ styles.body }>
          <CardHeader>
            <h2 className='map-card-subject-header'>Lesson Subject</h2>
            <span className='map-card-title' style={ styles.title }>{ lesson.title }</span>
            <span className='map-card-subtitle' style={ styles.subtitle }>{ lesson.subtitle }</span>
          </CardHeader>
          <TimeToComplete minutes={ lesson.minutesToComplete } />
        </div>
        <GoButton />
      </Card>
    </KiwiLink>
  )
}

export default LessonCard