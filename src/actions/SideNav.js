import { ACTIONS } from '../constants'

export const openSidebar = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.OPEN_SIDENAV })
  }
}

export const closeSidebar = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.CLOSE_SIDENAV })
  }
}