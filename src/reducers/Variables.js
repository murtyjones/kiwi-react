import { ACTIONS } from '../constants'

const initialState = {
  variablesById: {}
}

function variables(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_VARIABLE_SUCCESS: {
      const newVariablesById = Object.assign({}, state.variablesById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const variablesById = Object.assign({}, state.variablesById, newVariablesById)
      const newState = Object.assign({}, state, {
        variablesById
      })
      return newState
    }
    case ACTIONS.GET_VARIABLE_SUCCESS:
    case ACTIONS.POST_VARIABLE_SUCCESS: {
      const variablesById = Object.assign({}, state.variablesById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        variablesById
      })
      return newState
    }
    case ACTIONS.GET_MANY_VARIABLES_SUCCESS: {
      const payloadVariablesById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        variablesById: {
          ...state.variablesById
          , ...payloadVariablesById
        }
      })
      return newState
    }
    case ACTIONS.DELETE_VARIABLE_SUCCESS: {
      if (action.payload.ok) {
        const variablesById = Object.assign({}, state.variablesById)
        delete variablesById[action.payload.value._id]
        const newState = Object.assign({}, state, {
          variablesById
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

export default variables
