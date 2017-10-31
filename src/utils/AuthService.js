import auth0 from 'auth0-js'
import config from 'config'
import jwt_decode from 'jwt-decode'
import BluebirdPromise from 'bluebird'
import { get } from 'lodash'

import { hasTokenExpired } from './timeUtils'

export default class AuthService {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain:  config.auth.domain
      , clientID: config.auth.clientID
      , redirectUri: config.auth.redirectUri
      , audience: config.auth.audience
      , responseType: config.auth.responseType
      , scope: config.auth.scope
      , leeway: 60
    })
  }


  login({ email, password }) {
    return new Promise((resolve, reject) => {
      return this.auth0.client.login({
        realm: config.auth.realm
        , username: email
        , password: password
        , scope: config.auth.scope
      }, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  }

  refreshToken(refreshToken) {
    console.log('called')
    return new Promise((resolve, reject) => {
      return this.auth0.client.oauthToken({
        grantType: 'refresh_token'
        , refreshToken: refreshToken
        , clientID:config.auth.clientID
        , scope: config.auth.scope
        , audience: config.auth.audience

      }, (err, result) => {
        if (err) {
          console.log(err)
          return reject(err) }
        console.log(result)
        resolve(result)
      })
    })
  }


  handleAuthentication() {
    return new BluebirdPromise((resolve, reject) => {
      return this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          console.log(authResult)
          resolve(authResult)
        } else if (err) {
          reject({ err: err })
        }
      })
    })

  }

  static signout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('exp')
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
    window.localStorage.setItem('token', `Bearer ${token}`)
  }

  static setTokenExp(tokenExpTimestamp) {
    console.log(tokenExpTimestamp)
    window.localStorage.setItem('tokenExp', tokenExpTimestamp)
  }

  static getToken() {
    return window.localStorage.getItem('token')
  }

  static setIsAdmin(decodedToken) {
    const app_metadata = get(decodedToken, `${config.auth.namespace}/app_metadata`)
    const isAdmin = get(app_metadata, 'roles', []).reduce((acc, role) => {
      if(role.isAdmin) {
        acc = true
      }
      return acc
    }, false)
    return window.localStorage.setItem('isAdmin', isAdmin)
  }

  static setRefreshToken(refreshToken) {
    return window.localStorage.setItem('refreshToken', refreshToken)
  }

  static getRefreshToken() {
    return window.localStorage.getItem('refreshToken')
  }

  static getIsAdmin() {
    let isAdmin = window.localStorage.getItem('isAdmin')
    isAdmin = JSON.parse(isAdmin) === true
    return isAdmin
  }

  static getTokenExp() {
    return window.localStorage.getItem('tokenExp')
  }

  static isAuthenticated() {
    const token = this.getToken()
    const tokenExp = this.getTokenExp()
    const isTokenExpiredOrNear = hasTokenExpired(tokenExp)
    return !!token && !isTokenExpiredOrNear
  }
}