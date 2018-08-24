import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import { almostWhite } from '../../../colors'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '900px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      width: '80%',
    },
    padding: '4% 20px',
    boxSizing: 'border-box'
  },
  img: {
    verticalAlign: 'middle',
    margin: '0 8px',
    [theme.breakpoints.down('sm')]: {
      margin: '15px auto',
      display: 'block'
    }
  }
})

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
      <Grid container className={ classes.root } spacing={ 0 }>

        <h1>Kiwi is Supported By...</h1>

        <div style={ { width: '100%', textAlign: 'center' } }>
          <img
            className={ classes.img }
            style={ { height: 100, width: 'auto' } }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535055974/Landing%20Page/Version%202/NSF.svg'
          />
          <img
            className={ classes.img }
            style={ { height: 50, width: 'auto' } }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535122176/mozilla_fllusj.jpg'
          />
          <img
            className={ classes.img }
            style={ { height: 50, width: 'auto' } }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535123818/google_eljnya.svg'
          />
          <img
            className={ classes.img }
            style={ { height: 50, width: 'auto' } }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535126017/Landing%20Page/Version%202/usignite.svg'
          />
          <img
            className={ classes.img }
            style={ { height: 80, width: 'auto' } }
            src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535124521/austin_im5cra.gif'
          />
        </div>

      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WhatKidsSay)