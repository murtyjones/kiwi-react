import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

// Import reducers
import home from './home'
import auth from './Auth'
import userProjects from './UserProjects'
import lessons from './Lessons'
import lessonMetadata from './LessonMetadata'
import userLessons from './UserLessons'
import topBar from './TopBar'
import globalColors from './GlobalColors'
import variables from './Variables'
import userVariables from './UserVariables'
import subscriptions from './Subscriptions'
import profiles from './Profiles'
import modal from './Modal'

// Export combined reducers (useful for testing purposes)
export const notCombined = {
  form: formReducer
  , home
  , auth
  , userProjects
  , lessons
  , userLessons
  , topBar
  , lessonMetadata
  , globalColors
  , variables
  , userVariables
  , subscriptions
  , profiles
  , modal
}

export default combineReducers(notCombined)
