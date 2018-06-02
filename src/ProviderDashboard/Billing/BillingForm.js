import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Button from '@material-ui/core/Button'
import MenuItem from 'material-ui/MenuItem'
import { Toggle, SelectField } from 'redux-form-material-ui'
import get from 'lodash/get'

import renderTextField from '../../common/renderTextField'
import states from '../../utils/statesArray'

import { CardElement, injectStripe } from 'react-stripe-elements'

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

const CardSection = props => <CardElement style={ props.cardStyle } />

const CardField = props =>
  <div style={ props.containerStyle } >
    <CardSection { ...props } />
  </div>

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

  createToken = async (v) => {
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
          name='addressCity'
          hintText='City'
          component={ renderTextField }
          style={ { width: '100%' } }
          underlineFocusStyle={ styles.underlineFocusStyle }
        />
        <Field
          name='addressState'
          component={ SelectField }
          floatingLabelText='State'
          style={ { width: '100%' } }
        >
          { states.map(e => <MenuItem key={ e } value={ e } primaryText={ e } />) }
        </Field>
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
              cardStyle={ { base: {
                fontSize: '16px'
              } } }
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
