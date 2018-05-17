import React from 'react'
import { TextField } from 'material-ui'

const errorColor = '#FF5472'
const successColor = '#52cc4a'
const floatingStyleDefault = { color: '#CCCCCC' }

const defaultContainerStyle = {  }
const defaultLabelStyle = { display: 'block' }
const defaultStyle = {  }
const defaultInputStyle = {  }
const defaultUnderlineStyle = {  }

const renderTextField = params => {
  const { containerStyle = defaultContainerStyle, labelStyle = defaultLabelStyle, includeFloatingLabel = true, input, label, type, meta: { valid, touched, error, pristine, asyncValidating }, asyncValidMessage, ...rest } = params
  const style = params.style || defaultStyle
  const inputStyle = params.inputStyle || defaultInputStyle
  const underlineStyle = params.underlineStyle || defaultUnderlineStyle
  const asyncValidated = touched && !pristine && !asyncValidating && valid

  return (
    <div style={ containerStyle }>
      <label style={ labelStyle }>
        { label }
      </label>
      <TextField
        { ...input }
        type={ type }
        style={ style }
        inputStyle={ inputStyle }
        underlineStyle={ underlineStyle }
        { ...rest }
        floatingLabelText={
          includeFloatingLabel &&
            <span style={ rest.floatingLabelStyle || floatingStyleDefault }>
              { rest.hintText }
            </span>
        }
      />
      { touched && error &&
        <span style={ { color: errorColor } }>{ error }</span>
      }
      { asyncValidated && asyncValidMessage &&
        <span style={ { color: successColor } }>{ asyncValidMessage }</span>
      }
    </div>
  )
}

export default renderTextField