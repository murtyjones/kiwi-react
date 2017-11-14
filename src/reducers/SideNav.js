import { ACTIONS } from '../constants'

const getInitialState = () => {
  return {
    isOpen: true
  }
}

export default (state = getInitialState(), action) => {
  let sideNav
  switch (action.type) {
    case ACTIONS.OPEN_SIDENAV:
      return { isOpen: true }
    case ACTIONS.CLOSE_SIDENAV:
      return { isOpen: false }
    default:
      return state
  }
}
