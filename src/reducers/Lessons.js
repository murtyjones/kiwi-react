import { ACTIONS } from '../constants'

const initialState = {
  lessonsById: {}
}

function lessons(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_LESSON_SUCCESS:
      const lessonsById = Object.assign({}, state.lessonsById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const newState = Object.assign({}, state, {
        lessonsById
      })
      return newState
    case ACTIONS.POST_LESSON_SUCCESS:
    case ACTIONS.GET_USER_PROJECT_SUCCESS: {
      console.log('inside postLesson success in lessons reducer');
      console.log('value of action.payload: ', action.payload);
      const lessonsById = Object.assign({}, state.lessonsById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        lessonsById
      })
      return newState
    }
    case ACTIONS.GET_MANY_LESSONS_SUCCESS: {
      console.log('inside GET_MANY_LESSON_SUCCESS and value of action.payload is: ', action.payload);
      const lessonsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        lessonsById
      })
      return newState
    }
    default:
      return state
  }
}

export default lessons
