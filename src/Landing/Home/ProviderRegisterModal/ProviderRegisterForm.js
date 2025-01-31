import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { SubmissionError, reduxForm, getFormValues, unregisterField } from 'redux-form'
import { Elements, injectStripe } from 'react-stripe-elements'
import Paper from '@material-ui/core/Paper'

import { generateTempPassword } from '../../../utils/psuedoRandomUtils'
import SubmitButton from '../../../common/form/SubmitButton'
import ProgressBar from '../../../common/ProgressBar/ProgressBar'
import ResultMessage from '../../../common/form/ResultMessage'
import { passwordsMatch } from '../../../utils/validationUtils'
import Stripe from '../../../common/form/payment/Stripe'
import { providerSlides } from './slides'


import './overrides.css'
import withStyles from '@material-ui/core/styles/withStyles'

let formName = 'providerRegisterForm'

const styles = theme => ({
  control: {
    height: '100%',
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
    boxShadow: 'none'
  },
  row1: {
    overflow: 'auto'
  },
  row2: {
    height: 'calc(100% - 60px)'
  },
  form: {
    height: '100%'
  },
  loadingText: {
    marginTop: 7
  }
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
    , reset: T.func.isRequired
    , change: T.func.isRequired
    , completionPercentage: T.number.isRequired
    , stripe: T.object.isRequired
    , formValues: T.object.isRequired
    , submitting: T.bool.isRequired
  }

  componentWillUnmount() {
    this.props.reset()
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

  createLatestProvideeTemporaryPassword = () => {
    const { formValues: { providees } } = this.props
    const i = providees.length - 1
    const temporaryPassword = generateTempPassword()
    this.props.change(`providees[${i}].temporaryPassword`, temporaryPassword)
  }

  localHandleSubmit = async v => {
    const { onSubmit, slide, formValues } = this.props
    const { shouldCreateToken, shouldCreateTemporaryPassword } = slide
    try {
      if (shouldCreateTemporaryPassword) {
        this.createLatestProvideeTemporaryPassword()
      }
      if (shouldCreateToken) {
        const result = await this.createToken(v)
        formValues.stripeCreditCardToken = result.token.id
      }
      return onSubmit(formValues)
    } catch(err) {
      console.log(err)
      if (err.message.toLocaleLowerCase().includes('undefined')) {
        throw new SubmissionError({ _error: 'Looks like something was entered incorrectly. Please try again.' })
      }
      throw new SubmissionError({ _error: err.message })
    }
  }

  render() {
    const {
      createdProvidees, classes, onSubmit, handleSubmit, slide, formValues,
      activeSlideIndex, completionPercentage, useCompletionPercentage, switchModals
    } = this.props
    const { submitText, submitButtonId, Component, FieldComponent, names, name, loadingText } = slide
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
          className={ classes.form }
          onSubmit={ derivedHandleSubmit }
        >
          <div className={ classes.row1 }>
            { useCompletionPercentage &&
              <ProgressBar
                completionPercentage={ completionPercentage }
              />
            }
            <SlideHeader
              { ...headerProps }
            />
          </div>
          <div className={ classes.row2 }>
            <FieldComponent
              { ...nameOrNames }
              component={ Component }
              goToPrevSlide={ this.props.goToPrevSlide }
              formValues={ formValues }
              onSubmit={ onSubmit }
              isLogin={ false }
              switchModals={ switchModals }
              createdProvidees={ createdProvidees }
            />
            { submitText &&
              <SubmitButton
                id={ submitButtonId }
                text={ submitText }
                { ...this.props }
                onClick={ derivedHandleSubmit }
              />
            }
            { this.props.submitting && loadingText &&
              <div className={ classes.loadingText }>{ loadingText }</div>
            }
            <ResultMessage
              { ...this.props }
            />
          </div>
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
