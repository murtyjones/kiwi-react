import React, { Component } from 'react'
import cns from 'classnames'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import withRouter from 'react-router-dom/withRouter'
import Email from '@material-ui/icons/Email'

import SlideInOut from '../../../../common/animations/SlideInOut'
import { email, required } from '../../../../utils/validationUtils'
import { providerForgotPasswordSlide } from '../slides'
import KiwiTextField from '../../../../common/form/KiwiTextField'


const styles = theme => ({
  container: {

  }
})

class ProviderForgotPassword extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut show={ true }>
        <Field
          name={ providerForgotPasswordSlide.name }
          label='Email'
          component={ KiwiTextField }
          StartAdornmentIcon={ Email }
          validate={ [ email, required ] }
        />
      </SlideInOut>
    )
  }
}

ProviderForgotPassword = withRouter(ProviderForgotPassword)

export default withStyles(styles, { withTheme: true })(ProviderForgotPassword)
