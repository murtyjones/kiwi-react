import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ChoosePath from './slides/ChoosePath'
import StudentSignIn from './slides/StudentSignIn'
import ProviderSignIn from './slides/ProviderSignIn'
import StudentForgotPassword from './slides/StudentForgotPassword'
import ProviderForgotPassword from './slides/ProviderForgotPassword'
import StudentSignUp from './slides/StudentSignUp'

export const choosePathSlide = {
  Component: ChoosePath, FieldComponent: Field
  , name: 'isStudentSignIn'
  , headerText: 'Sign in to your account'
}

export const studentSignInSlide = {
  Component: StudentSignIn, FieldComponent: Fields
  , names: [
    'username',
    'password'
  ]
  , headerText: 'Sign in to your account'
  , submitText: 'Sign in'
}

export const providerSignInSlide = {
  Component: ProviderSignIn, FieldComponent: Fields
  , names: [
    'email',
    'password'
  ]
  , headerText: 'Sign in to your account'
  , submitText: 'Sign in'
}

export const studentForgotPasswordSlide = {
  Component: StudentForgotPassword, FieldComponent: Field
  , name: 'studentForgotPassword'
  , headerText: 'Let your parent know!'
}

export const providerForgotPasswordSlide = {
  Component: ProviderForgotPassword, FieldComponent: Field
  , name: 'email'
  , headerText: 'Reset your password'
  , submitText: 'Send Reset Password Email'
  , progress: false
  , successMessage: "Check your email for a link to reset your password! If you don't see an e-mail from us, check your spam folder."
}

export const studentSignUpSlide = {
  Component: StudentSignUp, FieldComponent: Field
  , name: 'studentSignUp'
  , headerText: 'Sign in to your account'
}

export const studentSlides = [
  null // accounts for choosePath
  , studentSignInSlide
  , studentForgotPasswordSlide
  , studentSignUpSlide
]


export const providerSlides = [
  null // accounts for choosePath
  , providerSignInSlide
  , providerForgotPasswordSlide
]
