import AuthService from '../utils/AuthService'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'
import BluebirdPromise from 'bluebird'

const authService = new AuthService()

export const login = (params) => {
  const { email, password } = params
  return dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    return authService.login({ email, password })
    .then(success => {
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: success })
    }).catch(err => {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err })
      throw err
    })
  }
}

export const register = (params) => {
  const { email, password } = params
  return dispatch => {
    dispatch({ type: ACTIONS.REGISTER_REQUEST })
    const params = {
      method: 'POST',
      body: { email, password }
    }
    return ApiFetch(`${config.api}/api/register`, params)
    .then(success => {
      dispatch({ type: ACTIONS.REGISTER_SUCCESS, payload: success })
      return success
    }).catch(err => {
      dispatch({ type: ACTIONS.REGISTER_FAILURE, payload: err })
      throw err
    })

  }
}

export const signout = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.SIGNOUT_REQUEST })
    return AuthService.signout()
    .then(res => {
      dispatch({ type: ACTIONS.SIGNOUT_SUCCESS, payload: res })
      return res
    }).catch(err => {
      dispatch({ type: ACTIONS.SIGNOUT_FAILURE, payload: err })
      throw err
    })
  }
}

export const refreshToken = () => {
  return async dispatch => {
    dispatch({ type: ACTIONS.TOKEN_REFRESH, payload: {} })
  }
}