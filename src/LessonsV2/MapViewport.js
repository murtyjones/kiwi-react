import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from "@material-ui/core/styles/withStyles";

const maxHeight = 'calc(100vh - 60px)'

const styles = () => ({
  root: {
    width: '100vw'
    , maxWidth: `calc(${maxHeight} * 1366 / 768)`
    , height: 'calc(100vw * 768 / 1366)'
    , maxHeight: maxHeight
    , margin: 'auto auto'
    , position: 'relative'
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