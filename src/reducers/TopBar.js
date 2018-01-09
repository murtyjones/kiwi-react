import { ACTIONS } from '../constants'

const initialState = {
  isTopBarOpen: true
  , topBarHeight: 60
  , topBarTitle: ''
  , topBarTitleDisabled: true
  , topBarFocused: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_TOPBAR: {
      const newState = Object.assign({}, state, {
        isTopBarOpen: true
        , topBarHeight: 60
      })
      return newState
    }
    case ACTIONS.CLOSE_TOPBAR: {
      const newState = Object.assign({}, state, {
        isTopBarOpen: false
        , topBarHeight: 0
      })
      return newState
    }
    case ACTIONS.SET_TOPBAR_TITLE: {
      const newState = Object.assign({}, state, {
        topBarTitle: action.payload
      })
      return newState
    }
    case ACTIONS.TOGGLE_TOPBAR_TITLE_EDITABLE: {
      const newState = Object.assign({}, state, {
        topBarTitleDisabled: action.payload
      })
      return newState
    }
    case ACTIONS.TOGGLE_TOPBAR_TITLE_FOCUS: {
      const isFocused = action.payload
      const newState = Object.assign({}, state, {
        topBarFocused: isFocused
      })
      return newState
    }
    default:
      return state
  }
}
