import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { getManyUserProjects, getUserProject, putUserProject, postUserProject } from '../../../../src/actions/UserProjects'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('UserProject Themes Actions', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {

  })

  describe('getManyUserProjects', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getManyUserProjects())
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/userprojects`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getManyUserProjects())
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should include query params if included in request', async () => {
      const params = { userId: '123' }
      const expectedUrl = `${config.api}/api/userprojects?userId=${params.userId}`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getManyUserProjects(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getManyUserProjects())
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getManyUserProjects())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyUserProjects())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_MANY_USER_PROJECTS_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyUserProjects())
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_USER_PROJECTS_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getManyUserProjects())
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_USER_PROJECTS_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('getUserProject', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getUserProject(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/userprojects/${params.id}`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getUserProject(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getUserProject(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getUserProject(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getUserProject(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_USER_PROJECT_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getUserProject(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_USER_PROJECT_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getUserProject(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_USER_PROJECT_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('putUserProject', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(putUserProject(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/userprojects/${params.id}`
      const expectedBody = {
        method: "PUT"
        , body: params
      }
      const result = await store.dispatch(putUserProject(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(putUserProject(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(putUserProject(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(putUserProject(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.PUT_USER_PROJECT_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(putUserProject(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.PUT_USER_PROJECT_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(putUserProject(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.PUT_USER_PROJECT_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('postUserProject', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(postUserProject(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/userprojects`
      const expectedBody = {
        method: "POST"
        , body: params
      }
      const result = await store.dispatch(postUserProject(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(postUserProject(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(postUserProject(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(postUserProject(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.POST_USER_PROJECT_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(postUserProject(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.POST_USER_PROJECT_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(postUserProject(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.POST_USER_PROJECT_FAILURE, payload: rejectWith })
      }
    })
  })

})