import React from 'react'
import { Toggle } from 'material-ui'

const KiwiToggleField = ({ children, input, label, type, meta, ...custom }) => {
  return [
    <label key={ `label-${1}` }>{ label }</label>
    ,
    <Toggle
      key={ `label-${2}` }
      toggled={ !!input.value }
      onBlur={ (e) => { input.onChange(e.target.checked) } }
      // onToggle={ (e, v) => {
      //   console.log(v)
      //   input.onChange(v)
      // } }
      { ... custom }
    />
  ]

}

export default KiwiToggleField