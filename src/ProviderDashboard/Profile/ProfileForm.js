import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { RaisedButton, MenuItem } from 'material-ui'
import { Toggle, SelectField } from 'redux-form-material-ui'
import { isEmpty } from 'lodash'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import validateEmailAvailability from './validateEmailAvailability'
import asyncDebounce from 'debounce-promise'

export const formName = 'profile'

const styles = {
  form: {
    width: 'calc(100% - 20px)' // 20px padding offset
    , height: '100%'
    , padding: '10px'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  }
}

class ProfileForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='name'
          hintText='Name'
          component={ renderTextField }
          style={ { width: '100%' } }
        />
        <Field
          name='email'
          hintText='Email'
          component={ renderTextField }
          style={ { width: '100%' } }
          asyncValidMessage='That email is available!'
        />
        <RaisedButton type='submit' onClick={ handleSubmit } disabled={ pristine || submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

ProfileForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(ProfileForm)

export default reduxForm({
  form: formName
  , enableReinitialize: true
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
  , asyncValidate: asyncDebounce((...p) => validateEmailAvailability(...p), 1000)
  , asyncChangeFields: ['email']
})(ProfileForm)
