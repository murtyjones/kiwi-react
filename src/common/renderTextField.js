import React from 'react'
import { TextField } from 'material-ui'

const errorColor = '#FF5472'
const floatingStyleDefault = { color: '#CCCCCC' }

const renderTextField = ({ showLabelAbove = true, includeFloatingLabel = true, input, label, type, meta: { touched, error }, ...rest }) =>
  <div>
    <label>
      { label }
    </label>
    <div>
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
  </div>

export default renderTextField