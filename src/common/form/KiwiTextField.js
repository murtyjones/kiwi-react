import React, { PureComponent } from 'react'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import { TextField as ReduxFormTextField } from 'redux-form-material-ui-next'
import * as T from 'prop-types'

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

  static propTypes = {
    className: T.string,
    disableUnderline: T.bool,
    fullWidth: T.any,
    classes: T.object.isRequired,
    StartAdornmentIcon: T.any,
    input: T.object.isRequired,
    meta: T.object.isRequired,
    successText: T.string,
    addlInputLabelProps: T.object,
  }

  render() {
    const {
      classes, StartAdornmentIcon, input, meta, successText,
      fullWidth, disableUnderline, addlInputLabelProps
    } = this.props
    const { error, visited, pristine, touched, asyncValidating, valid } = meta
    const { focused, color } = this.state
    const errorText = touched && error ? error : ''
    const asyncValidated = (touched || visited) && !pristine && !asyncValidating && valid
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
        fullWidth={ fullWidth ? fullWidth : true }
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
            input.onBlur()
          },
          disableUnderline: disableUnderline ? disableUnderline : true,
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
          ...addlInputLabelProps
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
