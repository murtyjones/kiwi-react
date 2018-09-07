import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'

const styles = theme => ({
  root: {
    fontFamily: 'Arvo',
    height: '100vh',
    width: '100vw',
    zIndex: 51,
    position: 'relative'
  },
  mainText: {
    textAlign: 'right',
    textAlignLast: 'center',
    fontWeight: 'bold',
    fontSize: 'calc(12pt + 1.5vw)',
    color: '#624F8F',
    marginTop: '50vh',
    padding: '0 20px 0 51%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      textAlign: 'center'
    }
  },
  subtext: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 'calc(7pt + 0.7vw)',
    color: '#575757',
    marginTop: '2vh',
    padding: '0 20px 0 52%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: '0 25px',
      textAlign: 'center'
    }
  },

  buttons: {
    marginTop: '2vh',
    textAlign: 'center',
    padding: '0 20px 0 55%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: '0 25px',
      textAlign: 'center'
    }
  },
  button: {
    fontFamily: 'Arvo',
    width: 170,
    backgroundColor: '#624F8F',
    color: '#FFFFFF',
    padding: '10px 25px',
    borderRadius: '25px',
    fontSize: '12pt',
    border: '2px solid #624F8F',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 51,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: '25px auto 0 auto !important'
    }
  },
  signupButton: {
    marginRight: 10
  },
  learnButton: {
    color: '#624F8F',
    background: 'none'
  },
})

class DynamicCTA extends PureComponent {
  constructor(props) {
    super()
  }

  static propTypes = {
    classes: T.object,
    onSignUpClick: T.func,
    onLearnMoreClick: T.func,
    text: T.string.isRequired,
    subtext: T.string.isRequired
  }

  render() {
    const { classes, text = '', subtext = '' } = this.props

    return (
      <div className={ classes.root }>

        <div className={ classes.mainText }>
          { text }
        </div>

        <div className={ classes.subtext }>
          { subtext }
        </div>


        <div className={ classes.buttons }>
          <button
            id='sign-me-up-top-fold'
            className={ cns(classes.button, classes.signupButton, 'hvr-grow') }
            onClick={ this.props.onSignUpClick }
          >
            Start for Free
          </button>


          <button
            id='learn-more'
            className={ cns(classes.button, classes.learnButton, 'hvr-grow') }
            onClick={ this.props.onLearnMoreClick }
          >
            Learn More
          </button>
        </div>

      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DynamicCTA)
