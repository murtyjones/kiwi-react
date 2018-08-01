import mockAuthService from '../../../__mocks__/authService'
import { ACTIONS } from '../../../../src/constants'
jest.mock('../../../../src/utils/AuthService', () => mockAuthService)
import authReducer from '../../../../src/reducers/Auth'

describe('Auth Reducer', () => {

  describe('TOKEN_REFRESH', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {

      }
      action = {
        type: ACTIONS.TOKEN_REFRESH
        , payload: {
          idToken: 'fakeIdToken'
          , refreshToken: 'fakeRefreshToken'
        }
      }
    })

    afterEach(() => {
      Object.values(mockAuthService).forEach(e => e.mockReset())
    })

    it('should modify state as expected', () => {
      const expected = {
        isLoggedIn: true
        , token: mockAuthService.getToken()
        , exp: mockAuthService.getTokenExp()
        , iat: mockAuthService.getTokenIat()
        , isAdmin: mockAuthService.getIsAdmin()
        , temporaryPassword: mockAuthService.getTemporaryPassword()
        , isProvider: mockAuthService.getIsProvider()
        , subscription: mockAuthService.getSubscription()
        , userId: mockAuthService.getUserId()
        , username: mockAuthService.getUsername()
        , refreshToken: mockAuthService.getRefreshToken()
      }
      const r = authReducer(initialState, action)
      expect(r).toEqual(expected)
    })

    it('should call decodeToken once with expected params', () => {
      const r = authReducer(initialState, action)
      expect(mockAuthService.decodeToken.mock.calls.length).toEqual(1)
      expect(mockAuthService.decodeToken.mock.calls[0][0]).toEqual(action.payload.idToken)
    })

    it('should call setToken once with expected params', () => {
      const r = authReducer(initialState, action)
      expect(mockAuthService.setToken.mock.calls.length).toEqual(1)
      expect(mockAuthService.setToken.mock.calls[0][0]).toEqual(action.payload.idToken)
    })

    it('should call setTokenExp once with expected params', () => {
      const r = authReducer(initialState, action)
      expect(mockAuthService.setTokenExp.mock.calls.length).toEqual(1)
      expect(mockAuthService.setTokenExp.mock.calls[0][0]).toEqual(mockAuthService.decodeTokenExp())
    })

    it('should call setIsAdmin once with expected params', () => {
      const r = authReducer(initialState, action)
      expect(mockAuthService.setIsAdmin.mock.calls.length).toEqual(1)
      expect(mockAuthService.setIsAdmin.mock.calls[0][0]).toEqual(mockAuthService.decodeToken())
    })

    it('should call setUserId once with expected params', () => {
      const r = authReducer(initialState, action)
      expect(mockAuthService.setUserId.mock.calls.length).toEqual(1)
      expect(mockAuthService.setUserId.mock.calls[0][0]).toEqual(mockAuthService.decodeToken())
    })

    it('should call setRefreshToken once with expected params', () => {
      const r = authReducer(initialState, action)
      expect(mockAuthService.setRefreshToken.mock.calls.length).toEqual(1)
      expect(mockAuthService.setRefreshToken.mock.calls[0][0]).toEqual(action.payload.refreshToken)
    })

    it('should call other expected AuthService methods once each', () => {
      const r = authReducer(initialState, action)
      expect(mockAuthService.getTokenExp.mock.calls.length).toEqual(1)
      expect(mockAuthService.getIsAdmin.mock.calls.length).toEqual(1)
      expect(mockAuthService.getUserId.mock.calls.length).toEqual(1)
      expect(mockAuthService.getRefreshToken.mock.calls.length).toEqual(1)
    })

  })

  describe('SIGNOUT_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {

      }
      action = {
        type: ACTIONS.SIGNOUT_SUCCESS
      }
    })

    it('should modify state as expected', () => {
      const expected = {
        isLoggedIn: false
        , token: null
        , exp: null
        , iat: null
        , isAdmin: false
        , isProvider: false
        , subscription: {}
        , temporaryPassword: null
        , userId: null
        , username: null
        , refreshToken: null
      }
      const r = authReducer(initialState, action)
      expect(r).toEqual(expected)
    })


  })


})
