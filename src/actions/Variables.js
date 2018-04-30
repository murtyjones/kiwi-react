import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyVariables = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_VARIABLES_REQUEST })
    return ApiFetch(`${config.api}/variables`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_MANY_VARIABLES_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_MANY_VARIABLES_FAILURE, payload: e })
      })
  }
}

export const deleteVariable = (params) => {
  const { id } = params
  const options = {
    method : "DELETE"
  }
  return dispatch => {
    dispatch({ type: ACTIONS.DELETE_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/variables/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.DELETE_VARIABLE_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.DELETE_VARIABLE_FAILURE, payload: e})
      })
  }
}

export const getVariable = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/variables/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_VARIABLE_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_VARIABLE_FAILURE, payload: e })
      })
  }
}

export const putVariable = (params) => {
  const { id } = params
  const options = {
    method: 'PUT',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/variables/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.PUT_VARIABLE_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.PUT_VARIABLE_FAILURE, payload: e })
      })
  }
}

export const postVariable = (params) => {
  const options = {
    method: 'POST',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_VARIABLE_REQUEST })
    return ApiFetch(`${config.api}/variables`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_VARIABLE_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_VARIABLE_FAILURE, payload: e })
      })
  }
}
