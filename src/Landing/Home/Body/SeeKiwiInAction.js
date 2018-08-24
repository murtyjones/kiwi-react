import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import { almostWhite } from '../../../colors'
import Hidden from '@material-ui/core/Hidden'
import ReactPlayer from "react-player";

const styles = theme => ({
  root: {
    padding: '8%',
    boxSizing: 'border-box',
    '& img': {
      width: '100%'
    }
  },
  playerContainer: {
    position: 'relative',
    width: '50%',
    paddingTop: '27%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
      paddingTop: '56.5%',
      width: '100%',
    }
  },
  playerLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 5,
    [theme.breakpoints.down('sm')]: {
      right: 0,
      left: 0,
    }
  },
  playerRight: {
    position: 'absolute',
    top: 0,
    left: 5,
    right: 0,
    [theme.breakpoints.down('sm')]: {
      right: 0,
      left: 0,
    }
  }
})

class SeeKiwiInAction extends Component {
  constructor(props) {
    super()
  }

  static propTypes = {
    classes: T.object.isRequired,
  }

  render() {
    const { classes } = this.props
    return(
      <Grid container className={ classes.root } spacing={ 24 }>

        <h1>See Kiwi in Action</h1>

        <div className={ classes.playerContainer }>
          <ReactPlayer
            className={ classes.playerLeft }
            controls={ true }
            width='100%'
            height='100%'
            // style={ {
            //   position: 'absolute',
            //   top: 0,
            //   left: 0,
            //   right: 5
            // } }
            url='https://youtu.be/WKWCoybQThM'
          />
        </div>

        <div className={ classes.playerContainer }>
          <ReactPlayer
            className={ classes.playerRight }
            controls={ true }
            width='100%'
            height='100%'
            // style={ {
            //   position: 'absolute',
            //   top: 0,
            //   left: 5
            // } }
            url='https://www.youtube.com/watch?v=3RX-aL_uR5I'
          />
        </div>

      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SeeKiwiInAction)