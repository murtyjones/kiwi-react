import { ACTIONS } from '../constants'

export const openTopBar = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.OPEN_TOPBAR })
  }
}

export const closeTopBar = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.CLOSE_TOPBAR })
  }
}