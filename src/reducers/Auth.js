import { ACTIONS } from '../constants'
import AuthService from '../utils/AuthService'

const initialState = {
  isLoggedIn: AuthService.isAuthenticated()
  , token: AuthService.getToken()
  , exp: AuthService.getTokenExp()
  , isAdmin: AuthService.getIsAdmin()
  , userId: AuthService.getUserId()
  , refreshToken: AuthService.getRefreshToken()
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOKEN_REFRESH:
    case ACTIONS.LOGIN_SUCCESS: {
      const idToken = action.payload.idToken
      const decodedToken = AuthService.decodeToken(idToken)
      const decodedExp = AuthService.decodeTokenExp(idToken)
      AuthService.setToken(idToken)
      AuthService.setTokenExp(decodedExp)
      AuthService.setIsAdmin(decodedToken)
      AuthService.setUserId(decodedToken)
      AuthService.setRefreshToken(action.payload.refreshToken)
      const newState = Object.assign({}, state, {
        isLoggedIn: true
        , token: AuthService.getToken()
        , exp: AuthService.getTokenExp()
        , isAdmin: AuthService.getIsAdmin()
        , userId: AuthService.getUserId()
        , refreshToken: AuthService.getRefreshToken()
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, {
        isLoggedIn: false
        , token: null
        , exp: null
        , isAdmin: false
        , userId: null
        , refreshToken: null
      })
      return newState
    }
    //case ACTIONS.REGISTER_SUCCESS:
    default:
      return state
  }
}

export default authReducer