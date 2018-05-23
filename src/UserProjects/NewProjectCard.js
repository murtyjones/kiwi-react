import React from 'react'
import NoteAdd  from 'material-ui-icons/NoteAdd'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardMedia from 'material-ui/Card/CardMedia'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'

import { KiwiLink } from '../common/KiwiLink'

const mediaColor = '#808080'
const textColor = '#A9A9A9'
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
  },
  cardHeaderStyle: {
    position: 'absolute'
    , bottom: '5px'
    , width: '100%'
  },
  titleStyle: {
    fontSize: '20px'
    , fontWeight: 'bold'
    , width: '100%'
    , textAlign: 'center'
  },
  text: {
    fontSize: '16px'
    , color: textColor
  },
  alarm: {
    color: timeSectionColor
    , verticalAlign: 'middle'
  },
  note: {
    color: '#614F8F'
    , verticalAlign: 'middle'
    , position: 'absolute'
    , top: '50%'
    , marginTop: '-45px'
    , left: '50%'
    , marginLeft: '-45px'
    , width: '90px'
    , height: '90px'
  }
}

const NewProjectCard = props =>
  <div className={ props.className }>
    <KiwiLink to='/project/new'>
      <Card style={ styles.projectCardContainer } containerStyle={ styles.container }>
        <CardHeader
          style={ styles.cardHeaderStyle }
        >
          <div style={ styles.titleStyle }>New Project</div>
        </CardHeader>
        <NoteAdd
          style={ styles.note }
        />
      </Card>
    </KiwiLink>
  </div>

export default NewProjectCard
