import { ACTIONS } from '../constants'

const initialState = {
  themeColor: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_THEME_COLOR: {
      const newState = Object.assign({}, state, {
        themeColor: action.payload
      })
      return newState
    }
    default:
      return state
  }
}