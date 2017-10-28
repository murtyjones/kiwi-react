import AuthServiceV2 from '../utils/AuthServiceV2'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

const authServiceV2 = new AuthServiceV2()

export const login = (params) => {
  const { email, password } = params
  return dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    return authServiceV2.login({ email, password })
    .then(success => {
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: success })
    }).catch(err => {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err })
      throw err
    })
  }
}