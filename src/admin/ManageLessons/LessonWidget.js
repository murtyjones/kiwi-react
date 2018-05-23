import React, { Component } from 'react'
import Card from 'material-ui/Card'
import CardHeader from 'material-ui/Card/CardHeader'
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

class LessonWidget extends Component {F
  constructor(props) {
    super(props)
  }

  render() {
    const { item, draggable = true } = this.props
    return (
      <KiwiLink to={ `/admin/lessons/${item._id}` }>
        <Card key={ item.title }>
          { draggable && <Reorder style={ styles.reorder } /> }
          <CardHeader
            title={ item.title }
            subtitle={ item.subtitle }
            style={ styles.card }
          />
        </Card>
      </KiwiLink>

  )
  }
}

export default LessonWidget