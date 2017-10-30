import { ACTIONS } from '../constants'
import AuthService from '../utils/AuthService'

const initialState = {
  isLoggedIn: AuthService.isAuthenticated()
  , token: AuthService.getToken()
  , exp: AuthService.getTokenExp()
  , firebaseUID: AuthService.getFirebaseUID()
}

function auth(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOKEN_REFRESH:
    case ACTIONS.LOGIN_SUCCESS: {
      const idToken = action.payload.idToken
      const decodedExp = AuthService.decodeTokenExp(idToken)
      AuthService.setToken(`Bearer ${idToken}`)
      AuthService.setTokenExp(decodedExp)
      const newState = Object.assign({}, state, {
        isLoggedIn: true
        , token: `Bearer ${idToken}`
        , exp: decodedExp
      })
      return newState
    }
    case ACTIONS.SIGNOUT_SUCCESS: {
      const newState = Object.assign({}, state, {
        isLoggedIn: false
        , token: null
        , exp: null
      })
      return newState
    }
    case ACTIONS.REGISTER_SUCCESS:
    default:
      return state
  }
}

export default auth