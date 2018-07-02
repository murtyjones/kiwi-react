import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { SubmissionError, reduxForm, getFormValues, unregisterField } from 'redux-form'
import { Elements, injectStripe } from 'react-stripe-elements'
import Paper from '@material-ui/core/Paper'

import SubmitButton from '../../../common/form/SubmitButton'
import ProgressBar from '../../../common/ProgressBar/ProgressBar'
import ResultMessage from '../../../common/form/ResultMessage'
import { passwordsMatch } from '../../../utils/validationUtils'
import Stripe from '../../../common/form/payment/Stripe'


import './overrides.css'
import withStyles from "@material-ui/core/styles/withStyles";

let formName = 'allowSignInRegister'

const styles = theme => ({
  control: {
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
    boxShadow: 'none'
  },
})

const SlideHeader = props =>
  <h3 className='providerRegisterForm-header'>{ props.text }</h3>

class ProviderRegisterForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired
    , goToNextSlide: T.func.isRequired
    , completionPercentage: T.number.isRequired
  }

  createToken = async v => {
    try {
      const params = {
        name: v.name,
        address_line1: v.addressLine1,
        address_line2: v.addressLine2,
        address_city: v.addressCity,
        address_state: v.addressState,
        address_country: 'USA'
      }
      return this.props.stripe.createToken(params)
    } catch(err) {
      throw err
    }
  }

  localHandleSubmit = async v => {
    const { onSubmit, slide } = this.props
    const { shouldCreateToken } = slide
    try {
      const params = { ...v }
      if (shouldCreateToken) {
        const result = await this.createToken(v)
        params.stripeCreditCardToken = result.token.id
      }
      return onSubmit(params)
    } catch(err) {
      console.log(err)
      throw new SubmissionError({ _error: err.message })
    }
  }

  render() {
    const { classes, handleSubmit, slide, formValues, activeSlideIndex, completionPercentage } = this.props
    const { submitText, Component, FieldComponent, names, name } = slide
    const derivedHandleSubmit = handleSubmit(this.localHandleSubmit)

    const nameOrNames = {}
    if (names) nameOrNames.names = names
    else nameOrNames.name = name

    const headerProps = {}
    if (slide.headerText) headerProps.text = slide.headerText
    else headerProps.text = slide.headerTextMaker(formValues)

    return (
      <Paper className={ classes.control }>
        <form
          className='providerRegisterForm'
          onSubmit={ derivedHandleSubmit }
        >
          <ProgressBar
            completionPercentage={ completionPercentage }
          />
          <SlideHeader
            { ...headerProps }
          />
          <FieldComponent
            { ...nameOrNames }
            component={ Component }
            goToPrevSlide={ this.props.goToPrevSlide }
            formValues={ formValues }
          />
          <SubmitButton
            text={ submitText }
            { ...this.props }
            onClick={ derivedHandleSubmit }
          />
          <ResultMessage
            { ...this.props }
          />
        </form>
      </Paper>
    )
  }
}


ProviderRegisterForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(ProviderRegisterForm)

ProviderRegisterForm = injectStripe(ProviderRegisterForm)

ProviderRegisterForm = reduxForm({
  form: formName
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
  , enableReinitialize: true
  , onSubmitSuccess: (result, dispatch) =>
    dispatch(unregisterField(formName, 'submitSucceeded'))
  , validate: values => {
    const errors = {}
    const { password, confirmPassword, providees = [] } = values
    if (!passwordsMatch(password, confirmPassword)) {
      errors.confirmPassword = 'Passwords must match!'
    }
    errors.providees = providees.map((each = {}) => {
      const providerErrors = {}
      if (!passwordsMatch(each.password, each.confirmPassword))
        providerErrors.confirmPassword = 'Passwords must match!'
      return providerErrors
    })
    return errors
  }
})(ProviderRegisterForm)

ProviderRegisterForm = withStyles(styles, { withTheme: true })(ProviderRegisterForm)

export default props =>
  <Stripe>
    <Elements>
      <ProviderRegisterForm { ...props } />
    </Elements>
  </Stripe>
