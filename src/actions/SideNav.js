import { ACTIONS } from '../constants'

export const openSideNav = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.OPEN_SIDENAV })
  }
}

export const closeSideNav = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.CLOSE_SIDENAV })
  }
}