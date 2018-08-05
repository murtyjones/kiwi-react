import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import slideImages from './slideImages'

import SlideInOut from '../../common/animations/SlideInOut'

const styles = theme => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: `url(${slideImages[8]})`,
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
