import { tokenNeedsRefresh } from './timeUtils'
import { refreshToken } from '../actions/Auth'
import store from '../Store'
import AuthService from './AuthService'

const authService = new AuthService()

setInterval(() => {
  // disable refresh stuff
  let exp = AuthService.getTokenExp() // static method
  let iat = AuthService.getTokenIat() // static method
  const needsRefresh = tokenNeedsRefresh(exp, iat)
  if (!!exp && !!iat && needsRefresh) {
    console.log('refreshing token')
    return authService.refreshToken(AuthService.getRefreshToken()).then(response => {
      console.log(response)
      const idToken = response.idToken
      const accessToken = response.accessToken
      const token = AuthService.decodeToken(idToken)
      AuthService.setToken(idToken)
      AuthService.setTokenExp(token.exp)
      store.dispatch(refreshToken({
        idToken, refreshToken: accessToken
      })) // store the new token in global state
    })
  }
}, 10000)
