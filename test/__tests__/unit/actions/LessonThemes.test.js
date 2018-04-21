import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { getManyLessonThemes, deleteLessonTheme, getLessonTheme, putLessonTheme, postLessonTheme } from '../../../../src/actions/LessonThemes'

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

  describe('getManyLessonThemes', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getManyLessonThemes())
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/lesson-themes`
      const expectedBody = {
        method: 'GET'
      }
      const result = await store.dispatch(getManyLessonThemes())
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getManyLessonThemes())
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getManyLessonThemes())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyLessonThemes())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_MANY_LESSON_THEMES_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getManyLessonThemes())
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_LESSON_THEMES_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getManyLessonThemes())
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_MANY_LESSON_THEMES_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('deleteLessonTheme', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(deleteLessonTheme(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/lesson-themes/${params.id}`
      const expectedBody = {
        method: 'DELETE'
      }
      const result = await store.dispatch(deleteLessonTheme(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(deleteLessonTheme(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(deleteLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(deleteLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.DELETE_LESSON_THEME_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(deleteLessonTheme(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.DELETE_LESSON_THEME_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(deleteLessonTheme(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.DELETE_LESSON_THEME_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('getLessonTheme', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getLessonTheme(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/lesson-themes/${params.id}`
      const expectedBody = {
        method: 'GET'
      }
      const result = await store.dispatch(getLessonTheme(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getLessonTheme(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_LESSON_THEME_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getLessonTheme(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_LESSON_THEME_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getLessonTheme(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_LESSON_THEME_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('putLessonTheme', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(putLessonTheme(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/lesson-themes/${params.id}`
      const expectedBody = {
        method: 'PUT'
        , body: params
      }
      const result = await store.dispatch(putLessonTheme(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(putLessonTheme(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(putLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(putLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.PUT_LESSON_THEME_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(putLessonTheme(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.PUT_LESSON_THEME_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(putLessonTheme(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.PUT_LESSON_THEME_FAILURE, payload: rejectWith })
      }
    })
  })


  describe('postLessonTheme', () => {
    let params
    beforeEach(() => {
      params = { id: '123' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(postLessonTheme(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/lesson-themes`
      const expectedBody = {
        method: 'POST'
        , body: params
      }
      const result = await store.dispatch(postLessonTheme(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(postLessonTheme(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(postLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(postLessonTheme(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.POST_LESSON_THEME_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(postLessonTheme(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.POST_LESSON_THEME_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(postLessonTheme(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.POST_LESSON_THEME_FAILURE, payload: rejectWith })
      }
    })
  })

})