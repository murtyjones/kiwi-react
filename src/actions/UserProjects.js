import { ApiFetch } from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyUserProjects = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_USER_PROJECTS_REQUEST })
    return ApiFetch(`${config.api}/api/userproject`, options)
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
    return ApiFetch(`${config.api}/api/userproject/${id}`, options)
      .then(res => {
        console.log("value of res in getUserProject Actions", res);
        dispatch({ type: ACTIONS.GET_USER_PROJECT_SUCCESS, payload: res })
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_USER_PROJECT_FAILURE, payload: e })
      })
  }
}

export const putUserProject = (params) => {
  const { code, id } = params
  console.log('value of params in putUserProject in actions: ', params);
  console.log('inside putUserProject in actions and value of id: ', id);
  console.log('inside putUserProject in actions and value of code: ', code);
  const options = {
    method:"PUT",
    body:{
      code: code,
      id: id
    }
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_USER_PROJECT_REQUEST })
    return ApiFetch(`${config.api}/api/userproject/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.PUT_USER_PROJECT_SUCCESS, payload: res })
      })
      .catch(e => {
        dispatch({ type: ACTIONS.PUT_USER_PROJECT_FAILURE, payload: e })
      })
  }
}

export const postUserProject = (params) => {
  const { code, title } = params
  const options = {
    method:"POST",
    body:{
      code: code,
      title: title
    }
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_USER_PROJECT_REQUEST })
    return ApiFetch(`${config.api}/api/userproject/`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_USER_PROJECT_SUCCESS, payload: res })
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_USER_PROJECT_FAILURE, payload: e })
      })
  }
}
