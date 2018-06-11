import React from 'react'
import { CardElement } from 'react-stripe-elements'

const CardSection = props => <CardElement style={ props.cardStyle } />

const CardField = props =>
  <div className='CardField-container' style={ props.containerStyle } >
    <CardSection
      className='CardField-input'
      { ...props }
    />
  </div>

export default CardField
