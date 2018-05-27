import { ACTIONS } from '../constants'

const initialState = {
  isOpen: false
  , className: ''
  , overlayClassName: ''
  , children: ''
}

function modal(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.OPEN_MODAL: {
      console.log('wut1')
      const newState = Object.assign({}, state, action.payload)
      newState.isOpen = true
      return newState
    }
    case ACTIONS.CLOSE_MODAL:
      return initialState
    default:
      return state
  }
}

export default modal
