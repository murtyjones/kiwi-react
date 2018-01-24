import { ACTIONS } from '../constants'

const getInitialState = () => {
  return {
    isSideNavOpen: true
    , sideNavWidth: 256
  }
}

export default (state = getInitialState(), action) => {
  let sideNav
  switch (action.type) {
    case ACTIONS.OPEN_SIDENAV:
      return {
        isSideNavOpen: true
        , sideNavWidth: 256
      }
    case ACTIONS.CLOSE_SIDENAV:
      return {
        isSideNavOpen: false
        , sideNavWidth: 0
      }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, getInitialState())
      return newState
    }
    default:
      return state
  }
}
