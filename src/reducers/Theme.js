import { ACTIONS } from '../constants'

const initialState = {
  textColor: '#000000'
  , mainThemeColor: '#FFFFFF'
  , secondaryThemeColor: '#624F8F'
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
    case ACTIONS.SET_TEXT_COLOR: {
      const newState = Object.assign({}, state, {
        textColor: action.payload
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