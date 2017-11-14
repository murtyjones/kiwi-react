import React, { Component } from 'react'
import * as T from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'


import { KiwiLink } from '../common/KiwiLink'

const renderLessonCard = ({ style }) => {
  return (
    <Card style={ style }>
      <CardHeader
        title={ 'Lesson 1' }
      />
      <CardText>
        Here we go
      </CardText>
    </Card>
  )
}

export default renderLessonCard