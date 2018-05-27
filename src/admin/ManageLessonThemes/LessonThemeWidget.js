import React, { Component } from 'react'
import * as T from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Delete from 'material-ui-icons/Delete'

const styles = {
  delete: {
    float: 'left'
    , color: '#CCCCCC'
    , marginTop: '15px'
    , marginLeft: '15px'
    , display: 'inline-block'
  },
  card: {
    display: 'inline-block'
  }
}

import KiwiLink from '../../common/KiwiLink'

class LessonThemeWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { item, onDelete } = this.props
    return (
      <KiwiLink to={ `/admin/lessons/themes/${item._id}` }>
        <Card key={ item.name }>
          <CardHeader
            title={ item.name }
            style={ styles.card }
          />
          <Delete style={ styles.delete } onClick={ (e) => onDelete(e, item._id) } />
        </Card>
      </KiwiLink>

  )
  }
}

export default LessonThemeWidget
