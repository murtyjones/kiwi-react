import { ACTIONS } from '../constants'

const getInitialState = () => {
  return {
    isTopBarOpen: true
    , topBarHeight: 60
    , topBarTitle: ''
  }
}

export default (state = getInitialState(), action) => {
  let sideNav
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
    default:
      return state
  }
}
