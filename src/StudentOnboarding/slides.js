import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import LoginSlide from './slides/LoginSlide'
import ChangeUsername from './slides/ChangeUsername'
import ChangePassword from './slides/ChangePassword'

import Slide1 from './slides/1'
import Slide2 from './slides/2'
import Slide3 from './slides/3'
import Slide5 from './slides/5'
import Slide6 from './slides/6'
import Slide7 from './slides/7'
import Slide8 from './slides/8'
import Slide9 from './slides/9'
import Slide10 from './slides/10'
import Slide11 from './slides/11'
import Slide12 from './slides/12'
import Slide13 from './slides/13'

export const login = {
  Component: LoginSlide, FieldComponent: Fields,
  names: [ 'username', 'tempPassword' ],
  submitFunc: 'onLoginSubmit'
}

export const changeUsername = {
  Component: ChangeUsername, FieldComponent: Fields,
  names: [ 'newUsername' ],
  submitFunc: 'onChangeUsernameSubmit'
}

export const changePassword = {
  Component: ChangePassword, FieldComponent: Fields,
  names: [ 'newPassword', 'tempPassword' ],
  submitFunc: 'onChangePasswordSubmit'
}

export const first = { Component: Slide1, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: false }
export const second = { Component: Slide2, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const third = { Component: Slide3, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const fifth = { Component: Slide5, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const sixth = { Component: Slide6, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const seventh = { Component: Slide7, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const eigth = { Component: Slide8, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const ninth = { Component: Slide9, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const tenth = { Component: Slide10, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const eleventh = { Component: Slide11, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const twelfth = { Component: Slide12, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true }
export const thirteenth = { Component: Slide13, FieldComponent: Field, name: 'blah', submitText: 'Next', canGoBack: true, submitFunc: 'onFinalSlideSubmit' }

export default [
  login,
  changeUsername,
  changePassword,
  // onboarding slide
  first,
  second,
  third,
  // no fourth anymore
  fifth,
  sixth,
  seventh,
  eigth,
  ninth,
  tenth,
  eleventh,
  twelfth,
  thirteenth
]
