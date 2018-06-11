import React, { Component, Fragment } from 'react'
import { Field } from 'redux-form'
import MailOutline from '@material-ui/icons/MailOutline'
import LockOutline from 'material-ui-icons/LockOutline'
import { CSSTransition } from 'react-transition-group'


import KiwiTextField from '../../../../common/form/KiwiTextField'
import slides from '../slides'
import { email, required, minLength6 } from '../../../../utils/validationUtils'

export default class ProviderSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.setState({ show: true })
  }

  componentWillUnmount() {
    this.setState({ show: false })
  }

  render() {
    const { show } = this.state
    return (
      <CSSTransition
        in={ show }
        classNames='slideInOut'
        timeout={ 300 }
        // mountOnEnter={ true }
        // unmountOnExit={ true }
      >
        <div className='providerRegisterForm-slide'>
          <Field
            name={ slides[0].names[0] }
            component={ KiwiTextField }
            label='Email'
            StartAdornmentIcon={ MailOutline }
            validate={ [ email, required ] }
          />
          <Field
            name={ slides[0].names[1] }
            component={ KiwiTextField }
            type='password'
            label='Password'
            StartAdornmentIcon={ LockOutline }
            validate={ [ required, minLength6 ] }
          />
          <Field
            name={ slides[0].names[2] }
            component={ KiwiTextField }
            type='password'
            label='Confirm Password'
            StartAdornmentIcon={ LockOutline }
            validate={ [ required ] }
          />
        </div>
      </CSSTransition>
    )
  }
}
