import React from 'react'
import Alarm  from 'material-ui-icons/Alarm'
import ArrowForward  from 'material-ui-icons/ArrowForward'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'

import { KiwiLink } from '../common/KiwiLink'

const mediaColor = '#808080'
const textColor = '#A9A9A9'
const timeSectionColor = '#000000'
const goButtonBackgroundColor = '#CCCCCC'

const styles = {
  projectCardContainer: {
    float: 'left'
    , position: 'relative'
    , width: '250px'
    , height: '300px'
    , margin: '20px'
  },
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
  }
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

let ProjectCard = props => {
  const { project: { title, _id } } = props

  return (
    <div>
      <KiwiLink to={ `/project/${_id}` }>
      <Card style={ styles.projectCardContainer } containerStyle={ styles.container }>
        <CardMedia
          style={ styles.media }
        />
        <div style={ styles.body }>
          <CardHeader
            title={ title }
            titleStyle={ styles.titleStyle }
          />
          <CardText
            style={ styles.text }
          >
            "Continue working on your project..."
          </CardText>
        </div>
          <GoButton />
      </Card>
      </KiwiLink>
    </div>
  )
}

export default ProjectCard
