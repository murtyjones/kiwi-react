import { ACTIONS } from '../constants'

const initialState = {
  subscriptionsById: {}
}

function subscriptions(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_SUBSCRIPTION_SUCCESS: {
      const newSubscriptionsById = Object.assign({}, state.subscriptionsById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const subscriptionsById = Object.assign({}, state.subscriptionsById, newSubscriptionsById)
      const newState = Object.assign({}, state, {
        subscriptionsById
      })
      return newState
    }
    case ACTIONS.GET_SUBSCRIPTION_SUCCESS:
    case ACTIONS.POST_SUBSCRIPTION_SUCCESS: {
      const subscriptionsById = Object.assign({}, state.subscriptionsById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        subscriptionsById
      })
      return newState
    }
    case ACTIONS.GET_MANY_SUBSCRIPTIONS_SUCCESS: {
      const payloadSubscriptionsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        subscriptionsById: {
          ...state.subscriptionsById
          , ...payloadSubscriptionsById
        }
      })
      return newState
    }
    case ACTIONS.DELETE_SUBSCRIPTION_SUCCESS: {
      if(action.payload.ok) {
        const subscriptionsById = Object.assign({}, state.subscriptionsById)
        delete subscriptionsById[action.payload.value._id]
        const newState = Object.assign({}, state, {
          subscriptionsById
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

export default subscriptions
