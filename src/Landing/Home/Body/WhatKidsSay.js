import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import { almostWhite } from '../../../colors'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
  root: {
    padding: '10%',
    boxSizing: 'border-box',
    '& img': {
      width: '100%'
    }
  },
  sellingPoint: {
    width: 'calc(100% - 10px)',
    margin: '0 10px 5px 0',
    borderRadius: 5
  },
  sellingPointInLine: {
    display: 'inline-block',
    width: 'calc(33% - 10px)',
    marginBottom: 0,
    verticalAlign: 'bottom '
  },
  sellingPointImage: {
    boxSizing: 'border-box',
  },
  learningNotEnough: {
    fontSize: 'calc(11pt + 0.6vw)',
    display: 'inline-block',
    width: '100%'
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
    paddingTop: '43%',
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
    return(
      <Grid container className={ classes.root } spacing={ 24 }>

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
    )
  }
}

export default withStyles(styles, { withTheme: true })(WhatKidsSay)