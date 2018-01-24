import React from 'react'
import Alarm  from 'material-ui-icons/Alarm'
import ArrowForward  from 'material-ui-icons/ArrowForward'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'
import moment from 'moment'

import { KiwiLink } from '../common/KiwiLink'
import { colorOrder, iconOrder } from './assetAssignment'
import assets from './cardAssets'

const mediaColor = '#FFFFFF'
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
    , width: '100%'
  },
  colorBar: {
    display: 'inline-block'
    , float: 'left'
    , width: '10px'
    , height: '100%'
  },
  leftSide: {
    width: '37.5%'
    , float: 'left'
    , display: 'inline-block'
    , height: '100%'
    , backgroundColor: mediaColor
    , textAlign: 'center'
  },
  rightSide: {
    float: 'left'
    , display: 'inline-block'
    , width: '62.5%'
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
  },
  projectIcon: {
    display: 'inline-block'
    , position: 'relative'
    , height: '90px'
    , top: '50%'
    , marginTop: '-45px'
  }
}

const SVG = props =>
  <div style={ styles.projectIcon }>
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      style={ { fill: props.iconColor } }
      viewBox={ assets[props.iconName].viewBox }
      height='100%'
    >
      <path d={ assets[props.iconName].d1 } />
      <path d={ assets[props.iconName].d2 } />
    </svg>
  </div>

const ProjectCard = props => {
  const { className, project: { title, _id, updatedAt, code }, createdAtRanking } = props
    , lastEdited = moment.utc(updatedAt).from(moment.utc())
    , linesOfCode = code.split("\n").length
    , linesOrLine = linesOfCode > 1 ? 'lines' : 'line'
    , iconName = iconOrder[createdAtRanking % iconOrder.length]
    , iconColor = colorOrder[createdAtRanking % colorOrder.length]

  return (
    <div className={ className }>
      <KiwiLink to={ `/project/${_id}` }>
        <Card
          style={ styles.projectCardContainer }
          containerStyle={ styles.container }
        >
          <CardMedia
            style={ styles.leftSide }
            mediaStyle={ styles.container }
          >
            { iconName &&
             <SVG
              iconName={ iconName }
              iconColor={ iconColor }
             />
            }
          </CardMedia>

          <div style={ styles.rightSide }>
            <CardHeader>
            <div style={ styles.lastEdited }>Last edited { lastEdited }</div>
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
