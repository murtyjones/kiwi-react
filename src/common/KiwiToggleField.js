import React, { Component } from 'react'
import { Toggle } from 'material-ui'

const _KiwiToggleField = ({ children, input, label, type, meta, ...custom }) => {
  return [
    <label key={ `label-${1}` }>{ label }</label>
    ,
    <Toggle
      key={ `label-${2}` }
      toggled={ !!input.value }
      // onClick={ (e) => { input.onChange(e.target.checked) } }
      onToggle={ (e, v) => {
        input.onChange(v)
      } }
      { ... custom }
    />
  ]

}


class KiwiToggleField extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, input, label, type, meta, custom } = this.props
    return [
      <label key={ `label-${1}` }>{ label }</label>
      ,
      <Toggle
        key={ `label-${2}` }
        toggled={ !!input.value }
        onBlur={ (e) => { input.onChange(e.target.checked) } }
        // onToggle={ (e, v) => {
        //   input.onChange(v)
        //   this.handleToggle(v)
        // } }
        // { ... custom }
      />
    ]
  }
}

export default KiwiToggleField