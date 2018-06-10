import React, { Component } from 'react'
import { Field } from 'redux-form'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOutline from 'material-ui-icons/LockOutline'

import KiwiTextField from '../../../../common/form/KiwiTextField'
import slides from '../slides'
import { email, required, minLength3, minLength6, maxLength20 } from '../../../../utils/validationUtils'
import get from 'lodash/get'

export default class ProvideeSignup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='signupWizardSlide'>
        <Field
          name={ slides[1].names[0] }
          component={ KiwiTextField }
          label='Username'
          StartAdornmentIcon={ AccountCircle }
          validate={ [ minLength3, maxLength20, required ] }
        />
        <Field
          name={ slides[1].names[1] }
          component={ KiwiTextField }
          type='password'
          label='Password'
          StartAdornmentIcon={ LockOutline }
          validate={ [ required, minLength6 ] }
        />
        <Field
          name={ slides[1].names[2] }
          component={ KiwiTextField }
          type='password'
          label='Confirm Password'
          StartAdornmentIcon={ LockOutline }
          validate={ [ required ] }
        />
      </div>
    )
  }
}
