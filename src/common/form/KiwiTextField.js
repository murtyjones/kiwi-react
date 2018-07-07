import React, { PureComponent } from 'react'
import cns from 'classnames'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import { TextField as ReduxFormTextField } from 'redux-form-material-ui-next'
import has from 'lodash/has'

const styles = theme => ({
  field: {
    marginTop: '0 !important',
    marginBottom: '20px !important'
  },
  input: {

  },
  inputFocused: {

  },
  formControl: {
    padding: '5px 10px',
    boxSizing: 'border-box',
    borderRadius: '3px',
    border: '1px solid #AAA !important',
    color: '#000 !important',
    '&.focused': {
      border: '1px solid #765C9F !important',
      color: '#765C9F'
    },
    '&.error': {
      border: '1px solid #CC5040 !important',
      color: '#CC5040'
    },
  },
  icon: {
    marginLeft: '3px',
    color: '#AAA !important',
    '&.focused': { color: '#765C9F !important' },
    '&.error': { color: '#CC5040 !important' },
  },
  label: {
    color: '#AAA !important',
    padding: '7px 0 0 10px !important',
    '&.focused': { color: '#765C9F !important' },
    '&.error': { color: '#CC5040 !important' },
  },
  labelShrink: {
    fontSize: '14pt !important',
    lineHeight: '0.5 !important',
    padding: '0 !important'
  },
  formHelper: {
    color: '#66cc52 !important',
    '&.error': { color: '#CC5040 !important' }
  }
})

class KiwiTextField extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render() {
    const {
      classes, StartAdornmentIcon, input, meta, successText
    } = this.props
    const { error, pristine, touched, asyncValidating, valid } = meta
    const { focused, color } = this.state
    const errorText = touched && error ? error : ''
    const asyncValidated = touched && !pristine && !asyncValidating && valid
    const derivedSuccessText = asyncValidated ? successText : ''
    const hasError = !!errorText
    const stateClasses = { focused, error: hasError }

    return (
      <ReduxFormTextField
        { ...this.props }
        error={ hasError }
        helperText={ errorText || derivedSuccessText }
        margin='normal'
        className={ cns(classes.field, this.props.className) }
        fullWidth={ this.props.fullWidth ? this.props.fullWidth : true }
        InputProps={{
          onChange: input ? input.onChange : null,
          onFocus: () => {
            this.setState({ focused: true })
            input.onFocus()
          },
          onBlur: () => {
            this.setState({ focused: false })
            // this seemed to cause the KiwiTextField to reset on blur,
            // but only in the case where we were converting the input
            // to a number. No idea why but don't uncomment this without
            // checking out a KiwiTextField with type='number'
            // input.onBlur()
          },
          disableUnderline: this.props.disableUnderline
            ? this.props.disableUnderline
            : true,
          classes: {
            input: cns(classes.input, stateClasses),
            formControl: cns(classes.formControl, stateClasses),
            focused: classes.inputFocused
          },
          startAdornment: StartAdornmentIcon ? (
            <InputAdornment position='start'>
              <StartAdornmentIcon className={ cns(classes.icon, stateClasses) } />
            </InputAdornment>
          ) : null
        }}
        InputLabelProps={{
          classes: {
            root: cns(classes.label, stateClasses),
            shrink: cns(classes.labelShrink, stateClasses)
          },
          ...this.props.addlInputLabelProps
        }}
        FormHelperTextProps={{
          classes: {
            root: classes.formHelper,
            error: cns(classes.formHelper, stateClasses)
          }
        }}
      />
    )
  }
}

export default withStyles(styles, { withTheme: true })(KiwiTextField)
