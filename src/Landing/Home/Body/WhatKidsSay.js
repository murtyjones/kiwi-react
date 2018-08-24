import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import { almostWhite } from '../../../colors'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
  container: {
    background: 'white',
  },
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
  bubble: {
    textAlign: 'center',
    display: 'inline-block',
    width: '33%',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px',
      display: 'block',
      width: '100%',
      marginBottom: 10
    }
  },
  bubbleText: {
    display: 'inline-block',
    minHeight: 65,
    padding: '0 10px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 175
    }
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    paddingTop: 'calc(80px + 10vw)',
    maxWidth: 200,
    margin: '0 auto'
  }
})

const Bubble = ({ src, classes, text, by }) =>
  <div className={ classes.bubble }>
    <div className={ classes.image }
       style={ { backgroundImage: `url(${src})` } }
    />
    <br />
    <span className={ classes.bubbleText }>
      { text }
    </span>
    <div style={ { fontWeight: 'bold' } }>
      { by }<br />
    </div>

  </div>

class WhatKidsSay extends Component {
  constructor(props) {
    super()
  }

  static propTypes = {
    classes: T.object.isRequired,
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.container }>
        <Grid container className={ classes.root } spacing={ 0 }>

          <h1>What Kids Say</h1>

          <Bubble
            classes={ classes }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535079946/Landing%20Page/Version%202/girlv2.svg'
            text='"It’s fun to follow along with the stories while learning coding."'
            by='– Sasha, 14 years old'
          />

          <Bubble
            classes={ classes }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535079946/Landing%20Page/Version%202/boyv2.svg'
            text='"I love that it helps you to code and you learn new things. It’s really creative."'
            by='– Myles, 13 years old'
          />

          <Bubble
            classes={ classes }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535079946/Landing%20Page/Version%202/blackhairv2.svg'
            text='"I like that it has a creative environment and teaches you in a fun way."'
            by='– Katherine, 13 years old'
          />

        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WhatKidsSay)