import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

// Import reducers
import home from './home'
import auth from './Auth'
import userProjects from './UserProjects'
import lessons from './Lessons'
import userLessons from './UserLessons'
import sideNav from './SideNav'
import topBar from './TopBar'

// Export combined reducers
export default combineReducers({
  form: formReducer
  , home
  , auth
  , userProjects
  , lessons
  , userLessons
  , sideNav
  , topBar
})
