import { ACTIONS } from '../constants'

export const setGlobalColors = params => dispatch =>
    dispatch({ type: ACTIONS.SET_GLOBAL_COLORS, payload: params })