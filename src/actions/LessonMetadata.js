import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'


export const getLessonOrder = () => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_LESSON_ORDER_REQUEST })
    return ApiFetch(`${config.api}/lesson-order`, options)
    .then(res => {
      dispatch({ type: ACTIONS.GET_LESSON_ORDER_SUCCESS, payload: res })
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_LESSON_ORDER_FAILURE, payload: e })
      throw e
    })
  }
}

export const putLessonOrder = (params) => {
  const options = {
    method: 'PUT',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_LESSON_ORDER_REQUEST })
    return ApiFetch(`${config.api}/lesson-order`, options)
    .then(res => {
      dispatch({ type: ACTIONS.PUT_LESSON_ORDER_SUCCESS, payload: res})
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.PUT_LESSON_ORDER_FAILURE, payload: e })
    })
  }
}