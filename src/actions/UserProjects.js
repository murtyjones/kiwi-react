import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'
import { encode } from 'querystring'

export const getManyUserProjects = (params) => {
  const query = params ? `?${encode(params)}` : ''
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_USER_PROJECTS_REQUEST })
    return ApiFetch(`${config.api}/user-projects${query}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.GET_MANY_USER_PROJECTS_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_MANY_USER_PROJECTS_FAILURE, payload: e })
    })
  }
}

export const getUserProject = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_USER_PROJECT_REQUEST })
    return ApiFetch(`${config.api}/user-projects/${id}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.GET_USER_PROJECT_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_USER_PROJECT_FAILURE, payload: e })
    })
  }
}

export const putUserProject = (params) => {
  const { id } = params
  const options = {
    method: 'PUT',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_USER_PROJECT_REQUEST })
    return ApiFetch(`${config.api}/user-projects/${id}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.PUT_USER_PROJECT_SUCCESS, payload: res})
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.PUT_USER_PROJECT_FAILURE, payload: e })
    })
  }
}

export const postUserProject = (params) => {
  const options = {
    method: 'POST',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_USER_PROJECT_REQUEST })
    return ApiFetch(`${config.api}/user-projects`, options)
    .then(res => {
      dispatch({ type: ACTIONS.POST_USER_PROJECT_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.POST_USER_PROJECT_FAILURE, payload: e })
    })
  }
}
