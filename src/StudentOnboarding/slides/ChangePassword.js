import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SlideInOut from '../../common/animations/SlideInOut'
import KiwiTextField from '../../common/form/KiwiTextField'

const styles = theme => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%'
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
          <Field
            name='newPassword'
            label='New Password'
            component={ KiwiTextField }
            type='password'
          />
          <Field
            name='confirmPassword'
            label='Confirm Password'
            component={ KiwiTextField }
            type='password'
          />
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Slide)
