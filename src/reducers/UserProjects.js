import { ACTIONS } from '../constants'

const initialState = {
  projectsById: {}
}

function userProjects(state = initialState, action) {
  switch (action.type) {
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