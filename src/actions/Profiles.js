import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyProfiles = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_PROFILES_REQUEST })
    return ApiFetch(`${config.api}/profiles`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_MANY_PROFILES_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_MANY_PROFILES_FAILURE, payload: e })
      })
  }
}

export const deleteProfile = (params) => {
  const { id } = params
  const options = {
    method : "DELETE"
  }
  return dispatch => {
    dispatch({ type: ACTIONS.DELETE_PROFILE_REQUEST })
    return ApiFetch(`${config.api}/profiles/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.DELETE_PROFILE_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.DELETE_PROFILE_FAILURE, payload: e})
      })
  }
}

export const getProfile = (params) => {
  const { userId } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_PROFILE_REQUEST })
    return ApiFetch(`${config.api}/profiles/${userId}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_PROFILE_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_PROFILE_FAILURE, payload: e })
      })
  }
}

export const updateProfile = (params) => {
  const { _id } = params
  const options = {
    method: 'PUT',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_PROFILE_REQUEST })
    return ApiFetch(`${config.api}/profiles/${_id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.PUT_PROFILE_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.PUT_PROFILE_FAILURE, payload: e })
      })
  }
}

export const postProfile = (params) => {
  const options = {
    method: 'POST',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_PROFILE_REQUEST })
    return ApiFetch(`${config.api}/profiles`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_PROFILE_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_PROFILE_FAILURE, payload: e })
      })
  }
}

export const checkProfileEmailVerification = (params) => {
  const options = {
    method: 'POST',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_CHECK_EMAIL_VERIFICATION_REQUEST })
    return ApiFetch(`${config.api}/profiles/email-verification`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_CHECK_EMAIL_VERIFICATION_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_CHECK_EMAIL_VERIFICATION_FAILURE, payload: e })
      })
  }
}