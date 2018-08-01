import auth0 from 'auth0-js'
import config from 'config'
import jwt_decode from 'jwt-decode'
import BluebirdPromise from 'bluebird'
import get from 'lodash/get'
import moment from 'moment'

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


  login({ username, email, password }) {
    const derivedUsername = email ? this.constructor.makePlaceholderUsername(email) : username
    return new Promise((resolve, reject) => {
      return this.auth0.client.login({
        realm: config.auth.realm
        , username: derivedUsername
        , password
        , scope: config.auth.scope
      }, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  }

  refreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      return this.auth0.client.oauthToken({
        grantType: 'refresh_token'
        , refreshToken: refreshToken
        , clientID:config.auth.clientID
        , scope: config.auth.scope
        , audience: config.auth.audience
      }, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }


  handleAuthentication() {
    return new BluebirdPromise((resolve, reject) => {
      return this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(authResult)
        } else if (err) {
          reject({ err: err })
        }
      })
    })

  }

  signout() {
    return new BluebirdPromise((resolve, reject) => {
      window.localStorage.clear()
      return resolve('done!')
    })
  }

  // must match kiwi-node:
  static makePlaceholderUsername = email => email.replace(/[\@]/gm, 'AT')

  // must match kiwi-node:
  static makePlaceholderUsernameFromName = (firstName, lastName) =>
    `${firstName}-${lastName}-${moment.utc().format()}`.replace(/[ :]/g, '_').toLocaleLowerCase()

  // must match kiwi-node:
  static isPlaceholderUsernameFromUsername = username => {
    const match = username.match(new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}t[0-9]{2}_[0-9]{2}_[0-9]{2}z/gm))
    return match && match.length >= 1
  }

  static logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('exp')
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

  static getToken() {
    return window.localStorage.getItem('token')
  }

  static setRefreshToken(refreshToken) {
    return window.localStorage.setItem('refreshToken', refreshToken)
  }

  static getRefreshToken() {
    return window.localStorage.getItem('refreshToken')
  }

  static setUserId(decodedToken) {
    const app_metadata = get(decodedToken, `${config.auth.namespace}/app_metadata`)
    return window.localStorage.setItem('userId', app_metadata.userId)
  }

  static getUserId() {
    return window.localStorage.getItem('userId')
  }

  static setUsername(decodedToken) {
    return window.localStorage.setItem('username', decodedToken.nickname)
  }

  static getUsername() {
    return window.localStorage.getItem('username')
  }

  static setIsAdmin(decodedToken) {
    const app_metadata = get(decodedToken, `${config.auth.namespace}/app_metadata`)
    const isAdmin = get(app_metadata, 'roles', []).reduce((acc, role) => {
      if (role.isAdmin) {
        acc = true
      }
      return acc
    }, false)
    return window.localStorage.setItem('isAdmin', isAdmin)
  }

  static setIsProvider(decodedToken) {
    const app_metadata = get(decodedToken, `${config.auth.namespace}/app_metadata`)
    const isProvider = get(app_metadata, 'roles', []).reduce((acc, role) => {
      if (role.isProvider) {
        acc = true
      }
      return acc
    }, false)
    return window.localStorage.setItem('isProvider', isProvider)
  }

  static setSubscription(decodedToken) {
    const app_metadata = get(decodedToken, `${config.auth.namespace}/app_metadata`) || {}
    const subscription = app_metadata.subscription || {}
    return window.localStorage.setItem('subscription', JSON.stringify(subscription))
  }

  static setTemporaryPassword(decodedToken) {
    const app_metadata = get(decodedToken, `${config.auth.namespace}/app_metadata`) || {}
    const temporaryPassword = app_metadata.temporaryPassword || ''
    return window.localStorage.setItem('temporaryPassword', temporaryPassword)
  }

  static getTemporaryPassword() {
    return window.localStorage.getItem('temporaryPassword')
  }

  static getIsAdmin() {
    let isAdmin = window.localStorage.getItem('isAdmin')
    isAdmin = JSON.parse(isAdmin) === true
    return isAdmin
  }

  static getIsProvider() {
    let isProvider = window.localStorage.getItem('isProvider')
    isProvider = JSON.parse(isProvider) === true
    return isProvider
  }

  static getSubscription() {
    let subscription = window.localStorage.getItem('subscription')
    subscription = JSON.parse(subscription)
    return subscription
  }

  static setTokenExp(exp) {
    window.localStorage.setItem('exp', exp)
  }

  static getTokenExp() {
    return window.localStorage.getItem('exp')
  }

  static setTokenIat(iat) {
    window.localStorage.setItem('iat', iat)
  }

  static getTokenIat() {
    return window.localStorage.getItem('iat')
  }

  static isAuthenticated() {
    const token = this.getToken()
    const exp = this.getTokenExp()
    const isTokenExpiredOrNear = hasTokenExpired(exp)
    return !!token && !isTokenExpiredOrNear
  }
}
