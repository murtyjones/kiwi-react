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
    const { invalid, dirty, error } = meta
    const { focused, color } = this.state

    const errorText = invalid && dirty && error ? error : ''
    const successText = ''
    return (
      <TextField
        error={ !!errorText }
        helperText={ errorText || successText }
        margin='normal'
        className={ cns('KiwiTextField-Container', this.props.className) }
        fullWidth={ this.props.fullWidth ? this.props.fullWidth : true }
        InputProps={{
          onChange: input ? input.onChange : null,
          onFocus: () =>
            this.setState({
            focused: true
          }),
          onBlur: () =>
            this.setState({
            focused: false
          }),
          disableUnderline: this.props.disableUnderline ? this.props.disableUnderline : true,
          classes: {
            input: 'KiwiTextField-Input',
            formControl: cns('KiwiTextField-FormControl', { focused })
          },
          startAdornment: StartAdornmentIcon ? (
            <InputAdornment position='start'>
              <StartAdornmentIcon
                className={ cns('KiwiTextField-Icon', { focused }) }
              />
            </InputAdornment>
          ) : null
        }}
        InputLabelProps={{
          classes: {
            root: cns('KiwiTextField-Label', { focused }),
            shrink: cns('KiwiTextField-Label-Shrink', { focused })
          }
        }}
        { ...rest }
      />
    )
  }
}
