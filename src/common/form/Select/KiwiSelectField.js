import React, { Component } from 'react'
import cns from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import get from 'lodash/get'
import InputLabel from '@material-ui/core/InputLabel'

import './overrides.css'

export default class KiwiSelectField extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { input, meta } = this.props
    const { error, touched } = meta
    const errorText = touched && error ? error : ''
    const hasError = !!errorText
    const classes = { error: hasError }
    console.log(errorText)
    return (
      <div className='KiwiSelectField-Container'>
        <InputLabel
          classes={{
            root: cns('KiwiSelectField-Label', classes)
          }}
        >
          { this.props.label }
        </InputLabel>
        <Select
          { ...this.props }
          onChange={ params => {
            const value = get(params, 'value', '')
            return input.onChange(value)
          } }
          value={ input.value }
        />
      </div>
    )
  }
}
