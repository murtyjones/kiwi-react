import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import renderTextField from '../common/renderTextField'
import { FlatButton, RaisedButton } from 'material-ui'
import asyncValidate from './usernameAvailability'

import { styles, inactiveColor, activeColor } from './sharedStyles'

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      usernameHintColorWhite: false
    }
  }

  setUsernameHintColorWhite = bool =>
    this.setState({ usernameHintColorWhite: bool })

  setPasswordHintColorWhite = bool =>
    this.setState({ passwordHintColorWhite: bool })

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    const { usernameHintColorWhite, passwordHintColorWhite } = this.state
    return (
      <form onSubmit={ handleSubmit }>
        <Field
          name='username'
          type='text'
          component={ renderTextField }
          hintText='username'
          inputStyle={ styles.input }
          style={ styles.field }
          hintStyle={ {
            ...styles.hintStyle
            , color: usernameHintColorWhite ? activeColor : inactiveColor
          } }
          underlineStyle={ styles.underlineStyle }
          underlineFocusStyle={ styles.underlineFocusStyle }
          onClick={ () => this.setUsernameHintColorWhite(true) }
          onBlur={ () => this.setUsernameHintColorWhite(false) }
        />
        <Field
          name='password'
          type='password'
          component={ renderTextField }
          hintText='password'
          inputStyle={ styles.input }
          style={ styles.field }
          hintStyle={ {
            ...styles.hintStyle
            , color: passwordHintColorWhite ? activeColor : inactiveColor
          } }
          underlineStyle={ styles.underlineStyle }
          underlineFocusStyle={ styles.underlineFocusStyle }
          onClick={ () => this.setPasswordHintColorWhite(true) }
          onBlur={ () => this.setPasswordHintColorWhite(false) }
        />
        <div>
          <RaisedButton type='submit' onClick={ handleSubmit } disabled={ submitting && !error }>
            Register
          </RaisedButton>
          <FlatButton type='button' onClick={ reset } disabled={ pristine || submitting }>
            Clear Values
          </FlatButton>
        </div>
        { error && <span style={ styles.error }>{ error }</span> }
      </form>
    )
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'register',
  validate: values => {
    const errors = {}
    if(!values.username) {
      errors.username = 'Required!'
    } else if(values.username.includes('@')) {
      errors.username = 'Email addresses are not allowed!'
    }
    if(!values.password) {
      errors.password = 'Required!'
    }

    return errors
  },
  // asyncValidate,
  // asyncBlurFields: ['username']
})(RegisterForm)

