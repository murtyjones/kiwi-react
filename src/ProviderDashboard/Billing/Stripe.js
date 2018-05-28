import React from 'react'
import { StripeProvider } from 'react-stripe-elements'
import config from 'config'


const Stripe = props => {
  return (
    <StripeProvider apiKey={ config.stripePublishableKey }>
      { props.children }
    </StripeProvider>
  )
}

export default Stripe
