import { tokenNeedsRefresh } from './timeUtils'
import { refreshToken } from '../actions/Auth'
import store from '../Store'
import AuthService from './AuthService'

const authService = new AuthService()

const timeInMilliSeconds = 60 * 10 * 1000 // every 10 minutes

setInterval(() => {
  let exp = AuthService.getTokenExp() // static method
  let iat = AuthService.getTokenIat() // static method
  const needsRefresh = tokenNeedsRefresh(exp, iat)
  if (!!exp && !!iat && needsRefresh) {
    console.log('refreshing token')
    getNewToken()
  }
}, timeInMilliSeconds)


export const getNewToken = async () => {
  try {
    const response = await authService.refreshToken(AuthService.getRefreshToken())
    const idToken = response.idToken
    const token = AuthService.decodeToken(idToken)
    AuthService.setToken(idToken)
    AuthService.setTokenExp(token.exp)
    // store the new token in global state
    store.dispatch(refreshToken({ idToken }))
  } catch (err) {
    console.error(err)
  }
}