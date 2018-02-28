import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyLessons = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_LESSONS_REQUEST })
    return ApiFetch(`${config.api}/lessons`, options)
    .then(res => {
      dispatch({ type: ACTIONS.GET_MANY_LESSONS_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_MANY_LESSONS_FAILURE, payload: e })
    })
  }
}

export const deleteLesson = (params) => {
  const { id } = params
  const options = {
    method : "DELETE"
  }
  return dispatch => {
    dispatch({ type: ACTIONS.DELETE_LESSON_REQUEST })
    return ApiFetch(`${config.api}/lessons/${id}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.DELETE_LESSON_SUCCESS, payload: res})
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.DELETE_LESSON_FAILURE, payload: e})
    })
  }
}

export const getLesson = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_LESSON_REQUEST })
    return ApiFetch(`${config.api}/lessons/${id}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.GET_LESSON_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_LESSON_FAILURE, payload: e })
    })
  }
}

export const putLesson = (params) => {
  const { id } = params
  const options = {
    method: "PUT",
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_LESSON_REQUEST })
    return ApiFetch(`${config.api}/lessons/${id}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.PUT_LESSON_SUCCESS, payload: res})
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.PUT_LESSON_FAILURE, payload: e })
    })
  }
}

export const postLesson = (params) => {
  const options = {
    method: "POST",
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_LESSON_REQUEST })
    return ApiFetch(`${config.api}/lessons`, options)
    .then(res => {
      dispatch({ type: ACTIONS.POST_LESSON_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.POST_LESSON_FAILURE, payload: e })
    })
  }
}
