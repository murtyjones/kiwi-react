import auth0 from 'auth0-js'
import config from 'config'
import BluebirdPromise from 'bluebird'
import { get } from 'lodash'


export default class AuthServiceV2 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'kiwi-prod.auth0.com'
      , clientID: 'qNZS0jbIQwLus56P2h2T2PbzuwIf6EaF'
      , redirectUri: 'http://localhost:3000/auth/callback'
      , audience: `https://kiwi-prod.auth0.com/userinfo`
      , responseType: 'token id_token'
      , scope: 'openid'
      , leeway: 60
    })
  }

  login({ email, password }) {
    return new Promise((resolve, reject) => {
      return this.auth0.redirect.loginWithCredentials({
        connection: 'Username-Password-Authentication'
        , username: email
        , password: password
        , scope: 'openid'
      }, (err, result) => {
        console.log(err)
        if (err) return reject(err)
        resolve(result)
      })
    })
  }

  handleAuthentication() {
    return new BluebirdPromise((resolve, reject) => {
      return this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve({ idToken: authResult.idToken })
        } else if (err) {
          reject({ err: err })
        }
      })
    })

  }

  static setSession(authResult){
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    this.setToken(authResult.idToken)
    this.setTokenExp(expiresAt)
  }

  static logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('exp')
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt

  }

  static decodeToken(idToken) {
    return jwt_decode(idToken)
  }

  static decodeTokenExp(idToken) {
    return get(this.decodeToken(idToken), 'exp', '')
  }

  static setToken(token) {
    window.localStorage.setItem('token', token)
  }

  static setTokenExp(tokenExpTimestamp) {
    window.localStorage.setItem('tokenExp', tokenExpTimestamp)
  }

  static setFirebaseUID(firebaseUID) {
    window.localStorage.setItem('firebaseUID', firebaseUID)
  }

  static getToken() {
    return window.localStorage.getItem('token')
  }

  static getTokenExp() {
    return window.localStorage.getItem('tokenExp')
  }

  static getFirebaseUID() {
    return window.localStorage.getItem('firebaseUID')
  }
}