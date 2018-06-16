import get from 'lodash/get'
import { ACTIONS } from '../constants'
import AuthService from '../utils/AuthService'

const initialState = {
  isLoggedIn: AuthService.isAuthenticated()
  , token: AuthService.getToken()
  , exp: AuthService.getTokenExp()
  , iat: AuthService.getTokenIat()
  , isAdmin: AuthService.getIsAdmin()
  , isProvider: AuthService.getIsProvider()
  , subscription: AuthService.getSubscription()
  , userId: AuthService.getUserId()
  , username: AuthService.getUsername()
  , refreshToken: AuthService.getRefreshToken()
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOKEN_REFRESH:
    case ACTIONS.LOGIN_SUCCESS: {
      const idToken = action.payload.idToken
      const decodedToken = AuthService.decodeToken(idToken)
      AuthService.setToken(idToken)
      AuthService.setTokenExp(get(decodedToken, 'exp', undefined))
      AuthService.setTokenIat(get(decodedToken, 'iat', undefined))
      AuthService.setIsAdmin(decodedToken)
      AuthService.setIsProvider(decodedToken)
      AuthService.setSubscription(decodedToken)
      AuthService.setUserId(decodedToken)
      AuthService.setUsername(decodedToken)
      if (action.payload && action.payload.refreshToken)
        AuthService.setRefreshToken(action.payload.refreshToken)
      const newState = Object.assign({}, state, {
        isLoggedIn: true
        , token: AuthService.getToken()
        , exp: AuthService.getTokenExp()
        , iat: AuthService.getTokenIat()
        , isAdmin: AuthService.getIsAdmin()
        , isProvider: AuthService.getIsProvider()
        , subscription: AuthService.getSubscription()
        , userId: AuthService.getUserId()
        , username: AuthService.getUsername()
        , refreshToken: AuthService.getRefreshToken()
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, {
        isLoggedIn: false
        , token: null
        , exp: null
        , iat: null
        , isAdmin: false
        , isProvider: false
        , subscription: {}
        , userId: null
        , username: null
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
