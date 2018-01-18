import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import localStorageMock from '../../../__mocks__/localstorage'
import '../../../__mocks__/config'
import config from 'config'
import mockAuth0, { loginStub, loginStubResult } from '../../../__mocks__/auth0'
jest.mock('auth0-js', () => mockAuth0)

import { ACTIONS } from '../../../../src/constants'
import AuthService from '../../../../src/utils/AuthService'

window.localStorage = localStorageMock


describe('Auth Actions', () => {
  let authService
  beforeEach(async () => {
    authService = new AuthService()
  })

  afterEach(() => {

  })

  describe('constructor', () => {
    it('should call auth0.WebAuth once with expected args', async () => {
      const expected = {
        domain:  config.auth.domain
        , clientID: config.auth.clientID
        , redirectUri: config.auth.redirectUri
        , audience: config.auth.audience
        , responseType: config.auth.responseType
        , scope: config.auth.scope
        , leeway: 60
      }
      expect(mockAuth0.WebAuth.mock.calls.length).toEqual(1)
      expect(mockAuth0.WebAuth.mock.calls[0][0]).toEqual(expected)
    })
  })

  describe('login', () => {
    let params
    beforeEach(async () => {
      params = { username: 'fakeUsername', password: 'fakePassword' }
    })

    it('should call auth0.client.login once with expected args', () => {
      const params = { username: 'fakeUsername', password: 'fakePassword' }
      const result = authService.login(params)
      expect(loginStub.mock.calls.length).toEqual(1)
      expect(loginStub.mock.calls[0][0]).toEqual({
        password: params.password
        , realm: config.auth.realm
        , scope: config.auth.scope
        , username: params.username
      })
    })

    it('should resolve with expected value', async () => {
      const params = { username: 'fakeUsername', password: 'fakePassword' }
      const result = await authService.login(params)
      expect(result).toEqual(loginStubResult)
    })

    it('should reject with expected value if error', async () => {
      const failMsg = 'failure'
      loginStub.mockImplementationOnce((params, cb) => cb(failMsg, null))
      try {
        const params = { username: 'fakeUsername', password: 'fakePassword' }
        const result = await authService.login(params)
      } catch(err) {
        expect(err).toEqual(failMsg)

      }
    })

  })

})