import React, { Component } from 'react'
import * as T from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

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

import { KiwiLink } from '../../common/KiwiLink'

class VariableWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { item } = this.props
    return (
      <KiwiLink to={ `/admin/variables/${item._id}` }>
        <Card key={ item.name }>
          <CardHeader
            title={ item.name }
            style={ styles.card }
          />
        </Card>
      </KiwiLink>

  )
  }
}

export default VariableWidget