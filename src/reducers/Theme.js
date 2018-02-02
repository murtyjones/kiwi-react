import { ACTIONS } from '../constants'

const initialState = {
  textColor: '#624F8F'
  , mainThemeColor: '#FFFFFF'
  , secondaryThemeColor: '#624F8F'
  , thirdaryThemeColor: '#624F8F'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_THEME: {
      const newState = Object.assign({}, state, {
        ...action.payload
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