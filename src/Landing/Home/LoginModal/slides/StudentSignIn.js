import React, { Component } from 'react'
import cns from 'classnames'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SlideInOut from '../../../../common/animations/SlideInOut'
import { studentSignInSlide } from '../slides'
import KiwiTextField from "../../../../common/form/KiwiTextField"


const styles = theme => ({
  container: {

  }
})

class StudentSignIn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut show={ true }>
        <div className={ cns('loginModalForm-slide', classes.container) }>
          <Field
            name={ studentSignInSlide.names[0] }
            label='Username'
            component={ KiwiTextField }
          />
          <Field
            name={ studentSignInSlide.names[1] }
            label='Password'
            component={ KiwiTextField }
          />
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(StudentSignIn)
