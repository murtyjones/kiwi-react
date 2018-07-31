import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'
import withStyles from '@material-ui/core/styles/withStyles'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Button from '@material-ui/core/Button'
import get from 'lodash/get'
import { injectStripe } from 'react-stripe-elements'

import KiwiTextField from '../../common/form/KiwiTextField'
import KiwiSelectField from '../../common/form/Select/KiwiSelectField'
import CardField from '../../common/form/payment/CardField'

import states from '../../utils/statesArray'
import { cardValid, required } from '../../utils/validationUtils'
import SubmitButton from "../../common/form/SubmitButton";

export const formName = 'providerDashboard-billing'

const successColor = '#52cc4a'

const styles = theme => ({
  form: {
    width: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  },
  sent: {
    color: successColor
  },
})

class BillingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changingCard: false,
      isEmailSent: false
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onVerificationEmailClick: T.func.isRequired
    , last4: T.string
    , classes: T.object.isRequired
    , pristine: T.bool.isRequired
    , submitting: T.bool.isRequired
    , submitFailed: T.bool.isRequired
    , submitSucceeded: T.bool.isRequired
    , error: T.any
    , isEmailVerified: T.bool
    , stripe: T.any.isRequired
  }

  resendVerificationEmail = () => {
    this.props.onVerificationEmailClick()
    this.setState({ isEmailSent: true })
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
      if (err.message.toLocaleLowerCase().includes('undefined')) {
        throw new SubmissionError({ _error: 'Looks like something was entered incorrectly. Please try again.' })
      }
      throw new SubmissionError({ _error: err.message })
    }
  }

  render() {
    const { classes, handleSubmit, pristine, submitting, submitFailed, submitSucceeded, error, last4, isEmailVerified = true } = this.props
    const { changingCard, isEmailSent } = this.state

    return (
      <form disabled={ !isEmailVerified } onSubmit={ handleSubmit(this.createToken) } className={ classes.form }>
        { !isEmailVerified &&
          <div className='emailVerificationLine-text'>
            <span className='emailVerificationLine-warn'>Hold on!</span>
            Your email needs to be verified before you may change your payment information.
            &nbsp;
            <Link to='#' onClick={ this.resendVerificationEmail }>
              Click here to resend verification email.
            </Link>
            { isEmailSent && <div className={ classes.sent }>Sent!</div> }
          </div>
        }
        <Field
          name='name'
          label='Name on Card'
          component={ KiwiTextField }
          validate={ [ required ] }
        />
        <Field
          name='addressLine1'
          label='Billing Address'
          component={ KiwiTextField }
          validate={ [ required ] }
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
          validate={ [ required ] }
        />
        <Field
          name='addressState'
          component={ KiwiSelectField }
          label='State'
          options={ states }
          validate={ [ required ] }
        />
        { !!last4 && !changingCard
          ?
          <div className='changeCardsContainer'>
            Current Card: x{last4}
            <span className='changeCards'>
              (
              <Link to='#' onClick={ () => this.setState({ changingCard: true }) }>
                Click here to use a different card
              </Link>
              )
            </span>
          </div>
          :
          <Field
            name='creditCard'
            component={ CardField }
            containerStyle={ {
              margin: '10px 0',
              color: 'white'
            } }
            validate={ [ required, cardValid ] }
          />

        }
        <SubmitButton
          text='Save Payment Info'
          { ...this.props }
          onClick={ handleSubmit(this.createToken) }
          alwaysDisable={ !isEmailVerified }
        />
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

BillingForm = injectStripe(reduxForm({
  form: formName
  , enableReinitialize: true
})(BillingForm))


export default withStyles(styles, { withTheme: true })(BillingForm)