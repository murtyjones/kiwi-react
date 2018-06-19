import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ChoosePath from './slides/ChoosePath'
import StudentSignIn from './slides/StudentSignIn'

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

export const studentSlides = [
  null, // accounts for choosePath
  studentSignInSlide
]


export const providerSlides = [
  null, // accounts for choosePath
]
