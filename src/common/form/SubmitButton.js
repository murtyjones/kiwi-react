import React, { PureComponent, Fragment } from 'react'
import cns from 'classnames'
import Button from '@material-ui/core/Button'


export default class SubmitButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, text = 'Submit', onClick, pristine, submitting, invalid, alwaysEnable, alwaysDisable, className } = this.props

    const disabled = (pristine || submitting || invalid || alwaysDisable) && !alwaysEnable

    return (
      <Fragment>
        <Button
          id={ id }
          className={ cns('submitButton', {
            enabled: !disabled,
            [className]: !!className
          }) }
          variant='outlined'
          type='submit'
          onClick={ onClick }
          disabled={ disabled }
        >
          { text }
        </Button>
        { submitting &&
          <div className='kiwi-spinner'/>
        }
      </Fragment>
    )
  }
}
