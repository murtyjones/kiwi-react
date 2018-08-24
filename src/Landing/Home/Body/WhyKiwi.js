import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import { purple } from '../../../colors'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
  root: {
    padding: '8%',
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
    // padding: 10,
    boxSizing: 'border-box',
  },
  learningNotEnough: {
    fontSize: 'calc(11pt + 0.6vw)',
    display: 'inline-block',
    width: '100%'
  }
})

const Bubble = ({ src, className, imageClassName }) =>
  <div className={ className }>
    <img
      className={ imageClassName }
      src={ src }
    />
  </div>

class WhyKiwi extends Component {
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
        <Hidden smDown>
          <Grid item xs={ 5 }>
            <img src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535053612/marty.png' />
          </Grid>
        </Hidden>
        <Grid item sm={ 12 } md={ 7 }>
          <h1>Why Choose Kiwi?</h1>
          <Grid container>
            <div className={ classes.learningNotEnough }>
              Learning block coding isn’t enough. We need to teach the next generation how to think critically and interact with technology.<br />
              <br />
              Kiwi teaches middle schoolers the hard parts of coding and helps them become self-taught developers.
              <Hidden xsDown>
                <div style={ { marginTop: 22 } }>
                  <Bubble
                    src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535066990/Landing%20Page/Version%202/message_bubble.svg'
                    className={ cns(classes.sellingPoint, classes.sellingPointInLine) }
                    imageClassName={ classes.sellingPointImage }
                  />
                  <Bubble
                    src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535066990/Landing%20Page/Version%202/computer.svg'
                    className={ cns(classes.sellingPoint, classes.sellingPointInLine) }
                    imageClassName={ classes.sellingPointImage }
                  />
                  <Bubble
                    src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535066990/Landing%20Page/Version%202/Brain_bubble.svg'
                    className={ cns(classes.sellingPoint, classes.sellingPointInLine) }
                    imageClassName={ classes.sellingPointImage }
                  />
                </div>
              </Hidden>
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WhyKiwi)