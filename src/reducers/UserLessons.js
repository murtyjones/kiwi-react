import { ACTIONS } from '../constants'

const initialState = {
  userLessonsById: {}
  , userLessonsByLessonId: {}
  , isFetching: false
}

//currently missing getLesson success

function userLessons(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.POST_USER_LESSON_REQUEST:
    case ACTIONS.PUT_USER_LESSON_REQUEST:
    case ACTIONS.GET_USER_LESSON_REQUEST:
    case ACTIONS.GET_MANY_USER_LESSONS_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }
    case ACTIONS.POST_USER_LESSON_FAILURE:
    case ACTIONS.PUT_USER_LESSON_FAILURE:
    case ACTIONS.GET_USER_LESSON_FAILURE:
    case ACTIONS.GET_MANY_USER_LESSONS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false
      })
    }
    case ACTIONS.PUT_USER_LESSON_SUCCESS: {
      const userLessonsById = Object.assign({}, state.userLessonsById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const userLessonsByLessonId = Object.assign({}, state.userLessonsByLessonId, {
        [action.payload.after["lessonId"]]: action.payload.after
      })
      const newState = Object.assign({}, state, {
        userLessonsById
        , userLessonsByLessonId
        , isFetching: false
      })
      return newState
    }
    case ACTIONS.GET_USER_LESSON_SUCCESS:
    case ACTIONS.POST_USER_LESSON_SUCCESS: {
      const userLessonsById = Object.assign({}, state.userLessonsById, {
        [action.payload._id]: action.payload
      })
      const userLessonsByLessonId = Object.assign({}, state.userLessonsByLessonId, {
        [action.payload.lessonId]: action.payload
      })
      const newState = Object.assign({}, state, {
        userLessonsById
        , userLessonsByLessonId
        , isFetching: false
      })
      return newState
    }
    case ACTIONS.GET_MANY_USER_LESSONS_SUCCESS: {
      const payloadUserLessonsById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const payloadUserLessonsByLessonId = action.payload.reduce((acc, each) => {
        acc[each.lessonId] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        userLessonsById: {
          ...state.userLessonsById
          , ...payloadUserLessonsById
        },
        userLessonsByLessonId: {
          ...state.userLessonsByLessonId
          , ...payloadUserLessonsByLessonId
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

export default userLessons
