import React, { Component } from 'react'
import * as T from 'prop-types'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Reorder from 'material-ui-icons/Reorder'

import { KiwiLink } from '../../common/KiwiLink'

class LessonWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { item, draggable = true } = this.props
    return (
      <KiwiLink to={ `/admin/lesson/${item._id}` }>
        <Card key={ item.title }>
          { draggable && <Reorder /> }
          <CardHeader
            title={ item.title }
            subtitle={ item.subtitle }
          />
        </Card>
      </KiwiLink>

  )
  }
}

export default LessonWidget