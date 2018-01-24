import { ACTIONS } from '../constants'

const initialState = {
  secondaryThemeColor: '#624F8F'
  , mainThemeColor: '#FFFFFF'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_MAIN_COLOR: {
      const newState = Object.assign({}, state, {
        mainThemeColor: action.payload
      })
      return newState
    }
    case ACTIONS.SET_SECONDARY_COLOR: {
      const newState = Object.assign({}, state, {
        secondaryThemeColor: action.payload
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, initialState)
      return newState
    }
    default:
      return state
  }
}