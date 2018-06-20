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

  , RESET_PASSWORD_EMAIL_REQUEST: 'RESET_PASSWORD_EMAIL_REQUEST'
  , RESET_PASSWORD_EMAIL_SUCCESS: 'RESET_PASSWORD_EMAIL_SUCCESS'
  , RESET_PASSWORD_EMAIL_FAILURE: 'RESET_PASSWORD_EMAIL_FAILURE'

  , CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST'
  , CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS'
  , CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE'

  , POST_MESSAGE_REQUEST: 'POST_MESSAGE_REQUEST'
  , POST_MESSAGE_SUCCESS: 'POST_MESSAGE_SUCCESS'
  , POST_MESSAGE_FAILURE: 'POST_MESSAGE_FAILURE'

  , POST_TEST_CRITERIA_REQUEST: 'POST_TEST_CRITERIA_REQUEST'
  , POST_TEST_CRITERIA_SUCCESS: 'POST_TEST_CRITERIA_SUCCESS'
  , POST_TEST_CRITERIA_FAILURE: 'POST_TEST_CRITERIA_FAILURE'

  , GET_MANY_VARIABLES_REQUEST: 'GET_MANY_VARIABLES_REQUEST'
  , GET_MANY_VARIABLES_SUCCESS: 'GET_MANY_VARIABLES_SUCCESS'
  , GET_MANY_VARIABLES_FAILURE: 'GET_MANY_VARIABLES_FAILURE'

  , DELETE_VARIABLE_REQUEST: 'DELETE_VARIABLE_REQUEST'
  , DELETE_VARIABLE_SUCCESS: 'DELETE_VARIABLE_SUCCESS'
  , DELETE_VARIABLE_FAILURE: 'DELETE_VARIABLE_FAILURE'

  , GET_VARIABLE_REQUEST: 'GET_VARIABLE_REQUEST'
  , GET_VARIABLE_SUCCESS: 'GET_VARIABLE_SUCCESS'
  , GET_VARIABLE_FAILURE: 'GET_VARIABLE_FAILURE'

  , PUT_VARIABLE_REQUEST: 'PUT_VARIABLE_REQUEST'
  , PUT_VARIABLE_SUCCESS: 'PUT_VARIABLE_SUCCESS'
  , PUT_VARIABLE_FAILURE: 'PUT_VARIABLE_FAILURE'

  , POST_VARIABLE_REQUEST: 'POST_VARIABLE_REQUEST'
  , POST_VARIABLE_SUCCESS: 'POST_VARIABLE_SUCCESS'
  , POST_VARIABLE_FAILURE: 'POST_VARIABLE_FAILURE'

  , GET_MANY_USER_VARIABLES_REQUEST: 'GET_MANY_USER_VARIABLES_REQUEST'
  , GET_MANY_USER_VARIABLES_SUCCESS: 'GET_MANY_USER_VARIABLES_SUCCESS'
  , GET_MANY_USER_VARIABLES_FAILURE: 'GET_MANY_USER_VARIABLES_FAILURE'

  , DELETE_USER_VARIABLE_REQUEST: 'DELETE_USER_VARIABLE_REQUEST'
  , DELETE_USER_VARIABLE_SUCCESS: 'DELETE_USER_VARIABLE_SUCCESS'
  , DELETE_USER_VARIABLE_FAILURE: 'DELETE_USER_VARIABLE_FAILURE'

  , GET_USER_VARIABLE_REQUEST: 'GET_USER_VARIABLE_REQUEST'
  , GET_USER_VARIABLE_SUCCESS: 'GET_USER_VARIABLE_SUCCESS'
  , GET_USER_VARIABLE_FAILURE: 'GET_USER_VARIABLE_FAILURE'

  , PUT_USER_VARIABLE_REQUEST: 'PUT_USER_VARIABLE_REQUEST'
  , PUT_USER_VARIABLE_SUCCESS: 'PUT_USER_VARIABLE_SUCCESS'
  , PUT_USER_VARIABLE_FAILURE: 'PUT_USER_VARIABLE_FAILURE'

  , POST_USER_VARIABLE_REQUEST: 'POST_USER_VARIABLE_REQUEST'
  , POST_USER_VARIABLE_SUCCESS: 'POST_USER_VARIABLE_SUCCESS'
  , POST_USER_VARIABLE_FAILURE: 'POST_USER_VARIABLE_FAILURE'

  , GET_MANY_SUBSCRIPTIONS_REQUEST: 'GET_MANY_SUBSCRIPTIONS_REQUEST'
  , GET_MANY_SUBSCRIPTIONS_SUCCESS: 'GET_MANY_SUBSCRIPTIONS_SUCCESS'
  , GET_MANY_SUBSCRIPTIONS_FAILURE: 'GET_MANY_SUBSCRIPTIONS_FAILURE'

  , DELETE_SUBSCRIPTION_REQUEST: 'DELETE_SUBSCRIPTION_REQUEST'
  , DELETE_SUBSCRIPTION_SUCCESS: 'DELETE_SUBSCRIPTION_SUCCESS'
  , DELETE_SUBSCRIPTION_FAILURE: 'DELETE_SUBSCRIPTION_FAILURE'

  , GET_SUBSCRIPTION_REQUEST: 'GET_SUBSCRIPTION_REQUEST'
  , GET_SUBSCRIPTION_SUCCESS: 'GET_SUBSCRIPTION_SUCCESS'
  , GET_SUBSCRIPTION_FAILURE: 'GET_SUBSCRIPTION_FAILURE'

  , PUT_SUBSCRIPTION_REQUEST: 'PUT_SUBSCRIPTION_REQUEST'
  , PUT_SUBSCRIPTION_SUCCESS: 'PUT_SUBSCRIPTION_SUCCESS'
  , PUT_SUBSCRIPTION_FAILURE: 'PUT_SUBSCRIPTION_FAILURE'

  , POST_SUBSCRIPTION_REQUEST: 'POST_SUBSCRIPTION_REQUEST'
  , POST_SUBSCRIPTION_SUCCESS: 'POST_SUBSCRIPTION_SUCCESS'
  , POST_SUBSCRIPTION_FAILURE: 'POST_SUBSCRIPTION_FAILURE'

  , GET_MANY_PROFILES_REQUEST: 'GET_MANY_PROFILES_REQUEST'
  , GET_MANY_PROFILES_SUCCESS: 'GET_MANY_PROFILES_SUCCESS'
  , GET_MANY_PROFILES_FAILURE: 'GET_MANY_PROFILES_FAILURE'

  , DELETE_PROFILE_REQUEST: 'DELETE_PROFILE_REQUEST'
  , DELETE_PROFILE_SUCCESS: 'DELETE_PROFILE_SUCCESS'
  , DELETE_PROFILE_FAILURE: 'DELETE_PROFILE_FAILURE'

  , GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST'
  , GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS'
  , GET_PROFILE_FAILURE: 'GET_PROFILE_FAILURE'

  , PUT_PROFILE_REQUEST: 'PUT_PROFILE_REQUEST'
  , PUT_PROFILE_SUCCESS: 'PUT_PROFILE_SUCCESS'
  , PUT_PROFILE_FAILURE: 'PUT_PROFILE_FAILURE'

  , POST_PROFILE_REQUEST: 'POST_PROFILE_REQUEST'
  , POST_PROFILE_SUCCESS: 'POST_PROFILE_SUCCESS'
  , POST_PROFILE_FAILURE: 'POST_PROFILE_FAILURE'

  , POST_CHECK_EMAIL_VERIFICATION_REQUEST: 'POST_CHECK_EMAIL_VERIFICATION_REQUEST'
  , POST_CHECK_EMAIL_VERIFICATION_SUCCESS: 'POST_CHECK_EMAIL_VERIFICATION_SUCCESS'
  , POST_CHECK_EMAIL_VERIFICATION_FAILURE: 'POST_CHECK_EMAIL_VERIFICATION_FAILURE'

  , GET_RESEND_EMAIL_VERIFICATION_REQUEST: 'GET_RESEND_EMAIL_VERIFICATION_REQUEST'
  , GET_RESEND_EMAIL_VERIFICATION_SUCCESS: 'GET_RESEND_EMAIL_VERIFICATION_SUCCESS'
  , GET_RESEND_EMAIL_VERIFICATION_FAILURE: 'GET_RESEND_EMAIL_VERIFICATION_FAILURE'

  , OPEN_MODAL: 'OPEN_MODAL'
  , CLOSE_MODAL: 'CLOSE_MODAL'

}
