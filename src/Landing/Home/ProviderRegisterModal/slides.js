import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ProviderSignup from './slides/ProviderSignup'
import ProvideesSignup from './slides/ProvideesSignup'
import ProvideesSignupSuccess from './slides/ProvideesSignupSuccess'
import BillingInfo from './slides/BillingInfo'
import { register } from '../../../actions/index'


const slides = [
  {
    Component: ProviderSignup
    , FieldComponent: Fields
    , names: [ 'email', 'password', 'confirmPassword' ]
    , fieldName: 'providerDetails'
    , headerText: `First, let's make your account.`
    , submitText: 'Sign Me Up!'
    , makeParams: v => ({ email: v.email, password: v.password })
    // , action: register
  },
  {
    Component: ProvideesSignup
    , FieldComponent: FieldArray
    , name: 'providees'
    , fieldName: 'provideeDetails'
    , headerText: `Next, let's make your student's account.`
    , submitText: `Make My Student's Account!`
    , makeParams: v => {
      // submit most recently submitted providee
      const last = v.providees.length - 1
      return {
        username: v.providees[last].username,
        password: v.providees[last].password
      }
    }
    // , action: register
  },
  {
    Component: ProvideesSignupSuccess
    , FieldComponent: Field
    , name: 'providees'
    , fieldName: 'provideeSuccess'
    , headerTextMaker: formValues => {
      const students = formValues.providees
      // the '2' accounts for the final empty slide that we add on componentWillUnmount
      const prefix = students.length > 2
        ? 'Your students are'
        : 'Your student is'
      return  `${prefix} almost ready to start coding!`
    }
    , submitText: 'On to the Last Step'
    , action: null
  },
  {
    Component: BillingInfo
    , FieldComponent: Fields
    , names: [ 'name', 'addressLine1', 'addressLine2', 'addressCity', 'addressState' ]
    , fieldName: 'paymentInfo'
    , headerText: 'Enter your payment information'
    , submitText: 'See my subscription details'
    , action: null
  }
]

export default slides
