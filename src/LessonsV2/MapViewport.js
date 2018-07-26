import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    width: '100vw'
    , height: 'calc(100vw * 768 / 1366)'
    , position: 'relative'
    , top: '50%'
    , marginTop: 'calc(-100vw * 768 / 1366 / 2)'
  },
  section: {
    width: '100%'
    , height: '100%'
    , backgroundPosition: 'center center'
    , backgroundRepeat: 'no-repeat'
    , backgroundSize: '100%'
  },
  section1: {
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1532556273/Map/map-section-1.svg)'
  },
})

class MapViewport extends Component {
  constructor() {
    super()
  }

  render() {
    const { classes, children } = this.props
    return (
      <div className={ classes.root }>
        <div className={ cns(classes.section, classes.section1) }>
          { children }
        </div>
      </div>
    )
  }
}

MapViewport.propTypes = {
  classes: T.object,
  children: T.any
}

export default withStyles(styles)(MapViewport)