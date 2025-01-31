import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Link from 'react-router-dom/Link'

import { activeColor, inactiveColor, styles as sharedStyles } from './sharedStyles'

import renderTextField from '../common/renderTextField'

class LoginForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      usernameFieldActive: false
      , passwordFieldActive: false
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
          className='username'
          type='text'
          component={ renderTextField }
          hintText={ <div className='username'>username</div> }
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: usernameFieldActive ? activeColor : inactiveColor
          } }
          floatingLabelFixed={ true }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          onFocus={ () => this.setUsernameStatus(true) }
          onBlur={ () => this.setUsernameStatus(false) }
        />
        <Field
          name='password'
          type='password'
          className='password'
          component={ renderTextField }
          hintText={ <div className='password'>password</div> }
          inputStyle={ sharedStyles.input }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: passwordFieldActive ? activeColor : inactiveColor
          } }
          floatingLabelFixed={ true }
          underlineStyle={ sharedStyles.underlineStyle }
          underlineFocusStyle={ sharedStyles.underlineFocusStyle }
          onFocus={ () => this.setPasswordStatus(true) }
          onBlur={ () => this.setPasswordStatus(false) }
        />
        <div>
          <button
            type='submit'
            onClick={ handleSubmit }
            className='greenButton hvr-grow'
            disabled={ submitting && !error }
            style={ {
              marginLeft: '10px'
              , marginRight: '15px'
            } }
          >
            Login
          </button>
          <FlatButton onClick={ reset } disabled={ pristine || submitting }>
            Clear Values
          </FlatButton>
        </div>
        { error && <span style={ sharedStyles.error }>{ error }</span> }
        <Link style={ sharedStyles.forgot } to='/password'>Forgot password?</Link>
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
    if (values.username) values.username = values.username.trim()
    if (!values.username) {
      errors.username = 'Required!'
    } else if (values.username.includes('@')) {
      errors.username = 'Email addresses are not allowed!'
    } else if (values.username.includes(' ')) {
      errors.username = 'Spaces are not allowed!'
    }
    if (!values.password) {
      errors.password = 'Required!'
    }

    return errors
  }
})(LoginForm)

export default LoginForm
