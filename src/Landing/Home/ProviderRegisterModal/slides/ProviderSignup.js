import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import MailOutline from '@material-ui/icons/MailOutline'
import LockOutline from '@material-ui/icons/LockOutline'
import withStyles from '@material-ui/core/styles/withStyles'
import SlideInOut from '../../../../common/animations/SlideInOut'


import KiwiTextField from '../../../../common/form/KiwiTextField'
import KiwiCheckBox from '../../../../common/form/KiwiCheckBox'
import { providerSignupSlide } from '../slides'
import { email, required, mustBeChecked, minLength6 } from '../../../../utils/validationUtils'

const styles = () => ({
  checkbox: {
    width: '80%'
  }
})

class ProviderSignup extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    classes: T.object.isRequired
  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut show={ true }>
        <div className='providerRegisterForm-slide'>
          <Field
            name={ providerSignupSlide.names[0] }
            component={ KiwiTextField }
            label='Email'
            StartAdornmentIcon={ MailOutline }
            validate={ [ email, required ] }
          />
          <Field
            name={ providerSignupSlide.names[1] }
            component={ KiwiTextField }
            type='password'
            label='Password'
            StartAdornmentIcon={ LockOutline }
            validate={ [ required, minLength6 ] }
          />
          <Field
            name={ providerSignupSlide.names[2] }
            component={ KiwiTextField }
            type='password'
            label='Confirm Password'
            StartAdornmentIcon={ LockOutline }
            validate={ [ required ] }
          />
          <Field
            name={ providerSignupSlide.names[3] }
            component={ KiwiCheckBox }
            className={ classes.checkbox }
            label='I have read an accept the terms of service'
            labelPosition='right'
            validate={ [ mustBeChecked ] }
          />
        </div>
      </SlideInOut>
    )
  }
}

ProviderSignup = withStyles(styles)(ProviderSignup)

export default ProviderSignup
