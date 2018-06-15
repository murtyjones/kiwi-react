import React from 'react'
import { CardElement } from 'react-stripe-elements'
import InputLabel from '@material-ui/core/InputLabel'

import './overrides.css'

const CardSection = props =>
  <CardElement
    className='CardField-input'
    style={ {
      base: {
        color: '#000'
        , fontSize: '16px'
        , lineHeight: '44px'
        , height: '44px',
        '::placeholder': {
          color: '#AAA',
        },
      },
      invalid: {
        color: '#cc5040',
        ':focus': {
          color: '#000',
        },
      },
    } }
  />

const CardField = props =>
  <div className='KiwiField CardField-container' style={ props.containerStyle } >
    <InputLabel
      classes={{
        root: 'KiwiField-Label'
      }}
    >
      Credit Card
    </InputLabel>
    <CardSection
      { ...props }
    />
  </div>

export default CardField
