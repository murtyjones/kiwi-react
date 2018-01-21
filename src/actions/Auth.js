import AuthService from '../utils/AuthService'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

const authService = new AuthService()

export const login = (params) => {
  const { username, password } = params
  return dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    return authService.login({ username, password })
    .then(success => {
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: success })
      return success
    }).catch(err => {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err })
      throw err
    })
  }
}

export const register = (params) => {
  const { username, password } = params
  console.log(username)
  return dispatch => {
    dispatch({ type: ACTIONS.REGISTER_REQUEST })
    const params = {
      method: 'POST',
      body: { username, password }
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
    return authService.signout()
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

export const upsertPasswordRecoveryImages = (params) => {
  const { userId, images } = params
  return dispatch => {
    dispatch({ type: ACTIONS.UPSERT_PASSWORD_RECOVERY_REQUEST })
    const params = {
      method: 'PUT',
      body: { images }
    }
    return ApiFetch(`${config.api}/api/user/recovery/${userId}`, params)
      .then(success => {
        dispatch({ type: ACTIONS.UPSERT_PASSWORD_RECOVERY_SUCCESS, payload: success })
        return success
      }).catch(err => {
        dispatch({ type: ACTIONS.UPSERT_PASSWORD_RECOVERY_FAILURE, payload: err })
        throw err
      })

  }
}