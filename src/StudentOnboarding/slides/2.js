import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SlideInOut from '../../common/animations/SlideInOut'

const styles = theme => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1530839217/Onboarding%20v2/Slide%202.svg)',
    backgroundSize: '100%',
    backgroundPositionY: 'center'
  }
})

class Slide extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {

  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut>
        <div className={ classes.root }>

        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Slide)
