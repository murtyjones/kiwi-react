import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import reducers
import home from './home';
import auth from './Auth';

// Export combined reducers
export default combineReducers({
  form: formReducer,
  home,
  auth
});