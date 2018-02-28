import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyLessonThemes = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_LESSON_THEMES_REQUEST })
    return ApiFetch(`${config.api}/lesson-themes`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_MANY_LESSON_THEMES_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_MANY_LESSON_THEMES_FAILURE, payload: e })
      })
  }
}

export const deleteLessonTheme = (params) => {
  const { id } = params
  const options = {
    method : "DELETE"
  }
  return dispatch => {
    dispatch({ type: ACTIONS.DELETE_LESSON_THEME_REQUEST })
    return ApiFetch(`${config.api}/lesson-themes/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.DELETE_LESSON_THEME_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.DELETE_LESSON_THEME_FAILURE, payload: e})
      })
  }
}

export const getLessonTheme = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_LESSON_THEME_REQUEST })
    return ApiFetch(`${config.api}/lesson-themes/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_LESSON_THEME_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_LESSON_THEME_FAILURE, payload: e })
      })
  }
}

export const putLessonTheme = (params) => {
  const { id } = params
  const options = {
    method: "PUT",
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_LESSON_THEME_REQUEST })
    return ApiFetch(`${config.api}/lesson-themes/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.PUT_LESSON_THEME_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.PUT_LESSON_THEME_FAILURE, payload: e })
      })
  }
}

export const postLessonTheme = (params) => {
  const options = {
    method: "POST",
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_LESSON_THEME_REQUEST })
    return ApiFetch(`${config.api}/lesson-themes`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_LESSON_THEME_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_LESSON_THEME_FAILURE, payload: e })
      })
  }
}
