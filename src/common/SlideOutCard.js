import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import posed from 'react-pose'

import { lightPurple, purple } from '../colors'

const HIDDEN = 'HIDDEN'
const VISIBLE = 'VISIBLE'
const TUCKED = 'TUCKED'
const UNTUCKED = 'UNTUCKED'

const duration = 600
const clipPath = 'polygon(' +
      '0% 0%, '     + /* top left */
      '0% 0%, '     + /* top left */
      '100% 0%, '   + /* top right */
      '0% 0%, '   + /* top right */
      '100% 0%, '   + /* bottom right */
      '95% 50%, '+ /* bottom right */
      '100% 100%, '+ /* bottom right */
      '0% 100%, ' + /* bottom left */
      '0% 7% '       + /* bottom left */
    ')'

const cardWidth = 500
const cardHeight = 230

const styles = () => ({
  root: {
    cursor: 'pointer',
    color: '#FFF',
    position: 'absolute',
    zIndex: 100,
    top: '15%',
    left: 0,
    width: cardWidth,
    height: cardHeight,
    backgroundColor: purple,
    clipPath,
    '& p': {
      margin: 0
    }
  },
  inset1: {
    position: 'absolute',
    width: cardWidth - 7,
    top: 3,
    left: 3,
    height: cardHeight - 6,
    clipPath,
    backgroundColor: lightPurple
  },
  inset2: {
    position: 'absolute',
    width: cardWidth - 15,
    top: 3,
    left: 3,
    height: cardHeight - 12,
    padding: 20,
    boxSizing: 'border-box',
    clipPath,
    backgroundColor: purple,
    '& img': {
      verticalAlign: 'top',
      height: '100%',
      borderRadius: 5
    }
  },
  messageContainer: {
    display: 'inline-block',
    width: 'calc(100% - 180px)',
    padding: '0 15px',
    boxSizing: 'border-box'
  },
  header: {
    display: 'inline-block',
    fontFamily: 'Roboto',
    margin: '0 0 10px 0'
  },
  message: {
    fontSize: '11pt',
    marginBottom: 15
  },
  close: {
    fontSize: '10pt',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

let Card = ({ hostRef, classes, onClick, headerText, bodyNode }) =>
  <div ref={ hostRef } onClick={ onClick } className={ classes.root }>
    <div className={ classes.inset1 }>
      <div className={ classes.inset2 }>
        <img
          src='https://res.cloudinary.com/kiwi-prod/image/upload/v1532807288/Carl%20Heads/Carl_happy_4.svg'
        />
        <div className={ classes.messageContainer }>
          <h2 className={ classes.header }>{ headerText }</h2>
          <div
            className={ classes.message }
          >
            { bodyNode }
          </div>
          <span className={ classes.close }>CLOSE</span>
        </div>
      </div>
    </div>
  </div>

Card = posed(Card)({
  [HIDDEN]: {
    x: '-100%', y: 0, transition: { duration }
  },
  [VISIBLE]: {
    x: 0, y: 0, delay: 1500, transition: { duration }
  },
  [TUCKED]: {
    x: '-90%', y: 0, transition: { duration }
  },
  [UNTUCKED]: {
    x: 0, y: 0, transition: { duration }
  },
})

class SlideOutCard extends Component {
  constructor(props) {
    super()

    this.state = {
      pose: props.showCard ? VISIBLE : HIDDEN
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.showCard !== prevProps.showCard) {
      this.setState({ pose: this.props.showCard ? VISIBLE : HIDDEN })
    }
  }

  static propTypes = {
    showCard: T.bool.isRequired,
    classes: T.object.isRequired,
    headerText: T.string.isRequired,
    bodyNode: T.any.isRequired,
  }

  toggleTucking = () => {
    const pose = (this.state.pose === VISIBLE || this.state.pose === UNTUCKED) ? TUCKED : UNTUCKED
    this.setState({ pose })
  }

  render () {
    const { classes, headerText, bodyNode } = this.props
    const { pose } = this.state

    return (
      <Card
        pose={ pose }
        classes={ classes }
        onClick={ this.toggleTucking }
        headerText={ headerText }
        bodyNode={ bodyNode }
      />
    )
  }
}

SlideOutCard = withStyles(styles)(SlideOutCard)

export default SlideOutCard
