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

export const setTopBarTitle = (title) => {
  console.log(title)
  return dispatch => {
    dispatch({ type: ACTIONS.SET_TOPBAR_TITLE, payload: title })
  }
}

export const toggleTopBarTitleFocus = (isFocused) => {
  return dispatch => {
    dispatch({ type: ACTIONS.TOGGLE_TOPBAR_TITLE_FOCUS, payload: isFocused })
  }
}

export const toggleTopBarTitleIsDisabled = (isDisabled) => {
  return dispatch => {
    dispatch({ type: ACTIONS.TOGGLE_TOPBAR_TITLE_EDITABLE, payload: isDisabled })
  }
}