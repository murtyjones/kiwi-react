import React from 'react'
import { TextField } from 'material-ui'

const renderTextField = ({ showLabelAbove = true, input, label, type, meta: { touched, error }, ...rest }) =>
  <div>
    <label>
      { label }
    </label>
    <div>
      <TextField { ...input } type={ type } { ...rest } />
      { touched && error && <span>{ error }</span> }
    </div>
  </div>

export default renderTextField