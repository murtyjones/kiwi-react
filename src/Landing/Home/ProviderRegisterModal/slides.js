import React from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ProviderSignup from './slides/ProviderSignup'
import ProvideesSignup from './slides/ProvideesSignup'
import ProvideesSignupSuccess from './slides/ProvideesSignupSuccess'
import BillingInfo from './slides/BillingInfo'
import Confirmation from './slides/Confirmation'
import Success from './slides/Success'
import SalesBox from './SalesBox'
import StudentSideBox from './StudentSideBox'
import SuccessSideBox from './SuccessSideBox'

import ChoosePath from '../LoginModal/slides/ChoosePath'
import StudentSignUp from '../LoginModal/slides/StudentSignUp'

export const choosePathSlide = {
  Component: ChoosePath, FieldComponent: Field
  , SideComponent: null
  , name: 'isStudentSignUp'
  , headerText: 'Sign up today'
}


export const studentSignUpSlide = {
  Component: StudentSignUp, FieldComponent: Field
  , SideComponent: StudentSideBox
  , name: 'studentSignUp'
  , headerText: 'Sorry!'
  , submitButtonId: 'student-sign-up'
}

export const providerSignupSlide = {
  Component: ProviderSignup
  , SideComponent: SalesBox
  , FieldComponent: Fields
  , names: [ 'email', 'password', 'confirmPassword', 'termsAccepted' ]
  , headerText: `First, let's make your account.`
  , submitText: 'Sign Me Up!'
  , submitButtonId: '1-sign-up'
}

export const provideesSignupSlide = {
  Component: ProvideesSignup
  , SideComponent: SalesBox
  , FieldComponent: FieldArray
  , name: 'providees'
  , headerText: `Tell us a bit about your student.`
  , submitText: `Make My Student's Account!`
  , submitButtonId: '2-sign-student-up'
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
  , submitButtonId: '3-sign-student-up-success'
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
    'addressState',
    'creditCard'
  ]
  , headerText: 'Enter your payment information'
  , submitText: 'See my subscription details'
  , submitButtonId: '4-payment-information'
  , shouldCreateToken: true
}

export const confirmationSlide = {
  Component: Confirmation
  , SideComponent: SalesBox
  , FieldComponent: Field
  , name: 'confirmation'
  , headerText: 'Confirm your subscription!'
  , submitText: 'Confirm'
  , submitButtonId: '5-confirm-subscription'
}

export const successSlide = {
  Component: Success
    , SideComponent: SuccessSideBox
  , FieldComponent: Field
  , name: 'success'
  , headerText: `You're all set!`
  , submitText: 'Take me to my dashboard!'
  , submitButtonId: '6-take-me-home'
}

export const providerSlides = [
  null, // choose path slide
  providerSignupSlide,
  provideesSignupSlide,
  provideesSignupSuccessSlide,
  billingInfoSlide,
  confirmationSlide,
  successSlide
]

export const studentSlides = [
  null, // choose path slide
  studentSignUpSlide
]
