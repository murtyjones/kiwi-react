import { ACTIONS } from '../constants'

export const openModal = payload => {
  return dispatch => {
    dispatch({ type: ACTIONS.OPEN_MODAL, payload })
  }
}

export const closeModal = payload => {
  return dispatch => {
    dispatch({ type: ACTIONS.CLOSE_MODAL, payload })
  }
}
