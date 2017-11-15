import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyUserLessons = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
    return ApiFetch(`${config.api}/api/userlessons`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS, payload: res })
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_MANY_USER_LESSONS_FAILURE, payload: e })
      })
  }
}

export const getUserLesson = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_USER_LESSON_REQUEST })
    return ApiFetch(`${config.api}/api/userlessons/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_USER_LESSON_SUCCESS, payload: res })
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_USER_LESSON_FAILURE, payload: e })
      })
  }
}

export const putUserLesson = (params) => {
  const { id } = params
  delete params.id
  const options = {
    method: "PUT",
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_USER_LESSON_REQUEST })
    return ApiFetch(`${config.api}/api/userlessons/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.PUT_USER_LESSON_SUCCESS, payload: res})
      })
      .catch(e => {
        dispatch({ type: ACTIONS.PUT_USER_LESSON_FAILURE, payload: e })
      })
  }
}

export const postUserLesson = (params) => {
  const options = {
    method: "POST",
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_USER_LESSON_REQUEST })
    return ApiFetch(`${config.api}/api/userlessons/`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_USER_LESSON_SUCCESS, payload: res })
        return res // needed so that component can know about the _id
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_USER_LESSON_FAILURE, payload: e })
      })
  }
}