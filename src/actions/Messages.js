import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const postMessage = (params) => {
  const options = {
    method: 'POST',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_MESSAGE_REQUEST })
    return ApiFetch(`${config.api}/messages`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_MESSAGE_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_MESSAGE_FAILURE, payload: e })
      })
  }
}