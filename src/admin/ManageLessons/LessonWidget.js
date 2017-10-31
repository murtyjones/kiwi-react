import React, { Component } from 'react'
import * as T from 'prop-types'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'


import { KiwiLink } from '../../common/KiwiLink'

class LessonWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { lesson } = this.props
    return (
      <KiwiLink to={ `/admin/lesson/${lesson._id}` }>
        <Card key={ lesson.title }>
          <CardHeader
            title={ lesson.title }
            subtitle={ lesson.subtitle }
          />
        </Card>
      </KiwiLink>

  )
  }
}

export default LessonWidget