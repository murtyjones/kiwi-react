import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { getLessonOrder, putLessonOrder } from '../../../../src/actions/LessonMetadata'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Lesson Metadata Actions', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {

  })

  describe('getLessonOrder', () => {

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(getLessonOrder())
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/lessons/order`
      const expectedBody = {
        method: "GET"
      }
      const result = await store.dispatch(getLessonOrder())
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(getLessonOrder())
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(getLessonOrder())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(getLessonOrder())
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.GET_LESSON_ORDER_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(getLessonOrder())
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.GET_LESSON_ORDER_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(getLessonOrder())
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.GET_LESSON_ORDER_FAILURE, payload: rejectWith })
      }
    })
  })

  describe('putLessonOrder', () => {
    let params
    beforeEach(async() => {
      params = { fake: 'params' }
    })

    afterEach(async() => {
      mockApiFetch.mockClear()
    })

    it('should call ApiFetch once with expected params', async () => {
      await store.dispatch(putLessonOrder(params))
      expect(mockApiFetch.mock.calls.length).toEqual(1)
    })

    it('should pass expected params to ApiFetch', async () => {
      const expectedUrl = `${config.api}/api/lessons/order`
      const expectedBody = {
        body: params
        , method: "PUT"
      }
      const result = await store.dispatch(putLessonOrder(params))
      expect(mockApiFetch.mock.calls[0][0]).toEqual(expectedUrl)
      expect(mockApiFetch.mock.calls[0][1]).toEqual(expectedBody)
    })

    it('should return the expected response', async () => {
      const expectedResult = await mockApiFetch()
      const result = await store.dispatch(putLessonOrder(params))
      expect(result).toEqual(expectedResult)
    })

    it('should call dispatch twice', async () => {
      const result = await store.dispatch(putLessonOrder(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
    })

    it('should make first dispatch call with expected params', async () => {
      const result = await store.dispatch(putLessonOrder(params))
      const actions = store.getActions()
      expect(actions.length).toEqual(2)
      expect(actions[0]).toEqual({ type: ACTIONS.PUT_LESSON_ORDER_REQUEST })
    })

    it('should make second dispatch call with expected params', async () => {
      const result = await store.dispatch(putLessonOrder(params))
      const actions = store.getActions()
      expect(actions[1]).toEqual({ type: ACTIONS.PUT_LESSON_ORDER_SUCCESS, payload: result })
    })

    it('should make expected dispatch call with expected params if ApiFetch rejects', async () => {
      const rejectWith = 'ApiFetch Rejected Result'
      mockApiFetch.mockReturnValueOnce(Promise.reject(rejectWith))
      try {
        await store.dispatch(putLessonOrder(params))
        expect.fail()
      } catch(err) {
        const actions = store.getActions()
        expect(actions[1]).toEqual({ type: ACTIONS.PUT_LESSON_ORDER_FAILURE, payload: rejectWith })
      }
    })
  })

})