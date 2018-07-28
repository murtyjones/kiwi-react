import { ACTIONS } from '../constants'

const initialState = {
  isTopBarOpen: true
  , topBarHeight: 60
  , topBarTitle: ''
  , topBarTitleDisabled: true
  , topBarFocused: false
  , breadcrumbLink: ''
  , breadcrumbText: ''
  , showMiddleSection: true
  , showLogo: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_TOP_BAR: {
      const newState = Object.assign({}, state, {
        isTopBarOpen: true
        , topBarHeight: 60
      })
      return newState
    }
    case ACTIONS.CLOSE_TOP_BAR: {
      const newState = Object.assign({}, state, {
        isTopBarOpen: false
        , topBarHeight: 0
      })
      return newState
    }
    case ACTIONS.SET_TOP_BAR_TITLE: {
      const newState = Object.assign({}, state, {
        topBarTitle: action.payload
      })
      return newState
    }
    case ACTIONS.TOGGLE_TOP_BAR_TITLE_EDITABLE: {
      const newState = Object.assign({}, state, {
        topBarTitleDisabled: action.payload
      })
      return newState
    }
    case ACTIONS.TOGGLE_TOP_BAR_TITLE_FOCUS: {
      const isFocused = action.payload
      const newState = Object.assign({}, state, {
        topBarFocused: isFocused
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, initialState)
      return newState
    }
    case ACTIONS.SET_TOP_BAR_BREADCRUMB: {
      const newState = Object.assign({}, state, {
        breadcrumbLink: action.payload.breadcrumbLink,
        breadcrumbText: action.payload.breadcrumbText
      })
      return newState
    }
    case ACTIONS.SET_TOP_BAR_MIDDLE_IS_VISIBLE: {
      const newState = Object.assign({}, state, {
        showMiddleSection: action.payload
      })
      return newState
    }
    case ACTIONS.SET_TOP_BAR_LOGO_IS_VISIBLE: {
      const newState = Object.assign({}, state, {
        showLogo: action.payload
      })
      return newState
    }
    default:
      return state
  }
}
