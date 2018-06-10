import React, { PureComponent } from 'react'
import cns from 'classnames'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

export default class KiwiTextField extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render() {
    const { StartAdornmentIcon, input, meta, ...rest } = this.props
    const { error, touched } = meta
    const { focused, color } = this.state
    const errorText = touched && error ? error : ''
    const hasError = !!errorText
    const successText = ''
    const classes = { focused, error: hasError }

    return (
      <TextField
        error={ hasError }
        helperText={ errorText || successText }
        margin='normal'
        className={ cns('KiwiTextField-Container', this.props.className) }
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
          }
        }}
        FormHelperTextProps={{
          classes: {
            error: cns('KiwiTextField-FormHelperText', classes)
          }
        }}
        { ...rest }
      />
    )
  }
}
