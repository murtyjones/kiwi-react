import AuthService from '../utils/AuthService'
import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const signInWithEmailAndPassword = (params) => {
  const { email, password } = params
  return async dispatch => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST })
    try {
      const success = await AuthService.signInWithEmailAndPassword(email, password)
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: success })
      return success
    } catch (error) {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: error })
      throw new Error(error)
    }
  }
}


export const createUserWithEmailAndPassword = (params) => {
  const { email, password } = params
  return async dispatch => {
    dispatch({ type: ACTIONS.REGISTER_REQUEST })
    try {
      const success = await AuthService.createUserWithEmailAndPassword(email, password)
      const params = {
        method: 'POST',
        body: {
          firebaseUID: success.uid,
          email
        }
      }
      ApiFetch(`${config.api}/api/register`, params)
      dispatch({ type: ACTIONS.REGISTER_SUCCESS, payload: success })
      return success
    } catch (error) {
      dispatch({ type: ACTIONS.REGISTER_FAILURE, payload: error })
      throw new Error(error)
    }
  }
}


export const signout = () => {
  return async dispatch => {
    dispatch({ type: ACTIONS.SIGNOUT_REQUEST })
    try {
      const success = await AuthService.signout()
      dispatch({ type: ACTIONS.SIGNOUT_SUCCESS, payload: success })
      return success
    } catch (error) {
      dispatch({ type: ACTIONS.SIGNOUT_FAILURE, payload: error })
      throw new Error(error)
    }
  }
}


export const refreshToken = (params) => {
  return async dispatch => {
    dispatch({ type: ACTIONS.TOKEN_REFRESH, payload: {} })
  }
}