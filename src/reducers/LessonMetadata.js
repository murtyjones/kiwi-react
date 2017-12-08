import { ACTIONS } from '../constants'

const initialState = {
  lessonOrder: {}
}

function lessonMetadata(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_LESSON_ORDER_SUCCESS: {
      const newState = Object.assign({}, state, {
        lessonOrder: action.payload.after
      })
      return newState
    }
    case ACTIONS.GET_LESSON_ORDER_SUCCESS: {
      const newState = Object.assign({}, state, {
        lessonOrder: action.payload
      })
      return newState
    }
    default:
      return state
  }
}

export default lessonMetadata
