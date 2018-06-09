import React, { PureComponent } from 'react'
import cns from 'classnames'
import Button from '@material-ui/core/Button'


export default class SubmitButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text = 'Submit', handleSubmit, pristine, submitting, invalid } = this.props
    const disabled = pristine || submitting || invalid
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
