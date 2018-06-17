import React, { Component } from 'react'
import cns from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import get from 'lodash/get'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import './overrides.css'

export default class KiwiSelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render() {
    const { input, meta, options } = this.props
    const { focused } = this.state
    const { error, touched } = meta
    const errorText = touched && error ? error : ''
    const hasError = !!errorText
    const classes = { focused, error: hasError }
    const derivedOptions = options.map(e => {
      if(e.label && e.value)
        return e
      return { label: e, value: e }
    })

    return (
      <div className={ cns('KiwiField KiwiSelectField-Container', classes) }>
        <InputLabel
          classes={{
            root: cns('KiwiField-Label', classes)
          }}
        >
          { this.props.label }
        </InputLabel>
        <Select
          { ...this.props }
          options={ derivedOptions }
          onChange={ v => {
            const value = get(v, 'value', '') || v
            return input.onChange(value)
          } }
          onFocus={ () => {
            this.setState({ focused: true })
            input.onFocus()
          } }
          onBlur={ () => {
            this.setState({ focused: false })
            input.onBlur()
          } }
          value={ input.value }
        />
        { hasError &&
          <FormHelperText
            classes={{
              root: cns('KiwiSelectField-Helper', classes),
              error: cns('KiwiSelectField-Helper', classes)
            }}
            error={ true }
          >
            { error }
          </FormHelperText>
        }
      </div>
    )
  }
}