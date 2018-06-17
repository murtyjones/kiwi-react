import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Button from '@material-ui/core/Button'
import MenuItem from 'material-ui/MenuItem'
import get from 'lodash/get'
import { injectStripe } from 'react-stripe-elements'

import KiwiTextField from '../../common/form/KiwiTextField'
import KiwiSelectField from '../../common/form/Select/KiwiSelectField'
import CardField from '../../common/form/payment/CardField'

import states from '../../utils/statesArray'

export const formName = 'providerDashboard-billing'

const styles = {
  form: {
    width: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  }
}

class BillingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changingCard: false
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onVerificationEmailClick: T.func.isRequired
    , last4: T.string
  }

  resendVerificationEmail = () => {
    this.props.onVerificationEmailClick()
  }

  createToken = async v => {
    const { onSubmit, last4 } = this.props
    const { changingCard } = this.state
    try {
      const params = {
        name: v.name,
        address_line1: v.addressLine1,
        address_line2: v.addressLine2,
        address_city: v.addressCity,
        address_state: v.addressState,
        address_country: 'USA'
      }
      if (changingCard || !last4) {
        const result = await this.props.stripe.createToken(params)
        return onSubmit({ ...params, stripeCreditCardToken: result.token.id })
      }
      return onSubmit(params)
    } catch(err) {
      console.log(err)
      throw new SubmissionError({ _error: err.message })
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, submitFailed, submitSucceeded, error, last4, isEmailVerified = true } = this.props
    const { changingCard } = this.state

    return (
      <form onSubmit={ handleSubmit(this.createToken) } style={ styles.form }>
        { !isEmailVerified &&
          <div className='emailVerificationLine-text'>
            <span className='emailVerificationLine-warn'>Hold on!</span>
            Your email needs to be verified before you may change your payment information.
            &nbsp;
            <Link to='#' onClick={ this.resendVerificationEmail }>
              Click here to resend verification email.
            </Link>
          </div>
        }
        <Field
          name='name'
          label='Name on Card'
          component={ KiwiTextField }
        />
        <Field
          name='addressLine1'
          label='Billing Address'
          component={ KiwiTextField }
        />
        <Field
          name='addressLine2'
          label='Billing Address Line 2'
          component={ KiwiTextField }
        />
        <Field
          name='addressCity'
          label='City'
          component={ KiwiTextField }
        />
        <Field
          name='addressState'
          component={ KiwiSelectField }
          label='State'
          options={ states }
        />
        { !!last4 && !changingCard
          ?
            <div className='changeCardsContainer'>
              Current card: x{last4}
              <span className='changeCards'>
                (
                  <Link to='#' onClick={ () => this.setState({ changingCard: true }) }>
                    Click here to use a different card
                  </Link>
                )
              </span>
            </div>
          :
            <CardField
              containerStyle={ {
                margin: '10px 0',
                color: 'white'
              } }
            />

        }
        <Button
          variant='outlined'
          type='submit'
          onClick={ handleSubmit(this.createToken) }
          disabled={ pristine || submitting || !isEmailVerified }
        >
          Save
        </Button>
        { submitting && <span>Saving...</span> }
        <div style={ styles.result }>
          { submitFailed && error &&
            <span style={ styles.failure }>
              { get(error, 'error_description', error) }
            </span>
          }
          { submitSucceeded &&
            <span style={ styles.success }>
              Your billing information has been updated!
            </span>
          }
        </div>
      </form>
    )
  }
}

export default injectStripe(reduxForm({
  form: formName
  , enableReinitialize: true
})(BillingForm))