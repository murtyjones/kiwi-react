import React, { Component } from 'react'
import { Field, Fields, FieldArray } from 'redux-form'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'

import ProviderSignup from './slides/ProviderSignup'
import ProvideeSignup from './slides/ProvideeSignup'
import { register } from '../../../actions/index'


const slides = [
  {
    Component: withRouter(connect(null, (dispatch) => {
      return {
        register: params => dispatch(register(params))
      }
    })(ProviderSignup))
    , FieldComponent: Fields
    , names: [ 'email', 'password', 'confirmPassword' ]
    , fieldName: 'providerDetails'
    , submitText: 'Sign me up!'
  },
  {
    Component: withRouter(connect(null, (dispatch) => {
      return {
        register: params => dispatch(register(params))
      }
    })(ProvideeSignup))
    , FieldComponent: FieldArray
    , fieldName: 'provideeDetails'
    , submitText: `Make my student's account!`
  }
]

export default slides
