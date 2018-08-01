import config from 'config'

import AuthService from '../utils/AuthService'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import { getNewToken } from '../utils/getNewToken'

const authService = new AuthService()

export const login = ({ username, email, password }) => {
  return async dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    const params = { password }
    if (email) params.email = email
    if (username) params.username = username
    try {
      const success = await authService.login(params)
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: success })
      return success
    } catch(err) {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err })
      throw err
    }
  }
}

export const register = ({ username, firstName, lastName, email, ...rest }) => {
  return dispatch => {
    dispatch({ type: ACTIONS.REGISTER_REQUEST })
    const params = {
      method: 'POST',
      body: {
        firstName, lastName, ...rest
      }
    }
    if (email) params.body.email = email
    if (username) params.body.username = username

    const maybeProviderPath = email ? 'provider' : ''
    return ApiFetch(`${config.api}/auth/register/${maybeProviderPath}`, params)
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
    try {
      const res = await authService.signout()
      dispatch({ type: ACTIONS.SIGNOUT_SUCCESS, payload: res })
      return res
    } catch (err) {
      dispatch({ type: ACTIONS.SIGNOUT_FAILURE, payload: err })
      throw err
    }
  }
}

export const refreshToken = (payload) => {
  return async dispatch => {
    dispatch({ type: ACTIONS.TOKEN_REFRESH, payload })
  }
}

export const resetPasswordRequest = params => {
  const { email } = params
  return dispatch => {
    dispatch({ type: ACTIONS.RESET_PASSWORD_EMAIL_REQUEST })
    const options = {
      method: 'POST'
    }
    return ApiFetch(`${config.api}/password/reset/${email}`, options)
      .then(success => {
        dispatch({ type: ACTIONS.RESET_PASSWORD_EMAIL_SUCCESS, payload: success })
        return success
      }).catch(err => {
        dispatch({ type: ACTIONS.RESET_PASSWORD_EMAIL_FAILURE, payload: err })
        throw err
      })

  }
}

export const changePassword = params => {
  const { _id, currentPassword, newPassword } = params
  return async dispatch => {
    dispatch({ type: ACTIONS.CHANGE_PASSWORD_REQUEST })
    try {
      const options = { method: 'POST', body: { currentPassword, newPassword } }
      const success = await ApiFetch(`${config.api}/password/change/${_id}`, options)
      dispatch({ type: ACTIONS.CHANGE_PASSWORD_SUCCESS, payload: success })
      await getNewToken() // so that temporaryPassword will be removed from our token
      return success
    } catch(err) {
      dispatch({ type: ACTIONS.CHANGE_PASSWORD_FAILURE, payload: err })
      throw err
    }

  }
}
