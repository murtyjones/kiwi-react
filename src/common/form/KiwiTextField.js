import React, { PureComponent } from 'react'
import cns from 'classnames'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { TextField as ReduxFormTextField } from 'redux-form-material-ui-next'
import has from 'lodash/has'

export default class KiwiTextField extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render() {
    const { StartAdornmentIcon, input, meta, successText } = this.props
    const { error, pristine, touched, asyncValidating, valid } = meta
    const { focused, color } = this.state
    const errorText = touched && error ? error : ''
    const asyncValidated = touched && !pristine && !asyncValidating && valid
    const derivedSuccessText = asyncValidated ? successText : ''
    const hasError = !!errorText
    const classes = { focused, error: hasError }
    return (
      <ReduxFormTextField
        { ...this.props }
        error={ hasError }
        helperText={ errorText || derivedSuccessText }
        margin='normal'
        className={ cns('KiwiField KiwiTextField-Container', this.props.className) }
        fullWidth={ this.props.fullWidth ? this.props.fullWidth : true }
        InputProps={{
          onChange: input ? input.onChange : null,
          onFocus: () => {
            this.setState({ focused: true })
            input.onFocus()
          },
          onBlur: () => {
            this.setState({ focused: false })
            input.onBlur()
          },
          disableUnderline: this.props.disableUnderline ? this.props.disableUnderline : true,
          classes: {
            input: 'KiwiTextField-Input',
            formControl: cns('KiwiTextField-FormControl', classes)
          },
          startAdornment: StartAdornmentIcon ? (
            <InputAdornment position='start'>
              <StartAdornmentIcon
                className={ cns('KiwiTextField-Icon', classes) }
              />
            </InputAdornment>
          ) : null
        }}
        InputLabelProps={{
          classes: {
            root: cns('KiwiTextField-Label', classes),
            shrink: cns('KiwiTextField-Label-Shrink', classes)
          },
          ...this.props.addlInputLabelProps
        }}
        FormHelperTextProps={{
          classes: {
            root: cns('KiwiTextField-FormHelperText'),
            error: cns('KiwiTextField-FormHelperText', classes)
          }
        }}
      />
    )
  }
}
