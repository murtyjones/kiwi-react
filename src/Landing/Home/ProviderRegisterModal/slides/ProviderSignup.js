import React, { Component } from 'react'
import { Field } from 'redux-form'
import KiwiTextField from '../../../../common/form/KiwiTextField'
import MailOutline from '@material-ui/icons/MailOutline'
import LockOutline from 'material-ui-icons/LockOutline'

import slides from '../slides'

export default class ProviderSignup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { fields } = this.props

    return (
      <div className='signupWizardSlide'>
        <Field
          name={ slides[0].names[0] }
          component={ KiwiTextField }
          label='Email'
          StartAdornmentIcon={ MailOutline }
        />
        <Field
          name={ slides[0].names[1] }
          component={ KiwiTextField }
          label='Password'
          StartAdornmentIcon={ LockOutline }
        />
        <Field
          name={ slides[0].names[2] }
          component={ KiwiTextField }
          label='Confirm Password'
          StartAdornmentIcon={ LockOutline }
        />
      </div>
    )
  }
}
