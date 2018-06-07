import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Toggle, SelectField } from 'redux-form-material-ui'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import asyncDebounce from 'debounce-promise'
import config from 'config'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ContentCopy from 'material-ui-icons/ContentCopy'
import CopyToClipboard from 'react-copy-to-clipboard'

import renderTextField from '../../common/renderTextField'
import validateUsernameAvailability from './validateUsernameAvailability'

export const formName = 'provideeProfile'

const CopyLoginLink = ({ text, linkCopied, onCopy }) =>
  <div className='copyLoginLinkContainer'>
    Your student is all setup! They can dive in and start
    coding using this link:
    <div className='copyLoginLinkBox'>
      { text }
      <CopyToClipboard
        text={ text }
        onCopy={ onCopy }
      >
        <IconButton
          variant='fab'
          aria-label='add'
          className='copyLoginLinkButton'
        >
          <ContentCopy
            style={ styles.contentCopy }
            color={ styles.contentCopyColor }
          />
        </IconButton>
      </CopyToClipboard>
    </div>
    { linkCopied && <span style={ styles.linkCopied }>Copied!</span> }
  </div>

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
  contentCopy: {
    width: '20px',
    height: '20px'
  },
  contentCopyColor: '#0074D9',
  linkCopied: {
    top: '5px', position: 'relative'
  }
}

class ProvideeProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      linkCopied: false
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
  }

  handleCopyLinkClick = () => this.setState({ linkCopied: true })

  render() {
    const { initialValues, handleSubmit, pristine, submitting, submitFailed, submitSucceeded, error } = this.props
    const { linkCopied } = this.state

    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='username'
          hintText='Username'
          component={ renderTextField }
          style={ { width: '100%' } }
          asyncValidMessage='That username is available!'
        />
        <Field
          name='newPassword'
          type='password'
          hintText='New Password'
          component={ renderTextField }
          style={ { width: '100%' } }
        />
        <Field
          name='confirmNewPassword'
          type='password'
          hintText='Confirm New Password'
          component={ renderTextField }
          style={ { width: '100%' } }
        />
        <Button variant='outlined' type='submit' onClick={ handleSubmit } disabled={ pristine || submitting }>
          Save
        </Button>
        { submitting && <span>Saving...</span> }
        <div style={ styles.result }>
          { submitFailed && error &&
            <span style={ styles.failure }>
              { get(error, 'error_description', error) }
            </span>
          }
          { submitSucceeded && !isEmpty(initialValues)
            ? <span style={ styles.success }>Profile updated!</span>
            : submitSucceeded
            ? <CopyLoginLink
                text={ `${ config.host }/login` }
                onCopy={ this.handleCopyLinkClick }
                linkCopied={ linkCopied }
              />
            : null
          }
        </div>
      </form>
    )
  }
}

export default reduxForm({
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
