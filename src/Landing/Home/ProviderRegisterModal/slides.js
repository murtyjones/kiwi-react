import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ProviderSignup from './slides/ProviderSignup'
import ProvideesSignup from './slides/ProvideesSignup'
import ProvideesSignupSuccess from './slides/ProvideesSignupSuccess'
import BillingInfo from './slides/BillingInfo'
import Confirmation from './slides/Confirmation'
import SalesBox from './SalesBox'

export const providerSignupSlide = {
    Component: ProviderSignup
    , SideComponent: SalesBox
    , FieldComponent: Fields
    , names: [ 'email', 'password', 'confirmPassword' ]
    , headerText: `First, let's make your account.`
    , submitText: 'Sign Me Up!'
  }

export const provideesSignupSlide = {
    Component: ProvideesSignup
    , SideComponent: SalesBox
    , FieldComponent: FieldArray
    , name: 'providees'
    , headerText: `Tell us a bit about your student.`
    , submitText: `Make My Student's Account!`
  }

export const provideesSignupSuccessSlide = {
    Component: ProvideesSignupSuccess
    , SideComponent: SalesBox
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
  }

export const billingInfoSlide = {
    Component: BillingInfo
    , SideComponent: SalesBox
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
  }

export const confirmationSlide = {
  Component: Confirmation
    , SideComponent: () => <div>damn!</div>
  , FieldComponent: Field
  , name: 'confirmation'
  , headerText: `Ready To Code?`
  , submitText: `Let's do it!`
}

const slides = [
  providerSignupSlide,
  provideesSignupSlide,
  provideesSignupSuccessSlide,
  billingInfoSlide,
  confirmationSlide
]

export default slides
