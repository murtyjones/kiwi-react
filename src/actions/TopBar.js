import { ACTIONS } from '../constants'

export const openTopBar = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.OPEN_TOP_BAR })
  }
}

export const closeTopBar = () => {
  return dispatch => {
    dispatch({ type: ACTIONS.CLOSE_TOP_BAR })
  }
}

export const setTopBarTitle = (title) => {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_TOP_BAR_TITLE, payload: title })
  }
}

export const toggleTopBarTitleFocus = (isFocused) => {
  return dispatch => {
    dispatch({ type: ACTIONS.TOGGLE_TOP_BAR_TITLE_FOCUS, payload: isFocused })
  }
}

export const toggleTopBarTitleIsDisabled = (isDisabled) => {
  return dispatch => {
    dispatch({ type: ACTIONS.TOGGLE_TOP_BAR_TITLE_EDITABLE, payload: isDisabled })
  }
}

export const setTopBarBreadCrumb = payload => {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_TOP_BAR_BREADCRUMB, payload })
  }
}

export const setTopBarMiddleSectionIsVisible = payload => {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_TOP_BAR_MIDDLE_IS_VISIBLE, payload })
  }
}

export const setTopBarLogoIsVisible = payload => {
  return dispatch => {
    dispatch({ type: ACTIONS.SET_TOP_BAR_LOGO_IS_VISIBLE, payload })
  }
}