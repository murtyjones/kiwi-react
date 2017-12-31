import React, { Component } from 'react'
import * as T from 'prop-types'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Reorder from 'material-ui-icons/Reorder'

const styles = {
  reorder: {
    cursor: 'row-resize'
    , float: 'left'
    , color: '#CCCCCC'
    , marginTop: '25px'
    , marginLeft: '20px'
    , display: 'inline-block'
  },
  card: {
    display: 'inline-block'
  }
}

import { KiwiLink } from '../../common/KiwiLink'

class LessonWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { item, draggable = true } = this.props
    return (
      <KiwiLink to={ `/admin/lessons/themes/${item._id}` }>
        <Card key={ item.name }>
          { draggable && <Reorder style={ styles.reorder } /> }
          <CardHeader
            title={ item.name }
            style={ styles.card }
          />
        </Card>
      </KiwiLink>

  )
  }
}

export default LessonWidget