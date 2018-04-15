import React from 'react'
import { TextField } from 'material-ui'

const errorColor = '#FF5472'
const floatingStyleDefault = { color: '#CCCCCC' }

const defaultLabelStyle = { display: 'block' }

const renderTextField = ({ containerStyle, labelStyle, showLabelAbove = true, includeFloatingLabel = true, input, label, type, meta: { touched, error }, ...rest }) =>
  <div style={ containerStyle }>
    <label style={ labelStyle || defaultLabelStyle }>
      { label }
    </label>
    <TextField
      { ...input }
      type={ type }
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

export default renderTextField