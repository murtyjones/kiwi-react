import BluebirdPromise from 'bluebird'
import { isTokenNearExpiration } from './timeUtils'
import { refreshToken } from '../actions/Auth'
import store from '../Store'
import AuthService from './AuthService'

const authService = new AuthService()


const setFetchOptions = (options, body, headers) => {
  return {
    ...options
    , body
    , headers
  }
}

const ApiFetch = (url, options = {}) => {
  let { body, headers } = options
  return BluebirdPromise.resolve().then(() => {
    if (!url) {
      throw new Error("need a url")
    }
    body = JSON.stringify(body)

    let _headers = {
      'Accept': 'application/json'
      , 'Content-Type': 'application/json'
      , ...headers
    }

    let exp = AuthService.getTokenExp() // static method
    const needsRefresh = isTokenNearExpiration(exp)
    if(needsRefresh) { // need a new token before sending request
      console.log('Refreshing user token.')
      return authService.refreshToken(AuthService.getRefreshToken()).then(response => {
        const idToken = response.idToken
        _headers.Authorization = `Bearer ${idToken}`
        const tokenExp = AuthService.decodeTokenExp(idToken)
        console.log(tokenExp)
        AuthService.setToken(idToken)
        AuthService.setTokenExp(tokenExp)
        store.dispatch(refreshToken()) // store the new token in global state
        return setFetchOptions(options, body, _headers)
      }).then(options => {
        return fetch(url, options)
      })
    } else { // use valid token in global state
      if(store) {
        let state = store.getState()
        if(state.auth && state.auth.token) {
          _headers.Authorization = state.auth.token
        }
      }
      options = setFetchOptions(options, body, _headers)
      return fetch(url, options)
    }

  }).then(response => {
    return response.json().then(body => {
      if(response.status >= 200 && response.status < 300) return body
      else throw body
    })

  })
}

export default ApiFetch
