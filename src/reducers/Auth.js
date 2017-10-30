import { ACTIONS } from '../constants'
import AuthServiceV2 from '../utils/AuthServiceV2'

const initialState = {
  isLoggedIn: AuthServiceV2.isAuthenticated()
  , token: AuthServiceV2.getToken()
  , exp: AuthServiceV2.getTokenExp()
  , isAdmin: AuthServiceV2.getIsAdmin()
  , refreshToken: AuthServiceV2.getRefreshToken()
}

function auth(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOKEN_REFRESH:
    case ACTIONS.LOGIN_SUCCESS: {
      const idToken = action.payload.idToken
      const decoded = AuthServiceV2.decodeToken(idToken)
      const decodedExp = AuthServiceV2.decodeTokenExp(idToken)
      AuthServiceV2.setToken(idToken)
      AuthServiceV2.setTokenExp(decodedExp)
      AuthServiceV2.setIsAdmin(decoded)
      AuthServiceV2.setRefreshToken(action.payload.refreshToken)
      const newState = Object.assign({}, state, {
        isLoggedIn: true
        , token: AuthServiceV2.getToken()
        , exp: AuthServiceV2.getTokenExp()
        , isAdmin: AuthServiceV2.getIsAdmin()
        , refreshToken: AuthServiceV2.getRefreshToken()
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, {
        isLoggedIn: false
        , token: null
        , exp: null
        , isAdmin: false
        , refreshToken: null
      })
      return newState
    }
    //case ACTIONS.REGISTER_SUCCESS:
    default:
      return state
  }
}

export default auth