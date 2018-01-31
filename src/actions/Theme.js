import { ACTIONS } from '../constants'

export const setMainThemeColor = color => dispatch =>
    dispatch({ type: ACTIONS.SET_MAIN_COLOR, payload: color })

export const setSecondaryThemeColor = color => dispatch =>
    dispatch({ type: ACTIONS.SET_SECONDARY_COLOR, payload: color })

export const setThemeTextColor = color => dispatch =>
    dispatch({ type: ACTIONS.SET_TEXT_COLOR, payload: color })