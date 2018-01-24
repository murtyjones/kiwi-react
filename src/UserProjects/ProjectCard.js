import React from 'react'
import Alarm  from 'material-ui-icons/Alarm'
import ArrowForward  from 'material-ui-icons/ArrowForward'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'
import moment from 'moment'

import { KiwiLink } from '../common/KiwiLink'
import colorOrders from './colorOrder'

const mediaColor = '#808080'
const textColor = '#A9A9A9'
const timeSectionColor = '#000000'
const goButtonBackgroundColor = '#CCCCCC'

const styles = {
  projectCardContainer: {
    float: 'left'
    , position: 'relative'
    , width: '250px'
    , height: '250px'
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

const ProjectCard = props => {
  const { project: { title, _id, updatedAt }, colorPos } = props
    , lastEdited = moment.utc(updatedAt).from(moment.utc())

  return (
    <div>
      <KiwiLink to={ `/project/${_id}` }>
      <Card style={ styles.projectCardContainer } containerStyle={ styles.container }>
        <CardMedia
          style={ { ...styles.media, backgroundColor: colorOrders[colorPos % colorOrders.length] } }
        />
        <div style={ styles.body }>
          <CardHeader>
            <div style={ styles.titleStyle }>{ title }</div>
          </CardHeader>
          <CardText>
            <div style={ styles.text }>Last edited { lastEdited }</div>
          </CardText>
        </div>

      </Card>
      </KiwiLink>
    </div>
  )
}

export default ProjectCard
