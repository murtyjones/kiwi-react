import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import Link from 'react-router-dom/Link'
import asyncDebounce from 'debounce-promise'

import KiwiTextField from '../../common/form/KiwiTextField'
import validateUsernameAvailability from './validateUsernameAvailability'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import { minLength6, required, alphaNumeric } from '../../utils/validationUtils'

export const formName = 'editProvideeProfile'

const styles = {
  form: {
    width: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  }
}

class EditProvideeProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , formValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onSubmit: T.func.isRequired
    , submitFailed: T.bool
    , submitSucceeded: T.bool
  }

  renderSuccessMessage = () => {
    return (
      <div>
        Updated!<br />
        <br />
        <Link to='/provider/subscriptions'>Take me back to my subscriptions</Link>
      </div>
    )
  }

  render() {
    const { handleSubmit, submitSucceeded, submitFailed } = this.props
    const { loading } = this.state

    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='username'
          label='Username'
          component={ KiwiTextField }
          disabled={ loading }
          validate={ [ required, alphaNumeric ] }
          successText='That username is available!'
        />
        <Field
          name='newPassword'
          type='password'
          label='New Password'
          component={ KiwiTextField }
          disabled={ loading }
          validate={ [ required, minLength6 ] }
        />
        <Field
          name='confirmNewPassword'
          type='password'
          label='Confirm New Password'
          component={ KiwiTextField }
          disabled={ loading }
          validate={ [ required ] }
        />
        <SubmitButton
          text='Save'
          { ...this.props }
          disabled={ loading }
        />

        { loading && <div className='spinner' /> }

        { (submitSucceeded || submitFailed) &&
          <ResultMessage
            { ...this.props }
            successMessage={ this.renderSuccessMessage() }
          />
        }

      </form>
    )
  }
}

EditProvideeProfileForm = reduxForm({
  form: formName
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    if (!values.newPassword && values.confirmNewPassword) {
      errors.newPassword = 'Required'
    }
    if (values.newPassword && !values.confirmNewPassword) {
      errors.confirmNewPassword = 'Required'
    }
    if (values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match!'
    }
    return errors
  }
  , shouldAsyncValidate: (params) => {
    if (!params.syncValidationPasses) {
      return false
    }
    switch (params.trigger) {
      case 'blur':
      case 'change':
        // blurring or changing
        return true
      case 'submit':
        // submitting, so only async validate if form is dirty or was never initialized
        // conversely, DON'T async validate if the form is pristine just as it was
        // initialized
        // return !params.pristine || !params.initialized
        return false
      default:
        return false
    }
  }
  , asyncValidate: asyncDebounce((...p) => validateUsernameAvailability(...p), 1000)
  , asyncChangeFields: ['username']
})(EditProvideeProfileForm)

export default connect(state => ({
  formValues: getFormValues(formName)(state)
}), null)(EditProvideeProfileForm)
