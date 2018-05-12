import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyUserVariables = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_USER_VARIABLES_REQUEST })
    return ApiFetch(`${config.api}/user-variables`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_MANY_USER_VARIABLES_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_MANY_USER_VARIABLES_FAILURE, payload: e })
      })
  }
}

export const deleteUserVariable = (params) => {
  const { id } = params
  const options = {
    method : "DELETE"
  }
  return dispatch => {
    dispatch({ type: ACTIONS.DELETE_USER_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/user-variables/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.DELETE_USER_VARIABLE_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.DELETE_USER_VARIABLE_FAILURE, payload: e})
      })
  }
}

export const getUserVariable = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_USER_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/user-variables/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_USER_VARIABLE_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_USER_VARIABLE_FAILURE, payload: e })
      })
  }
}

export const putUserVariable = (params) => {
  const { id } = params
  const options = {
    method: 'PUT',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_USER_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/user-variables/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.PUT_USER_VARIABLE_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.PUT_USER_VARIABLE_FAILURE, payload: e })
      })
  }
}

export const postUserVariable = (params) => {
  const options = {
    method: 'POST',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_USER_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/user-variables`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_USER_VARIABLE_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_USER_VARIABLE_FAILURE, payload: e })
      })
  }
}
