import React, { Component } from 'react'
import { Field } from 'redux-form'
import MailOutline from '@material-ui/icons/MailOutline'
import LockOutline from 'material-ui-icons/LockOutline'
import SlideInOut from '../../../../common/animations/SlideInOut'


import KiwiTextField from '../../../../common/form/KiwiTextField'
import { providerSignupSlide } from '../slides'
import { email, required, minLength6 } from '../../../../utils/validationUtils'

export default class ProviderSignup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
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
        </div>
      </SlideInOut>
    )
  }
}
