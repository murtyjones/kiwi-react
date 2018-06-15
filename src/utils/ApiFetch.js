import BluebirdPromise from 'bluebird'
import store from '../Store'


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

    if(store) {
      let state = store.getState()
      if(state.auth && state.auth.token) {
        _headers.Authorization = state.auth.token
      }
    }
    options = setFetchOptions(options, body, _headers)
    return fetch(url, options)
  }).then(response => {
    return response.json().then(body => {
      if(response.status >= 200 && response.status < 300) return body
      else throw body
    })

  })
}

export default ApiFetch
