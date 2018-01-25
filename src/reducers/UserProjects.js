import { ACTIONS } from '../constants'

const initialState = {
  userProjectsById: {}
  , isFetching: false
}

function userProjects(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_USER_PROJECT_FAILURE:
    case ACTIONS.POST_USER_PROJECT_FAILURE:
    case ACTIONS.GET_USER_PROJECT_FAILURE:
    case ACTIONS.GET_MANY_USER_PROJECTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case ACTIONS.PUT_USER_PROJECT_REQUEST:
    case ACTIONS.POST_USER_PROJECT_REQUEST:
    case ACTIONS.GET_USER_PROJECT_REQUEST:
    case ACTIONS.GET_MANY_USER_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ACTIONS.PUT_USER_PROJECT_SUCCESS:
      const userProjectsById = Object.assign({}, state.userProjectsById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const newState = Object.assign({}, state, {
        userProjectsById
        , isFetching: false
      })
      return newState
    case ACTIONS.POST_USER_PROJECT_SUCCESS:
    case ACTIONS.GET_USER_PROJECT_SUCCESS: {
      const userProjectsById = Object.assign({}, state.userProjectsById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        userProjectsById
        , isFetching: false
      })
      return newState
    }
    case ACTIONS.GET_MANY_USER_PROJECTS_SUCCESS: {
      const payloadUserProjectsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        userProjectsById: {
          ...state.userProjectsById
          , ...payloadUserProjectsById
        }
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

export default userProjects
