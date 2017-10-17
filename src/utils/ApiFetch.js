import BluebirdPromise from 'bluebird'
import is from 'is_js'
import validate from 'validate.js'

import { isTokenNearExpiration } from './timeUtils'
import { refreshToken } from '../actions/Auth'
import AuthService from './AuthService'

let store
const setStoreForFetch = (newStore) => {
  store = newStore
}

const setFetchOptions = (options, body, headers) => {
  return {
    ...options,
    body,
    headers
  }
}

// I don't know how to use this
// Suppose I want to send a put request to the backend
// then I would think I would need based on let { body, headers, data } = options

// const options = {
//   method:"PUT",
//   data:{
//     code: code,
//     id: id
//   }
// }

//However this doesnt work.

//It does work if we have body:{...} instead and I think it has something to do with
// if (data) {
//   delete headers['Content-Type']
//   body = data
// }

//--Peter




const ApiFetch = (url, options = {}) => {
  let { body, headers, data } = options
  console.log('inside ApiFetch and body is: ', body);
  console.log('inside ApiFetch and headers is: ', headers);
  console.log('inside ApiFetch and data is: ', data);
  return BluebirdPromise.resolve().then(() => {
    if (!is.string(url)) {
      throw new Error("ApiFetch needs a url")
    }
    if (is.json(body)) {
      body = JSON.stringify(body)
    }

    let finalHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
    if (data) {
      delete headers['Content-Type']
      body = data
    }

    let exp = AuthService.getTokenExp() // static method
    const needsRefresh = isTokenNearExpiration(exp)

    if (needsRefresh) { // need a new token before sending request
      return AuthService.refreshToken().then(idToken => {
        finalHeaders.Authorization = idToken
        const tokenExp = AuthService.decodeTokenExp(idToken)
        AuthService.setToken(idToken)
        AuthService.setTokenExp(tokenExp)
        store.dispatch(refreshToken()) // store the new token in global state
        return setFetchOptions(options, body, finalHeaders)
      }).then(options => {
        return fetch(url, options)
      })
    } else { // use valid token in global state
      if(store) {
        let state = store.getState()
        if(state.auth && state.auth.token) {
          finalHeaders.Authorization = state.auth.token
        }
      }
      options = setFetchOptions(options, body, finalHeaders)
      return fetch(url, options)
    }

  }).then(response => {
    if(response.status >= 200 && response.status < 300) return response.json()
    else throw new Error(response)
  })
}

export { setStoreForFetch, ApiFetch }
