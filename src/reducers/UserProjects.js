import { ACTIONS } from '../constants'

const initialState = {
  projectsById: {}
}

function userProjects(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_USER_PROJECT_SUCCESS:
      //Shadowing issue
      //So if we navigate through the dashboard and save a previous project this should work fine.
      //However
      //If we hard load the projects page (ctrl+r on projects page/:id) then the projectsById is empty, so when we update the put in the way below (what I believe is the way we're going for) we only add one item to a blank projectsById object.
      //If that's not an issue that's fine, but then we can't access all the projectsById data after a hard reload+save. --peter
      console.log('inside reducers PUT_USER_PROJECT_SUCCESS: ');
      console.log('value of action.payload.updatedproject: ', action.payload.updatedproject);
      console.log('state.projectsById: ', state.projectsById);
      console.log('object.keys: ', Object.keys(state.projectsById));
      const projectsById = Object.assign({}, state.projectsById, {[action.payload.updatedproject[0]["_id"]]: action.payload.updatedproject[0]})
      console.log('value of state.projectsById', projectsById);

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
