import React from 'react'
import Alarm  from 'material-ui-icons/Alarm'
import ArrowForward  from 'material-ui-icons/ArrowForward'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardMedia from 'material-ui/Card/CardMedia'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import moment from 'moment'

import KiwiLink from '../common/KiwiLink'
import assets from './cardAssets'

const mediaColor = '#FFFFFF'
const textColor = '#dfdfdf'
const timeSectionColor = '#000000'
const goButtonBackgroundColor = '#CCCCCC'

const styles = {
  projectCardContainer: {
    position: 'absolute'
    , top: '0'
    , left: '0'
    , bottom: '0'
    , right: '0'
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
  topOfCard: {
    width: '100%'
    , height: '60%'
    , float: 'left'
    , display: 'block'
    , backgroundColor: mediaColor
    , textAlign: 'center'
  },
  bottomOfCard: {
    width: '100%'
    , height: '40%'
    , float: 'left'
    , display: 'block'
  },
  titleStyle: {
    fontSize: '20px'
    , fontWeight: 'bold'
    , color: '#FFFFFF'
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
  const { className, project: { title, _id, updatedAt, code }, iconName, iconColor, onClick } = props
    , lastEdited = moment.utc(updatedAt).from(moment.utc())
    , linesOfCode = code.split("\n").length
    , linesOrLine = linesOfCode > 1 ? 'lines' : 'line'

  return (
    <div className={ className }>
      <KiwiLink
        to={ `/project/${_id}` }
        onClick={ onClick }
      >
        <Card
          className='card'
          style={ styles.projectCardContainer }
          containerStyle={ styles.container }
        >
          <CardMedia
            style={ styles.topOfCard }
            mediaStyle={ styles.container }
          >
            { iconName &&
             <SVG
              iconName={ iconName }
              iconColor={ iconColor }
             />
            }
          </CardMedia>

          <div style={ {
            ...styles.bottomOfCard
            , backgroundColor: iconColor
          } }>
            <CardHeader>
              <div style={ styles.lastEdited }>Last edited { lastEdited }</div>
              <div style={ styles.titleStyle }>{ title }</div>
              <div style={ styles.text }>{ linesOfCode } { linesOrLine } of code</div>
            </CardHeader>
          </div>

        </Card>
      </KiwiLink>
    </div>
  )
}

export default ProjectCard
