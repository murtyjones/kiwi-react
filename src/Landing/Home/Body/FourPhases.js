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
        marginRight: 0,
        width: '25%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      padding: '10px 20px',
      display: 'block',
      width: '100%',
      marginBottom: 10
    }
  },
  bubbleHeading: {
    fontSize: 'calc(14pt + 0.5vw)',
    fontWeight: 'bold',
    display: 'table',
    width: '100%',
    '& span': {
      display: 'table-cell',
      width: '100%',
      verticalAlign: 'middle'
    },
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
      <div className={ classes.container }>
        <Grid container className={ classes.root } spacing={ 0 }>

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
            <div className={ classes.bubbleHeading }>
              <span>Coding Basics</span>
            </div>
            <hr className={ classes.hr } />
            Learn the basics of a programming language in 10 - 15 hours of lessons.
          </div>
          <div className={ classes.bubble }>
            <div className={ classes.bubbleHeading }>
              <span>Guided Projects</span>
            </div>
            <hr className={ classes.hr } />
            Practice the new coding skills and concepts in step by step projects.
          </div>
          <div className={ classes.bubble }>
            <div className={ classes.bubbleHeading }>
              <span>Independent Projects</span>
            </div>
            <hr className={ classes.hr } />
            Move to advanced projects with less guidance and learn real world skills.
          </div>
          <div className={ classes.bubble }>
            <div className={ classes.bubbleHeading }>
              <span>Collaboration</span>
            </div>
            <hr className={ classes.hr } />
            Work with other kids on projects, while incorporating adult coding tools.
          </div>

        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WhyKiwi)