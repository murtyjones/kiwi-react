import { ACTIONS } from '../constants'

const initialState = {
  userLessonsById: {}
}

//currently missing getLesson success

function userLessons(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_USER_LESSON_SUCCESS:
      const userLessonsById = Object.assign({}, state.userLessonsById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const newState = Object.assign({}, state, {
        userLessonsById
      })
      return newState
    case ACTIONS.GET_USER_LESSON_SUCCESS:
    case ACTIONS.POST_USER_LESSON_SUCCESS:{
      const userLessonsById = Object.assign({}, state.userLessonsById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        userLessonsById
      })
      return newState
    }
    case ACTIONS.GET_MANY_USER_LESSONS_SUCCESS: {
      const userLessonsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        userLessonsById
      })
      return newState
    }
    default:
      return state
  }
}

export default userLessons
