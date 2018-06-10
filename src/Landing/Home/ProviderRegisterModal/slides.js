import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'

import ProviderSignup from './slides/ProviderSignup'
import ProvideeSignup from './slides/ProvideeSignup'
import { register } from '../../../actions/index'


const slides = [
  {
    Component: ProviderSignup
    , FieldComponent: Fields
    , names: [ 'email', 'password', 'confirmPassword' ]
    , fieldName: 'providerDetails'
    , submitText: 'Sign Me Up!'
    , makeParams: v => ({ email: v.email, password: v.password })
    , action: register
  },
  {
    Component: ProvideeSignup
    , FieldComponent: Fields
    , names: [ 'username', 'password', 'confirmPassword' ]
    , fieldName: 'provideeDetails'
    , submitText: `Make my student's account!`
    , makeParams: v => ({ username: v.username, password: v.password })
    , action: register
  }
]

export default slides
