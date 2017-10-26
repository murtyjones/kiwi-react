import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyUserProjects = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_USER_PROJECTS_REQUEST })
    return ApiFetch(`${config.api}/api/userprojects`, options)
    .then(res => {
      dispatch({ type: ACTIONS.GET_MANY_USER_PROJECTS_SUCCESS, payload: res })
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
    return ApiFetch(`${config.api}/api/userprojects/${id}`, options)
    .then(res => {
      console.log("value of res in getUserProject Actions", res)
      dispatch({ type: ACTIONS.GET_USER_PROJECT_SUCCESS, payload: res })
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_USER_PROJECT_FAILURE, payload: e })
    })
  }
}

export const putUserProject = (params) => {
  const { id, code, title, description } = params
  const options = {
    method: "PUT",
    body: {
      code: code
      , title: title
      , description: description
    }
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_USER_PROJECT_REQUEST })
    return ApiFetch(`${config.api}/api/userprojects/${id}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.PUT_USER_PROJECT_SUCCESS, payload: res})
    })
    .catch(e => {
      dispatch({ type: ACTIONS.PUT_USER_PROJECT_FAILURE, payload: e })
    })
  }
}

export const postUserProject = (params) => {
  const { code, title, description } = params
  const options = {
    method: "POST",
    body: {
      code: code
      , title: title
      , description: description
    }
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_USER_PROJECT_REQUEST })
    return ApiFetch(`${config.api}/api/userprojects/`, options)
    .then(res => {
      dispatch({ type: ACTIONS.POST_USER_PROJECT_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.POST_USER_PROJECT_FAILURE, payload: e })
    })
  }
}
