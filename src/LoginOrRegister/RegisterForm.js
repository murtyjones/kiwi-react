import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import asyncDebounce from 'debounce-promise'
import FlatButton from 'material-ui/FlatButton'

import renderTextField from '../common/renderTextField'
import asyncValidate from './usernameAvailability'
import setTimeoutAsync from '../utils/setTimeoutAsync'

import { inactiveColor, activeColor, styles as sharedStyles } from './sharedStyles'

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      usernameFieldActive: false
      , preventSpamming: false
    }
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.submitSucceeded && !this.props.submitSucceeded) {
      // prevent the user from spamming the button,
      // even if the attempt failed.
      await this.setState({ preventSpamming: true })
      await setTimeoutAsync(1500)
      await this.setState({ preventSpamming: false })
    }
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  setUsernameStatus = bool =>
    this.setState({ usernameFieldActive: bool })

  setPasswordStatus = bool =>
    this.setState({ passwordFieldActive: bool })

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    const { usernameFieldActive, passwordFieldActive, preventSpamming } = this.state

    return (
      <form onSubmit={ handleSubmit }>
        <Field
          name='username'
          type='text'
          component={ renderTextField }
          hintText='username'
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: usernameFieldActive ? activeColor : inactiveColor
          } }
          floatingLabelFixed={ true }
          onClick={ () => this.setUsernameStatus(true) }
          onBlur={ () => this.setUsernameStatus(false) }
          asyncValidMessage='That username is available!'
        />
        <Field
          name='password'
          type='password'
          component={ renderTextField }
          hintText='password'
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: passwordFieldActive ? activeColor : inactiveColor
          } }
          floatingLabelFixed={ true }
          onClick={ () => this.setPasswordStatus(true) }
          onBlur={ () => this.setPasswordStatus(false) }
        />
        <div>
          <button
            type='submit'
            className='greenButton hvr-grow'
            onClick={ handleSubmit }
            disabled={ (submitting && !error) || preventSpamming }
            style={ {
              marginLeft: '10px'
              , marginRight: '15px'
            } }
          >
            Register
          </button>
          <FlatButton type='button' onClick={ reset } disabled={ pristine || submitting }>
            Clear Values
          </FlatButton>
        </div>
        { error && <span style={ sharedStyles.error }>{ error }</span> }
      </form>
    )
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'register',
  validate: values => {
    if(values.username) values.username = values.username.trim()
    const errors = {}
    if(!values.username) {
      errors.username = 'Required!'
    } else if(values.username.includes('@')) {
      errors.username = 'Email addresses are not allowed!'
    } else if(values.username.includes(' ')) {
      errors.username = 'Spaces are not allowed!'
    }
    if(!values.password) {
      errors.password = 'Required!'
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
  , asyncValidate: asyncDebounce((...p) => asyncValidate(...p), 1000)
  , asyncChangeFields: [ 'username' ]
})(RegisterForm)

