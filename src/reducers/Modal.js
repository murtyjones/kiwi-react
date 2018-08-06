import { ACTIONS } from '../constants'

const initialState = {
  isOpen: false
  , className: ''
  , overlayClassName: ''
  , children: ''
  , callback: null
  , hasCloseButton: true
}

function modal(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.OPEN_MODAL: {
      const newState = Object.assign({}, state, action.payload)
      // force isOpen to be true
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
