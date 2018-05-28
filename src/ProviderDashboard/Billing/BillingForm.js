import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import { Toggle, SelectField } from 'redux-form-material-ui'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'

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

  render() {
    const { handleSubmit, pristine, submitting, submitFailed, submitSucceeded, error, isEmailVerified = true } = this.props

    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
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
          name='firstName'
          hintText='First Name'
          component={ renderTextField }
          style={ { width: '100%' } }
          containerClassName='accountName first'
          underlineFocusStyle={ styles.underlineFocusStyle }
        />
        <Field
          name='lastName'
          hintText='Last Name'
          component={ renderTextField }
          style={ { width: '100%' } }
          containerClassName='accountName last'
          underlineFocusStyle={ styles.underlineFocusStyle }
        />
        <Field
          name='email'
          hintText='Email'
          component={ renderTextField }
          style={ { width: '100%' } }
          asyncValidMessage='That email is available!'
          underlineFocusStyle={ styles.underlineFocusStyle }
        />
        <Button
          variant='outlined'
          type='submit'
          onClick={ handleSubmit }
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
    )
  }
}

export default reduxForm({
  form: formName
  , enableReinitialize: true
})(BillingForm)
