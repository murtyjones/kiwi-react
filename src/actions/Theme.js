import { ACTIONS } from '../constants'

export const setMainThemeColor = (color) => {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_MAIN_COLOR, payload: color })
  }
}

export const setSecondaryThemeColor = (color) => {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_SECONDARY_COLOR, payload: color })
  }
}