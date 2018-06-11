import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import { Elements, injectStripe } from 'react-stripe-elements'
import MenuItem from 'material-ui/MenuItem'

import KiwiTextField from '../../../../common/form/KiwiTextField'
import KiwiSelectField from '../../../../common/form/Select/KiwiSelectField'
import Stripe from '../../../../common/payment/Stripe'
import CardField from '../../../../common/payment/CardField'
import slides from '../slides'
import states from '../../../../utils/statesArray'
import { email, required } from '../../../../utils/validationUtils'

class ProvideesSignupSuccess extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired,
    formValues: T.object.isRequired,
  }

  render() {
    const { formValues } = this.props

    return (
      <div className='providerRegisterForm-slide'>
        <Field
          name={ slides[3].names[0] }
          component={ KiwiTextField }
          label='Name on Card'
          validate={ [ required ] }
          addlInputLabelProps={{ shrink: true }}
        />
        <Field
          name={ slides[3].names[1] }
          component={ KiwiTextField }
          label='Address'
          validate={ [ required ] }
          addlInputLabelProps={{ shrink: true }}
        />
        <Field
          name={ slides[3].names[2] }
          component={ KiwiTextField }
          label='(Optional) Address Line 2'
          addlInputLabelProps={{ shrink: true }}
        />
        <Field
          name={ slides[3].names[3] }
          component={ KiwiTextField }
          label='City'
          validate={ [ required ] }
          addlInputLabelProps={{ shrink: true }}
        />
        <Field
          name={ slides[3].names[4] }
          component={ KiwiSelectField }
          label='State'
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
          validate={ [ v => { console.log('hm', v) }, required ] }
        />
        {/*<CardField />*/}
      </div>
    )
  }
}

ProvideesSignupSuccess = injectStripe(ProvideesSignupSuccess)

export default props =>
  <Stripe>
    <Elements>
      <ProvideesSignupSuccess { ...props } />
    </Elements>
  </Stripe>
