import React, { Fragment } from 'react'
import { SelectField, MenuItem } from 'material-ui'

const defaultContainerStyle = {  }
const defaultLabelStyle = { display: 'block' }

const renderSelectField = ({ children, containerStyle, input, label, labelStyle, type, meta: { touched, error }, onSelectCustom, ...custom }) => {
  return (
    <div style={ containerStyle || defaultContainerStyle }>
      <label style={ labelStyle || defaultLabelStyle }>
        { label }
      </label>
      <SelectField
        { ...input }
        onChange={
          (event, index, value) => {
            input.onChange(value)
            if (onSelectCustom) onSelectCustom(value)
          }
        }
        errorText={ touched && error }
        children={ children }
        { ...custom }
      />
    </div>
  )
}

export default renderSelectField