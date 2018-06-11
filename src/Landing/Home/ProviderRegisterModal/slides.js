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
    , headerText: `Next, let's make your student's account.`
    , submitText: `Make My Student's Account!`
  },
  {
    Component: ProvideesSignupSuccess
    , FieldComponent: Field
    , name: 'providees'
    , headerTextMaker: formValues => {
      const students = formValues.providees
      // the '2' accounts for the final empty slide that we add on componentWillUnmount
      const prefix = students.length > 2
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
    , headerText: 'Pay us mofo'
    , submitText: `Let's do it!`
  }
]

export default slides
