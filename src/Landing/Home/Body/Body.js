import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { purple } from '../../../colors'
import WhyKiwi from './WhyKiwi'
import FourPhases from './FourPhases'
import SeeKiwiInAction from './SeeKiwiInAction'
import WhatKidsSay from './WhatKidsSay'
import SupportedBy from './SupportedBy'

const styles = theme => ({
  root: {
    fontFamily: 'Roboto',
    color: purple,

    '& h1': {
      width: '100%',
      fontFamily: 'Arvo',
      marginTop: 0,
      textAlign: 'center',
      fontSize: 'calc(14pt + 1.2vw)',
    }
  }
})

class Body extends Component {
  constructor(props) {
    super()
  }

  static propTypes = {
    classes: T.object.isRequired,
  }

  render() {
    const { classes } = this.props
    return(
      <div className={ classes.root }>
        <WhyKiwi />
        <FourPhases />
        <SeeKiwiInAction />
        <WhatKidsSay />
        <SupportedBy />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Body)