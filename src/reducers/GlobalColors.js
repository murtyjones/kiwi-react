import { ACTIONS, GLOBAL_COLORS } from '../constants'

export default (state = GLOBAL_COLORS.default, action) => {
  switch (action.type) {
    case ACTIONS.SET_GLOBAL_COLORS: {
      const newState = Object.assign({}, state, {
        ...action.payload
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, GLOBAL_COLORS.default)
      return newState
    }
    default:
      return state
  }
}