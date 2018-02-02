import { ACTIONS } from '../constants'

export const setThemeColors = params => dispatch =>
    dispatch({ type: ACTIONS.SET_THEME, payload: params })