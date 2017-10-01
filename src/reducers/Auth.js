import { ACTIONS } from '../constants'
import AuthService from '../utils/AuthService'

const initialState = {
  isLoggedIn: AuthService.isAuthenticated(),
  token: AuthService.getToken(),
  exp: AuthService.getTokenExp(),
  firebaseUID: AuthService.getFirebaseUID()
}

function auth(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOKEN_REFRESH:
    case ACTIONS.REGISTER_SUCCESS:
    case ACTIONS.LOGIN_SUCCESS: {
      const newState = Object.assign({}, state, {
        isLoggedIn: true,
        token: AuthService.getToken(),
        exp: AuthService.getTokenExp(),
        firebaseUID: AuthService.getFirebaseUID()
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, {
        isLoggedIn: false,
        token: null,
        exp: null,
        firebaseUID: null
      })
      return newState
    }
    default:
      return state
  }
}

export default auth