import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { FlatButton, RaisedButton } from 'material-ui'
import { Link } from 'react-router-dom'

import { styles, inactiveColor, activeColor } from './sharedStyles'

import renderTextField from '../common/renderTextField'

class LoginForm extends PureComponent {
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
          className='username'
          type='text'
          component={ renderTextField }
          hintText={ <div className='username'>username</div> }
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
          className='password'
          component={ renderTextField }
          hintText={ <div className='password'>password</div> }
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
            Login
          </RaisedButton>
          <FlatButton onClick={ reset } disabled={ pristine || submitting }>
            Clear Values
          </FlatButton>
        </div>
        { error && <span style={ styles.error }>{ error }</span> }
        <Link style={ styles.forgot } to='/password'>Forgot password?</Link>
      </form>
    )
  }
}


export const LoginFormComponent = LoginForm

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
  validate: values => {
    const errors = {}
    if(!values.username) {
      errors.username = 'Required!'
    }
    if(!values.password) {
      errors.password = 'Required!'
    }

    return errors
  }
})(LoginForm)

export default LoginForm
