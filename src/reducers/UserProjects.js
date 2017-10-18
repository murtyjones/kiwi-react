import { ACTIONS } from '../constants'

const initialState = {
  projectsById: {}
}

function userProjects(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_USER_PROJECT_SUCCESS:
      const projectsById = Object.assign({}, state.projectsById, {[action.payload.after["_id"]]: action.payload.after})
      const newState = Object.assign({}, state, {
        projectsById
      })
      return newState
    case ACTIONS.POST_USER_PROJECT_SUCCESS:
    case ACTIONS.GET_USER_PROJECT_SUCCESS: {
      const projectsById = Object.assign({}, state.projectsById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        projectsById
      })
      return newState
    }
    case ACTIONS.GET_MANY_USER_PROJECTS_SUCCESS: {
      const projectsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        projectsById
      })
      return newState
    }
    default:
      return state
  }
}

export default userProjects
