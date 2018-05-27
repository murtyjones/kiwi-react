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

import KiwiLink from '../../common/KiwiLink'

class SubscriptionWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { subscription, providee = {} } = this.props
    return (
      <KiwiLink to={ `/admin/subscriptions/${subscription._id}` }>
        <Card key={ subscription._id }>
          <CardHeader
            title={ providee.username }
            style={ styles.card }
          />
        </Card>
      </KiwiLink>

  )
  }
}

export default SubscriptionWidget
