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
    display: 'inline-block'
    , float: 'left'
    , position: 'relative'
    , width: 'calc(100% - 10px)'
    , height: '100%'
  },
  container: {
    height:'100%'
  },
  colorBar: {
    display: 'inline-block'
    , float: 'left'
    , width: '10px'
    , height: '100%'
  },
  media: {
    height: '10%'
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
  lastEdited: {
    fontSize: '12px'
    //, textTransform: 'uppercase'
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
  const { className, project: { title, _id, updatedAt, code }, createdAtRanking } = props
    , lastEdited = moment.utc(updatedAt).from(moment.utc())
    , linesOfCode = code.split("\n").length
    , linesOrLine = linesOfCode > 1 ? 'lines' : 'line'

  return (
    <div className={ className }>
      <KiwiLink to={ `/project/${_id}` }>
      <div style={ { ...styles.colorBar, backgroundColor: colorOrders[createdAtRanking % colorOrders.length] } } />
      <Card style={ styles.projectCardContainer } containerStyle={ styles.container }>
        <div style={ styles.body }>
          <div style={ styles.lastEdited }>Last edited { lastEdited }</div>
          <CardHeader>
            <div style={ styles.titleStyle }>{ title }</div>
          </CardHeader>
          <CardText>
            <div style={ styles.text }>{ linesOfCode } { linesOrLine } of code</div>
          </CardText>
        </div>

      </Card>
      </KiwiLink>
    </div>
  )
}

export default ProjectCard
