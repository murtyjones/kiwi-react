import React, { PureComponent, Fragment } from 'react'
import cns from 'classnames'
import Button from '@material-ui/core/Button'


export default class SubmitButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text = 'Submit', onClick, pristine, submitting, invalid } = this.props
    const disabled = pristine || submitting || invalid

    return (
      <Fragment>
        <Button
          className={ cns({ enabled: !disabled }) }
          variant='flat'
          type='submit'
          onClick={ onClick }
          disabled={ disabled }
        >
          { text }
        </Button>
      </Fragment>
    )
  }
}
