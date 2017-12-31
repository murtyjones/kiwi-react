import { ACTIONS } from '../constants'

const initialState = {
  lessonsById: {}
}

//currently missing getLesson success

function lessons(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_LESSON_SUCCESS: {
      const newLessonsById = Object.assign({}, state.lessonsById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const lessonsById = Object.assign({}, state.lessonsById, newLessonsById)
      const newState = Object.assign({}, state, {
        lessonsById
      })
      return newState
    }
    case ACTIONS.GET_LESSON_SUCCESS:
    case ACTIONS.POST_LESSON_SUCCESS: {
      const lessonsById = Object.assign({}, state.lessonsById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        lessonsById
      })
      return newState
    }
    case ACTIONS.GET_MANY_LESSONS_SUCCESS: {
      const lessonsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        lessonsById
      })
      return newState
    }
    case ACTIONS.DELETE_LESSON_SUCCESS: {
      if(action.payload.ok) {
        const lessonsById = Object.assign({}, state.lessonThemesById)
        delete lessonsById[action.payload.value._id]
        const newState = Object.assign({}, state, {
          lessonsById
        })
        return newState
      }
    }
    default:
      return state
  }
}

export default lessons
