import React from 'react'
import { Toggle } from 'material-ui'

const KiwiToggleField = ({ children, input, label, type, meta, ...custom }) => {
  return [
    <label>{ label }</label>
    ,
    <Toggle
      key={ label }
      toggled={ !!input.value }
      onBlur={ (e) => { input.onChange(e.target.checked) } }
      { ... custom }
    />
  ]

}

export default KiwiToggleField