import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { getManyLessons, deleteLesson, getLesson, putLesson, postLesson } from '../../../../src/actions/Lessons'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Lesson Themes Actions', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {

  })

  describe('getManyLessons', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getManyLessons())
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/lessons`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getManyLessons())
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getManyLessons())
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getManyLessons())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyLessons())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_MANY_LESSONS_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyLessons())
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_LESSONS_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getManyLessons())
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_LESSONS_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('deleteLesson', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(deleteLesson(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/lessons/${params.id}`
      const expectedBody = {
        method: "DELETE"
      }
      const result = await store.dispatch(deleteLesson(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(deleteLesson(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(deleteLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(deleteLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.DELETE_LESSON_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(deleteLesson(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.DELETE_LESSON_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(deleteLesson(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.DELETE_LESSON_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('getLesson', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getLesson(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/lessons/${params.id}`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getLesson(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getLesson(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_LESSON_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getLesson(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_LESSON_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getLesson(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_LESSON_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('putLesson', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(putLesson(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/lessons/${params.id}`
      const expectedBody = {
        method: "PUT"
        , body: params
      }
      const result = await store.dispatch(putLesson(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(putLesson(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(putLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(putLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.PUT_LESSON_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(putLesson(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.PUT_LESSON_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(putLesson(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.PUT_LESSON_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('postLesson', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(postLesson(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/lessons`
      const expectedBody = {
        method: "POST"
        , body: params
      }
      const result = await store.dispatch(postLesson(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(postLesson(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(postLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(postLesson(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.POST_LESSON_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(postLesson(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.POST_LESSON_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(postLesson(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.POST_LESSON_FAILURE, payload: rejectWith })
      }
    })
  })

})