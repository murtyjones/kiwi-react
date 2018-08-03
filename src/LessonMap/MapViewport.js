import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  root: {
    width: '100%'
    , height: '100%'
    , backgroundColor: '#46c7f4'
  }
})

class MapViewport extends Component {
  constructor() {
    super()
  }

  render() {
    const { classes, children } = this.props
    return (
      <div className={ classes.root }>
        { children }
      </div>
    )
  }
}

MapViewport.propTypes = {
  classes: T.object,
  children: T.any
}

export default withStyles(styles)(MapViewport)