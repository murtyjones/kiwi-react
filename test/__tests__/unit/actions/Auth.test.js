import mockAuthServiceMethods, { mockAuthService } from '../../../__mocks__/authService'
jest.mock('../../../../src/utils/AuthService', () => mockAuthService)
import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { login, register, signout, refreshToken } from '../../../../src/actions/Auth'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth Actions', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {
    Object.values(mockAuthService).forEach(e => e.mockReset())
  })

  describe('login', () => {
    let params
    beforeEach(async() => {
      params = { username: 'fakeUsername', password: 'fakePassword' }
    })

    it('should call authService.login once with expected params', async () => {
      await store.dispatch(login(params))
      expect(mockAuthServiceMethods.login.mock.calls.length).toEqual(1)
      expect(mockAuthServiceMethods.login.mock.calls[0][0]).toEqual(params)
    })

    it('should call return expected result', async () => {
      const result = await store.dispatch(login(params))
      expect(result).toEqual(await mockAuthServiceMethods.login())
    })

    it('should call dispatch twice', async () => {
      await store.dispatch(login(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      await store.dispatch(login(params))
      const actions = store.getActions()
      expect(actions[0]).toEqual({ type: ACTIONS.LOGIN_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(login(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.LOGIN_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockAuthServiceMethods.login.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(login(params))
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.LOGIN_FAILURE, payload: rejectWith })
      }

    })

  })

  describe('register', () => {
    let params
    beforeEach(async() => {
      params = { username: 'fakeUsername', password: 'fakePassword' }
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(register(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/auth/register`
      const expectedBody = {
        body: params,
        method: 'POST'
      }
      const result = await store.dispatch(register(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(register(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(register(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(register(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.REGISTER_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(register(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.REGISTER_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        const result = await store.dispatch(register(params))
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.REGISTER_FAILURE, payload: rejectWith })
      }
    })

  })

  describe('signout', () => {
    let params
    beforeEach(async() => {
      params = { username: 'fakeUsername', password: 'fakePassword' }
    })

    it('should call authService.signout once', async () => {
      await store.dispatch(signout(params))
      expect(mockAuthServiceMethods.signout.mock.calls.length).toEqual(1)
    })

    it('should call return expected result', async () => {
      const result = await store.dispatch(signout(params))
      expect(result).toEqual(await mockAuthServiceMethods.signout())
    })

    it('should call dispatch twice', async () => {
      await store.dispatch(signout(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      await store.dispatch(signout(params))
      const actions = store.getActions()
      expect(actions[0]).toEqual({ type: ACTIONS.SIGNOUT_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(signout(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.SIGNOUT_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockAuthServiceMethods.signout.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(signout(params))
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.SIGNOUT_FAILURE, payload: rejectWith })
      }

    })

  })

  describe('refreshToken', () => {
    it('should dispatch once with expected args', async () => {
      await store.dispatch(refreshToken())
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.TOKEN_REFRESH, payload: {} })
    })

  })

})