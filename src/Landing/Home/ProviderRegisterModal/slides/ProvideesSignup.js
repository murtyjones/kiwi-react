import React, { Component } from 'react'
import { Field } from 'redux-form'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOutline from 'material-ui-icons/LockOutline'

import SlideInOut from '../../../../common/animations/SlideInOut'
import KiwiTextField from '../../../../common/form/KiwiTextField'
import { required, minLength3, minLength6, maxLength20 } from '../../../../utils/validationUtils'

export default class ProvideesSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeFieldIndex: 0
    }
  }

  componentDidMount() {
    const { fields } = this.props
    if (fields.length === 0) {
      fields.push({})
    }
  }

  componentWillUnmount() {
    this.props.fields.push({})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fields.length === 0) {
      nextProps.fields.push({})
    } else {
      this.setState({ activeFieldIndex: nextProps.fields.length - 1 })
    }
  }

  render() {
    const { fields } = this.props
    const { activeFieldIndex } = this.state

    return fields.map((ref, i) => i === activeFieldIndex
      ?
        <SlideInOut>
          <div key={ i } className='providerRegisterForm-slide'>
            <Field
              name={ `${ref}.username` }
              component={ KiwiTextField }
              label='Username'
              StartAdornmentIcon={ AccountCircle }
              validate={ [ minLength3, maxLength20, required ] }
            />
            <Field
              name={ `${ref}.password` }
              component={ KiwiTextField }
              type='password'
              label='Password'
              StartAdornmentIcon={ LockOutline }
              validate={ [ required, minLength6 ] }
            />
            <Field
              name={ `${ref}.confirmPassword` }
              component={ KiwiTextField }
              type='password'
              label='Confirm Password'
              StartAdornmentIcon={ LockOutline }
              validate={ [ required ] }
            />
          </div>
      </SlideInOut>
      : null
    )
  }
}
