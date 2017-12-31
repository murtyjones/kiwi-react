import { ACTIONS } from '../constants'

const initialState = {
  lessonThemesById: {}
}

function lessonThemes(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PUT_LESSON_THEME_SUCCESS: {
      const newLessonsById = Object.assign({}, state.lessonThemesById, {
        [action.payload.after["_id"]]: action.payload.after
      })
      const lessonThemesById = Object.assign({}, state.lessonThemesById, newLessonsById)
      const newState = Object.assign({}, state, {
        lessonThemesById
      })
      return newState
    }
    case ACTIONS.GET_LESSON_THEME_SUCCESS:
    case ACTIONS.POST_LESSON_THEME_SUCCESS: {
      const lessonThemesById = Object.assign({}, state.lessonThemesById, {
        [action.payload._id]: action.payload
      })
      const newState = Object.assign({}, state, {
        lessonThemesById
      })
      return newState
    }
    case ACTIONS.GET_MANY_LESSON_THEMES_SUCCESS: {
      const lessonThemesById = action.payload.reduce((acc, each) => {
        acc[each._id] = each
        return acc
      }, {})
      const newState = Object.assign({}, state, {
        lessonThemesById
      })
      return newState
    }
    case ACTIONS.DELETE_LESSON_THEME_SUCCESS: {
      if(action.payload.ok) {
        const lessonThemesById = Object.assign({}, state.lessonThemesById)
        delete lessonThemesById[action.payload.value._id]
        const newState = Object.assign({}, state, {
          lessonThemesById
        })
        return newState
      }
    }
    default:
      return state
  }
}

export default lessonThemes
