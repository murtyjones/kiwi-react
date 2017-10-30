import AuthServiceV2 from '../utils/AuthServiceV2'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

const authServiceV2 = new AuthServiceV2()

export const login = (params) => {
  const { email, password } = params
  return dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    return authServiceV2.login({ email, password })
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
  return async dispatch => {
    dispatch({ type: ACTIONS.SIGNOUT_REQUEST })
    return AuthServiceV2.signout()
    .then(res => {
      dispatch({ type: ACTIONS.SIGNOUT_SUCCESS, payload: success })
    }).catch(err => {
      dispatch({ type: ACTIONS.SIGNOUT_FAILURE, payload: err })
    })
  }
}

export const refreshToken = () => {
  return async dispatch => {
    dispatch({ type: ACTIONS.TOKEN_REFRESH, payload: {} })
  }
}