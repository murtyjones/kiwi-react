import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { getManyUserLessons, getUserLesson, putUserLesson, postUserLesson } from '../../../../src/actions/UserLessons'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('UserLesson Themes Actions', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {

  })

  describe('getManyUserLessons', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getManyUserLessons())
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/user-lessons`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getManyUserLessons())
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getManyUserLessons())
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getManyUserLessons())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyUserLessons())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyUserLessons())
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getManyUserLessons())
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_USER_LESSONS_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('getUserLesson', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getUserLesson(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/user-lessons/${params.id}`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getUserLesson(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getUserLesson(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getUserLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getUserLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_USER_LESSON_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getUserLesson(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_USER_LESSON_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getUserLesson(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_USER_LESSON_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('putUserLesson', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(putUserLesson(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/user-lessons/${params.id}`
      const expectedBody = {
        method: "PUT"
        , body: params
      }
      const result = await store.dispatch(putUserLesson(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(putUserLesson(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(putUserLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(putUserLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.PUT_USER_LESSON_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(putUserLesson(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.PUT_USER_LESSON_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(putUserLesson(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.PUT_USER_LESSON_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('postUserLesson', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(postUserLesson(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/user-lessons`
      const expectedBody = {
        method: "POST"
        , body: params
      }
      const result = await store.dispatch(postUserLesson(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(postUserLesson(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(postUserLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(postUserLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.POST_USER_LESSON_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(postUserLesson(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.POST_USER_LESSON_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(postUserLesson(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.POST_USER_LESSON_FAILURE, payload: rejectWith })
      }
    })
  })

})