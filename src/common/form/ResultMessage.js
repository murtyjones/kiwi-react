import React from 'react'

const ErrorMessage = props => {
  const { successMessage, submitSucceeded, submitFailed, error, } = props

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


export default ErrorMessage
