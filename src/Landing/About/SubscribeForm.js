import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Checkbox } from 'redux-form-material-ui'

import { activeColor, inactiveColor, styles as sharedStyles } from './sharedStyles'

import renderTextField from '../../common/renderTextField'

const contactFormStyles = {
  formStyle: {
    position: 'absolute'
    , width: 'calc(200px + 15vw)'
    , bottom: '30%'
    , left: '50%'
    , color: '#624F8F'
    , marginLeft: `calc( calc(-200px - 15vw) / 2 )`
  },
  label: {
    color: '#624F8F'
    , fontWeight: 'bold'
  },
  checkbox: {
    fill: inactiveColor
  }
}

class ContactForm extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting, submitSucceeded } = this.props
    return (
      <form style={ contactFormStyles.formStyle } onSubmit={ handleSubmit }>
        <Field
          name='email'
          type='text'
          className='email'
          component={ renderTextField }
          hintText={ <div className='email'>email</div> }
          inputStyle={ { ...sharedStyles.input, color: '#624F8F' } }
          style={ sharedStyles.field }
          hintStyle={ sharedStyles.hintStyle }
          floatingLabelStyle={ {
            fontWeight: 'bold'
            , color: '#624F8F'
          } }
          underlineStyle={ {
            ...sharedStyles.underlineStyle
            , borderBottom: '3px solid #624F8F'
          } }
          underlineFocusStyle={ {
            ...sharedStyles.underlineFocusStyle
            , borderBottom: '3px solid #624F8F'
          } }
        />
        <div style={ sharedStyles.buttonContainer }>
          <button
            type='submit'
            className='greenButton hvr-grow'
            style={ { color: '#624F8F' } }
            onClick={ handleSubmit }
            disabled={ (submitting && !error) || submitSucceeded }
          >
            Subscribe
          </button>
        { error &&
          <span style={ sharedStyles.error }>
            { error }
          </span>
        }
        { submitSucceeded &&
          <span style={ sharedStyles.sent }>
            You're subscribed!
          </span>
        }
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
