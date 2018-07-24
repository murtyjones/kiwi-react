import { ACTIONS } from '../constants'

const initialState = {
  lessonsById: {}
}

//currently missing getLesson success

function lessons(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_LESSON_FAILURE:
    case ACTIONS.POST_LESSON_FAILURE:
    case ACTIONS.GET_LESSON_FAILURE:
    case ACTIONS.GET_MANY_LESSONS_FAILURE:
    case ACTIONS.DELETE_LESSON_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case ACTIONS.PUT_LESSON_REQUEST:
    case ACTIONS.POST_LESSON_REQUEST:
    case ACTIONS.GET_LESSON_REQUEST:
    case ACTIONS.GET_MANY_LESSONS_REQUEST:
    case ACTIONS.DELETE_LESSON_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ACTIONS.PUT_LESSON_SUCCESS: {
      const newLessonsById = Object.assign({}, state.lessonsById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const lessonsById = Object.assign({}, state.lessonsById, newLessonsById)
      const newState = Object.assign({}, state, {
        lessonsById
        , isFetching: false
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
        , isFetching: false
      })
      return newState
    }
    case ACTIONS.GET_MANY_LESSONS_SUCCESS: {
      const payloadLessonsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        lessonsById: {
          ...state.lessonsById
          , ...payloadLessonsById
        }
        , isFetching: false
      })
      return newState
    }
    case ACTIONS.DELETE_LESSON_SUCCESS: {
      if (action.payload.ok) {
        const lessonsById = Object.assign({}, state.lessonsById)
        delete lessonsById[action.payload.value._id]
        const newState = Object.assign({}, state, {
          lessonsById
          , isFetching: false
        })
        return newState
      }
    }
    return state
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, initialState)
      return newState
    }
    default:
      return state
  }
}

export default lessons
