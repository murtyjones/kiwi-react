import React from 'react'
import { TextField } from 'material-ui'

const renderTextField = ({ input, label, type, meta: { touched, error }, ...rest }) =>
  <div>
    <label>
      { label }
    </label>
    <div>
      <TextField { ...input } placeholder={ label } type={ type } { ...rest } />
      { touched && error && <span>{ error }</span> }
    </div>
  </div>

export default renderTextField