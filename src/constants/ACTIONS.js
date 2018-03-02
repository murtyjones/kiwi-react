let ACTIONS
export default ACTIONS = {
  // Auth actions
  LOGIN_REQUEST: 'LOGIN_REQUEST'
  , LOGIN_SUCCESS: 'LOGIN_SUCCESS'
  , LOGIN_FAILURE: 'LOGIN_FAILURE'
  , REGISTER_REQUEST: 'REGISTER_REQUEST'
  , REGISTER_SUCCESS: 'REGISTER_SUCCESS'
  , REGISTER_FAILURE: 'REGISTER_FAILURE'
  , SIGNOUT_REQUEST: 'SIGNOUT_REQUEST'
  , SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS'
  , SIGNOUT_FAILURE: 'SIGNOUT_FAILURE'
  , TOKEN_REFRESH: 'TOKEN_REFRESH'

  , GET_MANY_USER_PROJECTS_REQUEST: 'GET_MANY_USER_PROJECTS_REQUEST'
  , GET_MANY_USER_PROJECTS_SUCCESS: 'GET_MANY_USER_PROJECTS_SUCCESS'
  , GET_MANY_USER_PROJECTS_FAILURE: 'GET_MANY_USER_PROJECTS_FAILURE'

  , GET_USER_PROJECT_REQUEST: 'GET_USER_PROJECT_REQUEST'
  , GET_USER_PROJECT_SUCCESS: 'GET_USER_PROJECT_SUCCESS'
  , GET_USER_PROJECT_FAILURE: 'GET_USER_PROJECT_FAILURE'

  , PUT_USER_PROJECT_REQUEST: 'PUT_USER_PROJECT_REQUEST'
  , PUT_USER_PROJECT_SUCCESS: 'PUT_USER_PROJECT_SUCCESS'
  , PUT_USER_PROJECT_FAILURE: 'PUT_USER_PROJECT_FAILURE'

  , POST_USER_PROJECT_REQUEST: 'POST_USER_PROJECT_REQUEST'
  , POST_USER_PROJECT_SUCCESS: 'POST_USER_PROJECT_SUCCESS'
  , POST_USER_PROJECT_FAILURE: 'POST_USER_PROJECT_FAILURE'

  , GET_MANY_LESSONS_REQUEST: 'GET_MANY_LESSONS_REQUEST'
  , GET_MANY_LESSONS_SUCCESS: 'GET_MANY_LESSONS_SUCCESS'
  , GET_MANY_LESSONS_FAILURE: 'GET_MANY_LESSONS_FAILURE'

  , GET_LESSON_REQUEST: 'GET_LESSON_REQUEST'
  , GET_LESSON_SUCCESS: 'GET_LESSON_SUCCESS'
  , GET_LESSON_FAILURE: 'GET_LESSON_FAILURE'

  , PUT_LESSON_REQUEST: 'PUT_LESSON_REQUEST'
  , PUT_LESSON_SUCCESS: 'PUT_LESSON_SUCCESS'
  , PUT_LESSON_FAILURE: 'PUT_LESSON_FAILURE'

  , POST_LESSON_REQUEST: 'POST_LESSON_REQUEST'
  , POST_LESSON_SUCCESS: 'POST_LESSON_SUCCESS'
  , POST_LESSON_FAILURE: 'POST_LESSON_FAILURE'

  , DELETE_LESSON_REQUEST: 'DELETE_LESSON_REQUEST'
  , DELETE_LESSON_SUCCESS: 'DELETE_LESSON_SUCCESS'
  , DELETE_LESSON_FAILURE: 'DELETE_LESSON_FAILURE'

  , GET_MANY_LESSON_THEMES_REQUEST: 'GET_MANY_LESSON_THEMES_REQUEST'
  , GET_MANY_LESSON_THEMES_SUCCESS: 'GET_MANY_LESSON_THEMES_SUCCESS'
  , GET_MANY_LESSON_THEMES_FAILURE: 'GET_MANY_LESSON_THEMES_FAILURE'

  , DELETE_LESSON_THEME_REQUEST: 'DELETE_LESSON_THEME_REQUEST'
  , DELETE_LESSON_THEME_SUCCESS: 'DELETE_LESSON_THEME_SUCCESS'
  , DELETE_LESSON_THEME_FAILURE: 'DELETE_LESSON_THEME_FAILURE'

  , GET_LESSON_THEME_REQUEST: 'GET_LESSON_THEME_REQUEST'
  , GET_LESSON_THEME_SUCCESS: 'GET_LESSON_THEME_SUCCESS'
  , GET_LESSON_THEME_FAILURE: 'GET_LESSON_THEME_FAILURE'

  , PUT_LESSON_THEME_REQUEST: 'PUT_LESSON_THEME_REQUEST'
  , PUT_LESSON_THEME_SUCCESS: 'PUT_LESSON_THEME_SUCCESS'
  , PUT_LESSON_THEME_FAILURE: 'PUT_LESSON_THEME_FAILURE'

  , POST_LESSON_THEME_REQUEST: 'POST_LESSON_THEME_REQUEST'
  , POST_LESSON_THEME_SUCCESS: 'POST_LESSON_THEME_SUCCESS'
  , POST_LESSON_THEME_FAILURE: 'POST_LESSON_THEME_FAILURE'

  , GET_MANY_USER_LESSONS_REQUEST: 'GET_MANY_USER_LESSONS_REQUEST'
  , GET_MANY_USER_LESSONS_SUCCESS: 'GET_MANY_USER_LESSONS_SUCCESS'
  , GET_MANY_USER_LESSONS_FAILURE: 'GET_MANY_USER_LESSONS_FAILURE'

  , GET_USER_LESSON_REQUEST: 'GET_USER_LESSON_REQUEST'
  , GET_USER_LESSON_SUCCESS: 'GET_USER_LESSON_SUCCESS'
  , GET_USER_LESSON_FAILURE: 'GET_USER_LESSON_FAILURE'

  , PUT_USER_LESSON_REQUEST: 'PUT_USER_LESSON_REQUEST'
  , PUT_USER_LESSON_SUCCESS: 'PUT_USER_LESSON_SUCCESS'
  , PUT_USER_LESSON_FAILURE: 'PUT_USER_LESSON_FAILURE'

  , POST_USER_LESSON_REQUEST: 'POST_USER_LESSON_REQUEST'
  , POST_USER_LESSON_SUCCESS: 'POST_USER_LESSON_SUCCESS'
  , POST_USER_LESSON_FAILURE: 'POST_USER_LESSON_FAILURE'

  , OPEN_SIDENAV: 'OPEN_SIDENAV'
  , CLOSE_SIDENAV: 'CLOSE_SIDENAV'

  , OPEN_TOPBAR: 'OPEN_TOPBAR'
  , CLOSE_TOPBAR: 'CLOSE_TOPBAR'
  , SET_TOPBAR_TITLE: 'SET_TOPBAR_TITLE'
  , TOGGLE_TOPBAR_TITLE_EDITABLE: 'TOGGLE_TOPBAR_TITLE_EDITABLE'
  , TOGGLE_TOPBAR_TITLE_FOCUS: 'TOGGLE_TOPBAR_TITLE_FOCUS'
  , SET_TOPBAR_COLOR: 'SET_TOPBAR_COLOR'

  , GET_LESSON_ORDER_REQUEST: 'GET_LESSON_ORDER_REQUEST'
  , GET_LESSON_ORDER_SUCCESS: 'GET_LESSON_ORDER_SUCCESS'
  , GET_LESSON_ORDER_FAILURE: 'GET_LESSON_ORDER_FAILURE'

  , PUT_LESSON_ORDER_REQUEST: 'PUT_LESSON_ORDER_REQUEST'
  , PUT_LESSON_ORDER_SUCCESS: 'PUT_LESSON_ORDER_SUCCESS'
  , PUT_LESSON_ORDER_FAILURE: 'PUT_LESSON_ORDER_FAILURE'

  , SET_GLOBAL_COLORS: 'SET_GLOBAL_COLORS'

  , UPSERT_PASSWORD_RECOVERY_REQUEST: 'UPSERT_PASSWORD_RECOVERY_REQUEST'
  , UPSERT_PASSWORD_RECOVERY_SUCCESS: 'UPSERT_PASSWORD_RECOVERY_SUCCESS'
  , UPSERT_PASSWORD_RECOVERY_FAILURE: 'UPSERT_PASSWORD_RECOVERY_FAILURE'

  , CHECK_PASSWORD_RECOVERY_REQUEST: 'CHECK_PASSWORD_RECOVERY_REQUEST'
  , CHECK_PASSWORD_RECOVERY_SUCCESS: 'CHECK_PASSWORD_RECOVERY_SUCCESS'
  , CHECK_PASSWORD_RECOVERY_FAILURE: 'CHECK_PASSWORD_RECOVERY_FAILURE'

  , RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST'
  , RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS'
  , RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE'

  , POST_MESSAGE_REQUEST: 'POST_MESSAGE_REQUEST'
  , POST_MESSAGE_SUCCESS: 'POST_MESSAGE_SUCCESS'
  , POST_MESSAGE_FAILURE: 'POST_MESSAGE_FAILURE'

}
