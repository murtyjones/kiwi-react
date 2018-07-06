import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import First from './slides/First'

export const firstSlide = {
  Component: First
  , FieldComponent: Field
  , name: 'blah'
  , submitText: 'Sign Me Up!'
}

export default [
  firstSlide
]
