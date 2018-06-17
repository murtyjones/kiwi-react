import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  background: {
    backgroundColor: '#000'
    , zIndex: 400
    , position: 'absolute'
    , height: '100%'
    , width: '100%'
  }
})

const CustomSlideBackground = ({ classes, src }) =>
  <div
    className={ classes.background }
    style={ {
      background: `url(${src}) center center repeat`
    } }
  />



export default withStyles(styles)(CustomSlideBackground)