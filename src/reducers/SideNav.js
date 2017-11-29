import { ACTIONS } from '../constants'

const getInitialState = () => {
  return {
    isOpen: true
    , sidebarWidth: 256
  }
}

export default (state = getInitialState(), action) => {
  let sideNav
  switch (action.type) {
    case ACTIONS.OPEN_SIDENAV:
      return {
        isOpen: true
        , sidebarWidth: 256
      }
    case ACTIONS.CLOSE_SIDENAV:
      return {
        isOpen: false
        , sidebarWidth: 0
      }
    default:
      return state
  }
}
