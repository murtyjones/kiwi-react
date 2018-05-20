import AuthService from '../utils/AuthService'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

const authService = new AuthService()

export const login = ({ username, email, password }) => {
  return dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    const params = { password }
    if(email) params.email = email
    if(username) params.username = username
    return authService.login(params)
    .then(success => {
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: success })
      return success
    }).catch(err => {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err })
      throw err
    })
  }
}

export const register = ({ username, email, password }) => {
  return dispatch => {
    dispatch({ type: ACTIONS.REGISTER_REQUEST })
    const params = {
      method: 'POST',
      body: { password }
    }
    if(email) params.body.email = email
    if(username) params.body.username = username

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
  const { username, images } = params
  return dispatch => {
    dispatch({ type: ACTIONS.UPSERT_PASSWORD_RECOVERY_REQUEST })
    const params = {
      method: 'PUT',
      body: { images }
    }
    return ApiFetch(`${config.api}/password/change-recovery/${username}`, params)
      .then(success => {
        dispatch({ type: ACTIONS.UPSERT_PASSWORD_RECOVERY_SUCCESS, payload: success })
        return success
      }).catch(err => {
        dispatch({ type: ACTIONS.UPSERT_PASSWORD_RECOVERY_FAILURE, payload: err })
        throw err
      })

  }
}

export const checkPasswordRecoveryCorrectness = (params) => {
  const { username } = params
  return dispatch => {
    dispatch({ type: ACTIONS.CHECK_PASSWORD_RECOVERY_REQUEST })
    const options = {
      method: 'POST',
      body: params
    }
    return ApiFetch(`${config.api}/password/check-recovery/${username}`, options)
      .then(success => {
        dispatch({ type: ACTIONS.CHECK_PASSWORD_RECOVERY_SUCCESS, payload: success })
        return success
      }).catch(err => {
        dispatch({ type: ACTIONS.CHECK_PASSWORD_RECOVERY_FAILURE, payload: err })
        throw err
      })

  }
}

export const resetPassword = params => {
  const { username, password, recoveryCode } = params
  return dispatch => {
    dispatch({ type: ACTIONS.RESET_PASSWORD_REQUEST })
    const options = {
      method: 'POST',
      body: { password, recoveryCode }
    }
    return ApiFetch(`${config.api}/password/recover/${username}`, options)
      .then(success => {
        dispatch({ type: ACTIONS.RESET_PASSWORD_SUCCESS, payload: success })
        return success
      }).catch(err => {
        dispatch({ type: ACTIONS.RESET_PASSWORD_FAILURE, payload: err })
        throw err
      })

  }
}

export const changePassword = params => {
  const { _id, currentPassword, newPassword } = params
  return dispatch => {
    dispatch({ type: ACTIONS.RESET_PASSWORD_REQUEST })
    const options = {
      method: 'POST',
      body: { currentPassword, newPassword }
    }
    return ApiFetch(`${config.api}/password/change/${_id}`, options)
      .then(success => {
        dispatch({ type: ACTIONS.RESET_PASSWORD_SUCCESS, payload: success })
        return success
      }).catch(err => {
        dispatch({ type: ACTIONS.RESET_PASSWORD_FAILURE, payload: err })
        throw err
      })

  }
}