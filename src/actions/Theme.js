import { ACTIONS } from '../constants'

export const setThemeColor = (color) => {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_THEME_COLOR, payload: color })
  }
}