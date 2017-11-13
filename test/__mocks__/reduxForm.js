import React from 'react'

jest.mock('redux-form', () => {
  return {
    Field: (props) => <div>{props.children}</div>
    , reduxForm: () => (component) => component
  }
})