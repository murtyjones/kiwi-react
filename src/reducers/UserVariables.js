import { ACTIONS } from '../constants'

const initialState = {
  userVariablesById: {}
}

function userVariables(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_USER_VARIABLE_SUCCESS: {
      const newUserVariablesById = Object.assign({}, state.userVariablesById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const userVariablesById = Object.assign({}, state.userVariablesById, newUserVariablesById)
      const newState = Object.assign({}, state, {
        userVariablesById
      })
      return newState
    }
    case ACTIONS.GET_USER_VARIABLE_SUCCESS:
    case ACTIONS.POST_USER_VARIABLE_SUCCESS: {
      const userVariablesById = Object.assign({}, state.userVariablesById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        userVariablesById
      })
      return newState
    }
    case ACTIONS.GET_MANY_USER_VARIABLES_SUCCESS: {
      const payloadUserVariablesById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        userVariablesById: {
          ...state.userVariablesById
          , ...payloadUserVariablesById
        }
      })
      return newState
    }
    case ACTIONS.DELETE_USER_VARIABLE_SUCCESS: {
      if(action.payload.ok) {
        const userVariablesById = Object.assign({}, state.userVariablesById)
        delete userVariablesById[action.payload.value._id]
        const newState = Object.assign({}, state, {
          userVariablesById
        })
        return newState
      }
      return state
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, initialState)
      return newState
    }
    default:
      return state
  }
}

export default userVariables
