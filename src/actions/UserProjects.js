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