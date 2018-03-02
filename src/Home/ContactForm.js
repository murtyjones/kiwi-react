import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { FlatButton, RaisedButton } from 'material-ui'
import { Link } from 'react-router-dom'

import { activeColor, inactiveColor, styles } from './sharedStyles'

import renderTextField from '../common/renderTextField'

const contactFormStyles = {
  formStyle: {
    position: 'relative'
    , width: 'calc(200px + 15vw)'
    , left: '50%'
    , marginLeft: `calc( calc(-200px - 15vw) / 2 )`
    //, minWidth: '200px'
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
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    const { usernameFieldActive, passwordFieldActive, messageFieldActive } = this.state
    return (
      <form style={ contactFormStyles.formStyle } onSubmit={ handleSubmit }>
        <Field
          name='name'
          className='name'
          type='text'
          component={ renderTextField }
          hintText={ <div className='name'>name</div> }
          inputStyle={ styles.input }
          style={ styles.field }
          hintStyle={ styles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: usernameFieldActive ? activeColor : inactiveColor
          } }
          underlineStyle={ styles.underlineStyle }
          underlineFocusStyle={ styles.underlineFocusStyle }
          onFocus={ () => this.setUsernameStatus(true) }
          onBlur={ () => this.setUsernameStatus(false) }
        />
        <Field
          name='email'
          type='text'
          className='email'
          component={ renderTextField }
          hintText={ <div className='email'>email</div> }
          inputStyle={ styles.input }
          style={ styles.field }
          hintStyle={ styles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: passwordFieldActive ? activeColor : inactiveColor
          } }
          underlineStyle={ styles.underlineStyle }
          underlineFocusStyle={ styles.underlineFocusStyle }
          onFocus={ () => this.setPasswordStatus(true) }
          onBlur={ () => this.setPasswordStatus(false) }
        />
        <Field
          name='message'
          type='text'
          className='message'
          component={ renderTextField }
          hintText={ <div className='message'>message</div> }
          inputStyle={ styles.input }
          style={ styles.field }
          hintStyle={ styles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: messageFieldActive ? activeColor : inactiveColor
          } }
          underlineStyle={ styles.underlineStyle }
          underlineFocusStyle={ styles.underlineFocusStyle }
          onFocus={ () => this.setMessageStatus(true) }
          onBlur={ () => this.setMessageStatus(false) }
        />
        <div>
          <RaisedButton type='submit' onClick={ handleSubmit } disabled={ submitting && !error }>
            Send
          </RaisedButton>
        </div>
        { error && <span style={ styles.error }>{ error }</span> }
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
