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
      usernameFieldActive: false
    }
  }

  setUsernameStatus = bool =>
    this.setState({ usernameFieldActive: bool })

  setPasswordStatus = bool =>
    this.setState({ passwordFieldActive: bool })

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    const { usernameFieldActive, passwordFieldActive } = this.state
    return (
      <form onSubmit={ handleSubmit }>
        <Field
          name='username'
          type='text'
          component={ renderTextField }
          hintText='username'
          inputStyle={ styles.input }
          style={ styles.field }
          hintStyle={ styles.hintStyle }
          underlineStyle={ styles.underlineStyle }
          underlineFocusStyle={ styles.underlineFocusStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: usernameFieldActive ? activeColor : inactiveColor
          } }
          onClick={ () => this.setUsernameStatus(true) }
          onBlur={ () => this.setUsernameStatus(false) }
        />
        <Field
          name='password'
          type='password'
          component={ renderTextField }
          hintText='password'
          inputStyle={ styles.input }
          style={ styles.field }
          hintStyle={ styles.hintStyle }
          underlineStyle={ styles.underlineStyle }
          underlineFocusStyle={ styles.underlineFocusStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: passwordFieldActive ? activeColor : inactiveColor
          } }
          onClick={ () => this.setPasswordStatus(true) }
          onBlur={ () => this.setPasswordStatus(false) }
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

