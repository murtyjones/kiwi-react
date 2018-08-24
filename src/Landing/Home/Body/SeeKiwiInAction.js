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
    width: '100%',
    maxWidth: '900px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      width: '80%',
    },
    padding: '4% 20px',
    boxSizing: 'border-box',
    '& img': {
      width: '100%'
    }
  },
  playerContainer: {
    position: 'relative',
    width: '50%',
    paddingTop: '30%',
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
    bottom: 10,
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
    bottom: 10,
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
      <Grid container className={ classes.root } spacing={ 0 }>

        <h1>See Kiwi in Action</h1>

        <div className={ classes.playerContainer }>
          <ReactPlayer
            className={ classes.playerLeft }
            controls={ true }
            width='100%'
            height='calc(100% - 45px)'
            url='https://youtu.be/WKWCoybQThM'
          />
          <div style={ {
            textAlign: 'center',
            fontSize: '14pt'
          } }>
            Take a tour of Kiwi and learn why kids love us!
          </div>
        </div>

        <div className={ classes.playerContainer }>
          <ReactPlayer
            className={ classes.playerRight }
            controls={ true }
            width='100%'
            height='calc(100% - 45px)'
            url='https://www.youtube.com/watch?v=3RX-aL_uR5I'
          />
          <div style={ {
            textAlign: 'center',
            fontSize: '14pt'
          } }>
            See why The NSF funded Kiwi.
          </div>
        </div>

      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SeeKiwiInAction)