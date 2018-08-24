import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import { almostWhite } from '../../../colors'
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
  },
  bubble: {
    background: almostWhite,
    border: `1px solid ${almostWhite}`,
    boxSizing: 'border-box',
    width: 'calc(25% - 5px)',
    marginRight: 5,
    padding: 10,
    borderRadius: 5,
    '&:nth-child(odd)': {
      color: 'rgb(160,190,60)'
    },
    [theme.breakpoints.up('md')]: {
      '&:last-child': {
        width: '25%',
        marginRight: 0,
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px',
      display: 'block',
      width: '100%',
      marginBottom: 10
    }
  },
  bubbleHeading: {
    fontSize: 'calc(14pt + 0.5vw)',
    fontWeight: 'bold',
    display: 'inline-block',
    [theme.breakpoints.up('md')]: {
      minHeight: 56,
    }
  },
  hr: {
    display: 'block',
    height: 1,
    border: 0,
    borderTop: '1px solid #ccc',
    margin: '0.5em 0',
    padding: 0
  }
})

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

        <h1>The Four Phases of Kiwi</h1>

        <Hidden smDown>
          <div
            style={ {
              backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1535079356/Landing%20Page/Version%202/timelinev5.svg)',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              padding: '14%'

            } }
          />
        </Hidden>

        <div className={ classes.bubble }>
          <span className={ classes.bubbleHeading }>Coding Basics</span>
          <hr className={ classes.hr } />
          Learn the basics of a programming language in 10 - 15 hours of lessons.
        </div>
        <div className={ classes.bubble }>
          <span className={ classes.bubbleHeading }>Guided Projects</span>
          <hr className={ classes.hr } />
          Practice the new coding skills and concepts in step by step projects.
        </div>
        <div className={ classes.bubble }>
          <span className={ classes.bubbleHeading }>Independent Projects</span>
          <hr className={ classes.hr } />
          Move to advanced projects with less guidance and learn real world skills.
        </div>
        <div className={ classes.bubble }>
          <span className={ classes.bubbleHeading }>Collaboration</span>
          <hr className={ classes.hr } />
          Work with other kids on projects, while incorporating adult coding tools.
        </div>

      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WhyKiwi)