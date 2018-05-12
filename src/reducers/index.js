import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

// Import reducers
import home from './home'
import auth from './Auth'
import userProjects from './UserProjects'
import lessons from './Lessons'
import lessonThemes from './LessonThemes'
import lessonMetadata from './LessonMetadata'
import userLessons from './UserLessons'
import sideNav from './SideNav'
import topBar from './TopBar'
import globalColors from './GlobalColors'
import variables from './Variables'
import userVariables from './UserVariables'

// Export combined reducers
export const notCombined = {
  form: formReducer
  , home
  , auth
  , userProjects
  , lessons
  , userLessons
  , lessonThemes
  , sideNav
  , topBar
  , lessonMetadata
  , globalColors
  , variables
  , userVariables
}

export default combineReducers(notCombined)