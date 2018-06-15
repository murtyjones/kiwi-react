import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Link from 'react-router-dom/Link'
import { Checkbox } from 'redux-form-material-ui'

import { activeColor, inactiveColor, styles as sharedStyles } from '../../About/sharedStyles'

import renderTextField from '../../../common/renderTextField'

const contactFormStyles = {
  formStyle: {
    width: '100%'
  },
  label: {
    color: inactiveColor
    , fontWeight: 'bold'
  },
  checkbox: {
    fill: inactiveColor
  }
}

class SubscribeForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      usernameFieldActive: false
      , emailFieldActive: false
    }
  }

  setUsernameStatus = bool =>
    this.setState({ usernameFieldActive: bool })

  setEmailStatus = bool =>
    this.setState({ emailFieldActive: bool })

  render() {
    const { error, handleSubmit, pristine, reset, submitting, submitSucceeded } = this.props
    const { usernameFieldActive, emailFieldActive } = this.state
    return (
      <form style={ contactFormStyles.formStyle } onSubmit={ handleSubmit }>
        <Field
          name='name'
          className='name'
          type='text'
          component={ renderTextField }
          hintText={ <div className='name'>Full Name</div> }
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: usernameFieldActive ? activeColor : inactiveColor
          } }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          onFocus={ () => this.setUsernameStatus(true) }
          onBlur={ () => this.setUsernameStatus(false) }
        />
        <Field
          name='email'
          type='text'
          className='email'
          component={ renderTextField }
          hintText={ <div className='email'>Email</div> }
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: emailFieldActive ? activeColor : inactiveColor
          } }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          onFocus={ () => this.setEmailStatus(true) }
          onBlur={ () => this.setEmailStatus(false) }
        />
        <div style={ sharedStyles.buttonContainer }>
          <button
            type='submit'
            className='greenButton hvr-grow'
            style={ { marginBottom: '10px', color: 'rgb(154, 192, 69)' } }
            onClick={ handleSubmit }
            disabled={ submitting && !error }
          >
            Send
          </button>
        { error && <span style={ sharedStyles.error }>{ error }</span> }
        { submitSucceeded && <span style={ sharedStyles.sent }>Sent!</span> }
        </div>
      </form>
    )
  }
}


export const ContactFormComponent = SubscribeForm

SubscribeForm = reduxForm({
  // a unique name for the form
  form: 'contact',
  validate: values => {
    const errors = {}
    if(!values.name) {
      errors.name = 'Required!'
    }
    if(!values.email || !values.email.includes('@')) {
      errors.email = 'Email address is invalid!'
    }
    return errors
  }
})(SubscribeForm)

export default SubscribeForm
