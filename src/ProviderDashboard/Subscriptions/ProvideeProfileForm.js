import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Toggle, SelectField } from 'redux-form-material-ui'
import isEmpty from 'lodash/isEmpty'
import asyncDebounce from 'debounce-promise'
import config from 'config'

import KiwiTextField from '../../common/form/KiwiTextField'
import validateUsernameAvailability from './validateUsernameAvailability'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import CopyLink from '../../common/CopyLink/CopyLink'
import { minLength6, required } from '../../utils/validationUtils'
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
      submittedValues: {}
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onSubmit: T.func.isRequired
    , openModal: T.func.isRequired
    , closeModal: T.func.isRequired
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.passwordConfirmed && !this.state.passwordConfirmed) {
      this.props.onSubmit(nextState.submittedValues)
      this.props.closeModal()
    }
  }

  handleCopyLinkClick = () => this.setState({ linkCopied: true })

  renderSuccessMessage = () => {
    const { initialValues, submitSucceeded } = this.props
    const { linkCopied, passwordConfirmed } = this.state
    if (submitSucceeded && passwordConfirmed) {
      if (!isEmpty(initialValues)) {
        return 'Profile updated!'
      }
      return (
        <CopyLink
          text={ `${ config.host }/login` }
          style={ { color: '#000' } }
          onCopy={ this.handleCopyLinkClick }
          linkCopied={ linkCopied }
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
    const { handleSubmit } = this.props
    const derivedHandleSubmit = handleSubmit(this.localHandleSubmit)

    return (
      <form onSubmit={ derivedHandleSubmit } style={ styles.form }>
        <Field
          name='username'
          label='Username'
          component={ KiwiTextField }
          successText='That username is available!'
          validate={ [ required ] }
        />
        <Field
          name='newPassword'
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
          text='Save'
          { ...this.props }
          onClick={ derivedHandleSubmit }
        />
        <ResultMessage
          { ...this.props }
          successMessage={ this.renderSuccessMessage() }
        />
      </form>
    )
  }
}

ProvideeProfileForm = reduxForm({
  form: formName
  , enableReinitialize: true
  , validate: values => {
    const errors = {}
    if(!values.currentPassword && (values.newPassword || values.confirmNewPassword)) {
      errors.currentPassword = 'Required'
    }
    if(!values.newPassword && (values.currentPassword || values.confirmNewPassword)) {
      errors.newPassword = 'Required'
    }
    if(!values.confirmNewPassword && (values.currentPassword || values.newPassword)) {
      errors.confirmNewPassword = 'Required'
    }
    if(values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
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

export default connect(null, mapDispatchToProps)(ProvideeProfileForm)
