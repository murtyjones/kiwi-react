import React from 'react'
import * as T from 'prop-types'

const ErrorMessage = props => {
  const { successMessage, submitSucceeded, submitFailed, error } = props

  if (submitFailed && error) {
    return (
      <div className='ResultMessage-error'>
        { error }
      </div>
    )
  }

  if (submitSucceeded && successMessage) {
    return (
      <div className='ResultMessage-success'>
        { successMessage }
      </div>
    )
  }

  return null
}

ErrorMessage.propTypes = {
  successMessage: T.string,
  submitSucceeded: T.bool,
  submitFailed: T.bool,
  error: T.string
}


export default ErrorMessage
