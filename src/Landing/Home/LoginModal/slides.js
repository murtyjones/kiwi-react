import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ChoosePath from './slides/ChoosePath'
import StudentSignIn from './slides/StudentSignIn'
import StudentForgotPassword from './slides/StudentForgotPassword'
import StudentSignUp from './slides/StudentSignUp'

export const choosePathSlide = {
  Component: ChoosePath
  , FieldComponent: Field
  , name: 'isStudentSignIn'
  , headerText: 'Sign in to your account'
}

export const studentSignInSlide = {
  Component: StudentSignIn
  , FieldComponent: Fields
  , names: [
    'username',
    'password'
  ]
  , headerText: 'Sign in to your account'
  , submitText: 'Sign in'
}

export const studentForgotPasswordSlide = {
  Component: StudentForgotPassword
  , FieldComponent: Field
  , name: 'studentForgotPassword'
  , headerText: 'Sign in to your account'
}

export const studentSignUpSlide = {
  Component: StudentSignUp
  , FieldComponent: Field
  , name: 'studentForgotPassword'
  , headerText: 'Sign in to your account'
}

export const studentSlides = [
  null // accounts for choosePath
  , studentSignInSlide
  , studentForgotPasswordSlide
  , studentSignUpSlide
]


export const providerSlides = [
  null, // accounts for choosePath
]
