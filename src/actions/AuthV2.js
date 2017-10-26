import AuthServiceV2 from '../utils/AuthServiceV2'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

const authServiceV2 = new AuthServiceV2()

export const login = (params) => {
  const { email, password } = params
  return async dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    try {
      const success = await authServiceV2.login(email, password)
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: success })
      return success
    } catch (error) {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: error })
      throw new Error(error)
    }
  }
}