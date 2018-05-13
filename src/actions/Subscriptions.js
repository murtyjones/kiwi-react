import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManySubscriptions = (params) => {
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_SUBSCRIPTIONS_REQUEST })
    return ApiFetch(`${config.api}/subscriptions`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_MANY_SUBSCRIPTIONS_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_MANY_SUBSCRIPTIONS_FAILURE, payload: e })
      })
  }
}

export const deleteSubscription = (params) => {
  const { id } = params
  const options = {
    method : "DELETE"
  }
  return dispatch => {
    dispatch({ type: ACTIONS.DELETE_SUBSCRIPTION_REQUEST })
    return ApiFetch(`${config.api}/subscriptions/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.DELETE_SUBSCRIPTION_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.DELETE_SUBSCRIPTION_FAILURE, payload: e})
      })
  }
}

export const getSubscription = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_SUBSCRIPTION_REQUEST })
    return ApiFetch(`${config.api}/subscriptions/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.GET_SUBSCRIPTION_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.GET_SUBSCRIPTION_FAILURE, payload: e })
      })
  }
}

export const putSubscription = (params) => {
  const { id } = params
  const options = {
    method: 'PUT',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_SUBSCRIPTION_REQUEST })
    return ApiFetch(`${config.api}/subscriptions/${id}`, options)
      .then(res => {
        dispatch({ type: ACTIONS.PUT_SUBSCRIPTION_SUCCESS, payload: res})
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.PUT_SUBSCRIPTION_FAILURE, payload: e })
      })
  }
}

export const postSubscription = (params) => {
  const options = {
    method: 'POST',
    body: params
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_SUBSCRIPTION_REQUEST })
    return ApiFetch(`${config.api}/subscriptions`, options)
      .then(res => {
        dispatch({ type: ACTIONS.POST_SUBSCRIPTION_SUCCESS, payload: res })
        return res
      })
      .catch(e => {
        dispatch({ type: ACTIONS.POST_SUBSCRIPTION_FAILURE, payload: e })
      })
  }
}
