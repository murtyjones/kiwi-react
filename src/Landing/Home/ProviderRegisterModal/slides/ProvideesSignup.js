import React, { Component } from 'react'
import { Field } from 'redux-form'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOutline from 'material-ui-icons/LockOutline'

import SlideInOut from '../../../../common/animations/SlideInOut'
import KiwiTextField from '../../../../common/form/KiwiTextField'
import { required, minLength6 } from '../../../../utils/validationUtils'

export default class ProvideesSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeFieldIndex: 0,
      isFirstLoad: true
    }
  }

  async componentDidMount() {
    const { isFirstLoad } = this.state
    if (this.props.fields.length === 0 || isFirstLoad) {
      await this.props.fields.push({})
      this.setState({ isFirstLoad: false })
    }
    this.setState({ activeFieldIndex: this.props.fields.length - 1 })
  }

  componentWillUnmount() {
    this.setState({ isFirstLoad: true })
  }

  render() {
    const { fields } = this.props
    const { activeFieldIndex } = this.state

    return fields.map((ref, i) => i === activeFieldIndex
      ?
        <SlideInOut>
          <div key={ i } className='providerRegisterForm-slide'>
            <Field
              name={ `${ref}.firstName` }
              component={ KiwiTextField }
              label='Student First Name'
              validate={ [ required ] }
              addlInputLabelProps={{ shrink: true }}
            />
            <Field
              name={ `${ref}.lastName` }
              component={ KiwiTextField }
              label='Last Name'
              validate={ [ required ] }
              addlInputLabelProps={{ shrink: true }}
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
