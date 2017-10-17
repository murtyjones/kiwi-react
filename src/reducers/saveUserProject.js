import { ACTIONS } from '../constants'

//I've put this in a new file as compared to UserProjects. The issue here is that if we rely on a case switch for pulling and saving projects, we may run into collisions. These should really all exist in their own reducers --Peter


const initialState = {
  status: {}
}

function saveUserProjects(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_USER_PROJECT_SUCCESS: {
      const newState = Object.assign({}, state, {
        status: "Success, project saved"
      })
      console.log('value of userProjects in reducers: ', newState);
      return newState
    }
    case ACTIONS.PUT_USER_PROJECT_SUCCESS: {
      const newState = Object.assign({}, state, {
        status: "Success, project saved"
      })
      console.log('value of userProjects in reducers: ', newState);
      return newState
    }
    default: return state
  }
}

export default saveUserProjects
