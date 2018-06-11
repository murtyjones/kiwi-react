import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ProviderSignup from './slides/ProviderSignup'
import ProvideesSignup from './slides/ProvideesSignup'
import ProvideesSignupSuccess from './slides/ProvideesSignupSuccess'
import BillingInfo from './slides/BillingInfo'
import Confirmation from './slides/Confirmation'


const slides = [
  {
    Component: ProviderSignup
    , FieldComponent: Fields
    , names: [ 'email', 'password', 'confirmPassword' ]
    , headerText: `First, let's make your account.`
    , submitText: 'Sign Me Up!'
  },
  {
    Component: ProvideesSignup
    , FieldComponent: FieldArray
    , name: 'providees'
    , headerText: `Tell us a bit about your student.`
    , submitText: `Make My Student's Account!`
  },
  {
    Component: ProvideesSignupSuccess
    , FieldComponent: Field
    , name: 'providees'
    , headerTextMaker: formValues => {
      const students = formValues.providees
      const prefix = students.length > 1
        ? 'Your students are'
        : 'Your student is'
      return  `${prefix} almost ready to start coding!`
    }
    , submitText: 'On to the Last Step'
  },
  {
    Component: BillingInfo
    , FieldComponent: Fields
    , names: [
      'name',
      'addressLine1',
      'addressLine2',
      'addressCity',
      'addressState'
    ]
    , headerText: 'Enter your payment information'
    , submitText: 'See my subscription details'
    , shouldCreateToken: true
  },
  {
    Component: Confirmation
    , FieldComponent: Field
    , name: 'confirmation'
    , headerText: `Ready To Code?`
    , submitText: `Let's do it!`
  }
]

export default slides
