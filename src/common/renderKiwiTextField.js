import React from 'react'
import { TextField } from 'material-ui'

const renderKiwiTextField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      { label }
    </label>
    <div>
      <TextField { ...input } placeholder={ label } type={ type } />
      { touched && error && <span>{ error }</span> }
    </div>
  </div>

export default renderKiwiTextField