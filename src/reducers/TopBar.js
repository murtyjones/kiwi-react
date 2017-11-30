import { ACTIONS } from '../constants'

const getInitialState = () => {
  return {
    isTopBarOpen: true
    , topBarHeight: 60
  }
}

export default (state = getInitialState(), action) => {
  let sideNav
  switch (action.type) {
    case ACTIONS.OPEN_TOPBAR:
      return {
        isTopBarOpen: true
        , topBarHeight: 60
      }
    case ACTIONS.CLOSE_TOPBAR:
      return {
        isTopBarOpen: false
        , topBarHeight: 0
      }
    default:
      return state
  }
}
