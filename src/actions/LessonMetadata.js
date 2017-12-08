import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'


export const getLessonOrder = () => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_LESSON_ORDER_REQUEST })
    return ApiFetch(`${config.api}/api/lessons/order`, options)
    .then(res => {
      dispatch({ type: ACTIONS.GET_LESSON_ORDER_SUCCESS, payload: res })
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_LESSON_ORDER_FAILURE, payload: e })
    })
  }
}

export const putLessonOrder = (params) => {
  const options = {
    method: "PUT",
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_LESSON_ORDER_REQUEST })
    return ApiFetch(`${config.api}/api/lessons/order`, options)
    .then(res => {
      dispatch({ type: ACTIONS.PUT_LESSON_ORDER_SUCCESS, payload: res})
    })
    .catch(e => {
      dispatch({ type: ACTIONS.PUT_LESSON_ORDER_FAILURE, payload: e })
    })
  }
}