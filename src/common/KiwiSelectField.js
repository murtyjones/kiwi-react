import React from 'react'
import { SelectField, MenuItem } from 'material-ui'

const KiwiSelectField = ({ children, input, label, type, meta: { touched, error }, onSelectCustom, ...custom }) => {
  return (
    <div>
      <label>
        {label}
      </label>
      <div>
        <SelectField
          {...input}
          onChange={
            (event, index, value) => {
              input.onChange(value)
              if (onSelectCustom) onSelectCustom(value)
            }
          }
          errorText={touched && error}
          children={children}
          {...custom}
        />
      </div>
    </div>
  )
}

export default KiwiSelectField