import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { FlatButton, RaisedButton } from 'material-ui'
import { Link } from 'react-router-dom'
import { Checkbox } from 'redux-form-material-ui'

import { activeColor, inactiveColor, styles as sharedStyles } from './sharedStyles'

import renderTextField from '../common/renderTextField'

const contactFormStyles = {
  formStyle: {
    position: 'relative'
    , width: 'calc(200px + 15vw)'
    , left: '50%'
    , marginLeft: `calc( calc(-200px - 15vw) / 2 )`
    //, minWidth: '200px'
  },
  label: {
    color: inactiveColor
    , fontWeight: 'bold'
  },
  checkbox: {
    fill: inactiveColor
  }
}

class ContactForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      usernameFieldActive: false
      , passwordFieldActive: false
      , messageFieldActive: false
    }
  }

  setUsernameStatus = bool =>
    this.setState({ usernameFieldActive: bool })

  setPasswordStatus = bool =>
    this.setState({ passwordFieldActive: bool })

  setMessageStatus = bool =>
    this.setState({ messageFieldActive: bool })

  render() {
    const { error, handleSubmit, pristine, reset, submitting, submitSucceeded } = this.props
    const { usernameFieldActive, passwordFieldActive, messageFieldActive } = this.state
    return (
      <form style={ contactFormStyles.formStyle } onSubmit={ handleSubmit }>
        <Field
          name='name'
          className='name'
          type='text'
          component={ renderTextField }
          hintText={ <div className='name'>name</div> }
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
          hintText={ <div className='email'>email</div> }
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: passwordFieldActive ? activeColor : inactiveColor
          } }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          onFocus={ () => this.setPasswordStatus(true) }
          onBlur={ () => this.setPasswordStatus(false) }
        />
        <Field
          name='message'
          type='text'
          className='message'
          component={ renderTextField }
          hintText={ <div className='message'>message</div> }
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: messageFieldActive ? activeColor : inactiveColor
          } }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          onFocus={ () => this.setMessageStatus(true) }
          onBlur={ () => this.setMessageStatus(false) }
        />
        <Field
          name='subscribe'
          component={ Checkbox }
          label='Subscribe me to updates about Kiwi!'
          labelStyle={ contactFormStyles.label }
          iconStyle={ contactFormStyles.checkbox }
        />
        <div style={ sharedStyles.buttonContainer }>
          <button
            type='submit'
            className='greenButton hvr-grow'
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


export const ContactFormComponent = ContactForm

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact',
  validate: values => {
    const errors = {}
    if(!values.name) {
      errors.name = 'Required!'
    } else if(!values.email || !values.email.includes('@')) {
      errors.email = 'Email address is invalid!'
    }
    if(!values.message) {
      errors.message = 'Required!'
    }

    return errors
  }
})(ContactForm)

export default ContactForm