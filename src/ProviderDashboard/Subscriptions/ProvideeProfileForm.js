import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import isEmpty from 'lodash/isEmpty'
import asyncDebounce from 'debounce-promise'
import config from 'config'

import KiwiTextField from '../../common/form/KiwiTextField'
import validateUsernameAvailability from './validateUsernameAvailability'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import CopyLink from '../../common/CopyLink/CopyLink'
import { minLength6, required, alphaNumeric } from '../../utils/validationUtils'
import { openModal, closeModal } from '../../actions'
import ConfirmPasswordModal from '../../common/modals/ConfirmPasswordModal/ConfirmPasswordModal'

export const formName = 'provideeProfile'

const styles = {
  form: {
    width: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  }
}

class ProvideeProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      linkCopied: false,
      passwordConfirmed: false,
      submittedValues: {},
      generatedUsername: '',
      loading: false
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , formValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onSubmit: T.func.isRequired
    , openModal: T.func.isRequired
    , closeModal: T.func.isRequired
    , submitFailed: T.bool
    , submitSucceeded: T.bool
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  async UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.passwordConfirmed && !this.state.passwordConfirmed) {
      this.setStateAsync({ loading: true })
      this.props.closeModal()
      const r = await this.props.onSubmit(nextState.submittedValues)
      this.setStateAsync({
        loading: false, generatedUsername: r.username
      })
    }
  }

  handleCopyLinkClick = () => this.setState({ linkCopied: true })

  renderSuccessMessage = () => {
    const { initialValues, submitSucceeded, formValues } = this.props
    const { linkCopied, generatedUsername, passwordConfirmed } = this.state
    if (submitSucceeded && passwordConfirmed) {
      if (!isEmpty(initialValues)) {
        return 'Profile updated!'
      }
      return (
        <CopyLink
          text={ `${ config.host }/student` }
          style={ { color: '#000' } }
          onCopy={ this.handleCopyLinkClick }
          linkCopied={ linkCopied }
          formValues={ { ...formValues, username: generatedUsername } }
        />
      )
    }
    return null
  }

  confirmPasswordCallback = v => {
    this.setState({ passwordConfirmed: v })
  }

  localHandleSubmit = async v => {
    this.setState({ submittedValues: v })
    this.props.openModal({
      className: 'confirmPasswordModal',
      children: (
        <ConfirmPasswordModal
          callback={ this.confirmPasswordCallback }
        />
      ),
    })
  }

  render() {
    const { initialValues, handleSubmit, submitSucceeded, submitFailed } = this.props
    const { linkCopied, loading } = this.state
    const derivedHandleSubmit = handleSubmit(this.localHandleSubmit)

    let field1Name, field1Label, rest = {}, submitText
    if (isEmpty(initialValues)) {
      field1Name = 'firstName'
      field1Label = 'First Name'
      submitText = 'Create Student'
    } else {
      field1Name = 'username'
      field1Label = 'Username'
      rest.successText= 'That username is available!'
      submitText = 'Save'
    }
    console.log(this.props)
    return (
      <form onSubmit={ derivedHandleSubmit } style={ styles.form }>
        { loading
          ?
          <div className='spinner' />
          :
          submitSucceeded || submitFailed || linkCopied
            ?
            <ResultMessage
              { ...this.props }
              successMessage={ this.renderSuccessMessage() }
            />
            :
            <Fragment>
              <Field
                name={ field1Name }
                label={ field1Label }
                component={ KiwiTextField }
                validate={ [ required, alphaNumeric ] }
                { ...rest }
              />
              <Field
                name='password'
                type='password'
                label='New Password'
                component={ KiwiTextField }
                validate={ [ required, minLength6 ] }
              />
              <Field
                name='confirmNewPassword'
                type='password'
                label='Confirm New Password'
                component={ KiwiTextField }
                validate={ [ required ] }
              />
              <SubmitButton
                text={ submitText }
                { ...this.props }
                onClick={ derivedHandleSubmit }
              />
            </Fragment>
        }

      </form>
    )
  }
}

ProvideeProfileForm = reduxForm({
  form: formName
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    if(!values.currentPassword && (values.password || values.confirmNewPassword)) {
      errors.currentPassword = 'Required'
    }
    if(!values.password && (values.currentPassword || values.confirmNewPassword)) {
      errors.password = 'Required'
    }
    if(!values.confirmNewPassword && (values.currentPassword || values.password)) {
      errors.confirmNewPassword = 'Required'
    }
    if(values.confirmNewPassword && values.password !== values.confirmNewPassword) {
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
})(ProvideeProfileForm)


const mapDispatchToProps = (dispatch) => {
  return {
    openModal: params => dispatch(openModal(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

export default connect(state => ({
  formValues: getFormValues(formName)(state)
}), mapDispatchToProps)(ProvideeProfileForm)
