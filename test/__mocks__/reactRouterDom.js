import React from 'react'
jest.mock('react-router-dom', () => {
  return {
    Link: (props) => <a>{props.children}</a>
  }
})