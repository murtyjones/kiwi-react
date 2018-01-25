import { ACTIONS } from '../constants'

const initialState = {
  lessonOrder: {}
  , isFetching: false
}

function lessonMetadata(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_LESSON_ORDER_REQUEST:
    case ACTIONS.GET_LESSON_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ACTIONS.PUT_LESSON_ORDER_FAILURE:
    case ACTIONS.GET_LESSON_ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case ACTIONS.PUT_LESSON_ORDER_SUCCESS: {
      const newState = Object.assign({}, state, {
        lessonOrder: action.payload.after
        , isFetching: false
      })
      return newState
    }
    case ACTIONS.GET_LESSON_ORDER_SUCCESS: {
      const newState = Object.assign({}, state, {
        lessonOrder: action.payload
        , isFetching: false
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, initialState)
      return newState
    }
    default:
      return state
  }
}

export default lessonMetadata
