import React from 'react'
import { TextField } from 'material-ui'

const errorColor = '#FF5472'
const floatingStyleDefault = { color: '#CCCCCC' }

const defaultContainerStyle = {  }
const defaultLabelStyle = { display: 'block' }
const defaultStyle = {  }
const defaultInputStyle = {  }
const defaultUnderlineStyle = {  }

const renderTextField = params => {
  const { includeFloatingLabel = true, input, label, type, meta: { touched, error }, ...rest } = params
  const containerStyle = params.containerStyle || defaultContainerStyle
  const labelStyle = params.labelStyle || defaultLabelStyle
  const style = params.style || defaultStyle
  const inputStyle = params.inputStyle || defaultInputStyle
  const underlineStyle = params.underlineStyle || defaultUnderlineStyle

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
      { touched && error && <span style={ { color: errorColor } }>{ error }</span> }
    </div>
  )
}

export default renderTextField