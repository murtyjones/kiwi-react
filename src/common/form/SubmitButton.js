import React, { PureComponent } from 'react'
import cns from 'classnames'
import Button from '@material-ui/core/Button'


export default class SubmitButton extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render() {
    const { text = 'Submit', handleSubmit, pristine, submitting } = this.props
    const { focused } = this.state
    const disabled = pristine || submitting
    return (
      <Button
        className={ cns('submitButton', { enabled: !disabled }) }
        variant='outlined'
        type='submit'
        onClick={ handleSubmit }
        disabled={ disabled }
      >
        { text }
      </Button>
    )
  }
}
