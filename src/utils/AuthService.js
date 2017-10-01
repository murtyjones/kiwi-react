import jwt_decode from 'jwt-decode'
import { get } from 'lodash'

import fire from './fire'
import { isTokenNearExpiration } from './timeUtils'


export default class AuthService {

  static async signInWithEmailAndPassword(email, password) {
    try {
      const success = await fire.auth().signInWithEmailAndPassword(email, password)
      const idToken = await fire.auth().currentUser.getIdToken(/* forceRefresh */ true)
      const idTokenExp = this.decodeTokenExp(idToken)
      this.setToken(idToken)
      this.setTokenExp(idTokenExp)
      this.setFirebaseUID(success.uid)
      return success
    } catch (e) {
      console.error(`signInWithEmailAndPassword error: ${JSON.stringify(e)}`)
      throw new Error(e)
    }
  }

  static async createUserWithEmailAndPassword(email, password) {
    try {
      const success = await fire.auth().createUserWithEmailAndPassword(email, password)
      const idToken = await fire.auth().currentUser.getIdToken(/* forceRefresh */ true)
      const idTokenExp = this.decodeTokenExp(idToken)
      this.setToken(idToken)
      this.setTokenExp(idTokenExp)
      this.setFirebaseUID(success.uid)
      return success
    } catch (e) {
      console.error(`createUserWithEmailAndPassword error: ${JSON.stringify(e)}`)
      throw new Error(e)
    }
  }

  static async signout() {
    try {
      const success = await fire.auth().signOut()
      this.setToken('')
      this.setTokenExp('')
      this.setFirebaseUID('')
      return success
    } catch (e) {
      console.error(`signout error: ${JSON.stringify(e)}`)
      throw new Error(e)
    }
  }

  static refreshToken() {
    try {
      return fire.auth().currentUser.getIdToken(/* forceRefresh */ true)
    } catch (e) {
      throw (e)
    }
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
    return window.localStorage.getItem('setFirebaseUID')
  }

  static isAuthenticated() {
    const token = this.getToken()
    const isTokenExpiredOrNear = isTokenNearExpiration(token)
    return !!token && !isTokenExpiredOrNear
  }

}

