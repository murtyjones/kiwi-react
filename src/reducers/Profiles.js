import { ACTIONS } from '../constants'

const initialState = {
  profilesById: {}
}

function profiles(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_PROFILE_SUCCESS: {
      const newProfilesById = Object.assign({}, state.profilesById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const profilesById = Object.assign({}, state.profilesById, newProfilesById)
      const newState = Object.assign({}, state, {
        profilesById
      })
      return newState
    }
    case ACTIONS.GET_PROFILE_SUCCESS:
    case ACTIONS.POST_PROFILE_SUCCESS: {
      const profilesById = Object.assign({}, state.profilesById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        profilesById
      })
      return newState
    }
    case ACTIONS.GET_MANY_PROFILES_SUCCESS: {
      const payloadProfilesById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        profilesById: {
          ...state.profilesById
          , ...payloadProfilesById
        }
      })
      return newState
    }
    case ACTIONS.DELETE_PROFILE_SUCCESS: {
      if(action.payload.ok) {
        const profilesById = Object.assign({}, state.profilesById)
        delete profilesById[action.payload.value._id]
        const newState = Object.assign({}, state, {
          profilesById
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

export default profiles
