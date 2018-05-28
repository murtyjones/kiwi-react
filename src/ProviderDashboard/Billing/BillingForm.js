import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Button from '@material-ui/core/Button'
import { Toggle, SelectField } from 'redux-form-material-ui'
import get from 'lodash/get'

import renderTextField from '../../common/renderTextField'
import Stripe from './Stripe'
import { StripeProvider, Elements, CardElement, injectStripe } from 'react-stripe-elements'

export const formName = 'billing'

const activeUnderlineColor = '#513d80'

const styles = {
  form: {
    width: 'calc(100% - 20px)' // 20px padding offset
    , height: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  },
  result: {
    paddingTop: '10px'
  },
  failure: { color: '#cc5040' },
  success: { color: '#66cc52' },
  underlineFocusStyle: { borderBottom: `2px ${activeUnderlineColor} solid` }
}

const CardSection = injectStripe(props => <CardElement style={ props.cardStyle } />)

const CardField = props =>
  <div style={ props.containerStyle } >
    <CardSection { ...props } />
  </div>

class BillingForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onVerificationEmailClick: T.func.isRequired
  }

  resendVerificationEmail = () => {
    this.props.onVerificationEmailClick()
  }

  createToken = async (v) => {
    console.log(v)
    // const values = ev.target
    // const { onSubmit } = this.props
    try {
      // console.log(ev)
      // const { token } = await this.props.stripe.createToken('blah')
      // console.log(token)
      // onSubmit({ ...v, token })
    } catch(err) {
      // throw new SubmissionError({ _error: 'Your information could not be verified.' })
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, submitFailed, submitSucceeded, error, isEmailVerified = true } = this.props

    return (
      <Stripe>
        <Elements>
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
              hintText='Name on Card'
              component={ renderTextField }
              style={ { width: '100%' } }
              underlineFocusStyle={ styles.underlineFocusStyle }
            />
            <Field
              name='addressLine1'
              hintText='Billing Address'
              component={ renderTextField }
              style={ { width: '100%' } }
              underlineFocusStyle={ styles.underlineFocusStyle }
            />
            <Field
              name='addressLine2'
              hintText='Billing Address Line 2'
              component={ renderTextField }
              style={ { width: '100%' } }
              underlineFocusStyle={ styles.underlineFocusStyle }
            />
            <Field
              name='city'
              hintText='City'
              component={ renderTextField }
              style={ { width: '100%' } }
              underlineFocusStyle={ styles.underlineFocusStyle }
            />
            <Field
              name='zip'
              hintText='ZIP Code'
              component={ renderTextField }
              style={ { width: '100%' } }
              underlineFocusStyle={ styles.underlineFocusStyle }
            />
            <CardField
              containerStyle={ {
                margin: '10px 0',
                color: 'white'
              } }
              cardStyle={ { base: {
                fontSize: '16px'
              } } }
            />
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
              { submitSucceeded && <span style={ styles.success }>Your profile has been updated!</span> }
            </div>
          </form>
        </Elements>
      </Stripe>
    )
  }
}

export default reduxForm({
  form: formName
  , enableReinitialize: true
})(BillingForm)
