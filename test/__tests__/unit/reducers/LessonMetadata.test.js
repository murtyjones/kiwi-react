import lessonMetadataReducer from '../../../../src/reducers/LessonMetadata'
import { ACTIONS } from '../../../../src/constants'


describe('Lesson Metadata Reducer', () => {

  describe('PUT_LESSON_ORDER_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.PUT_LESSON_ORDER_SUCCESS
        , payload: {
          after: { blah: 'blah' }
        }
      }
    })

    it('should modify the expected properties of state as expected', () => {
      const r = lessonMetadataReducer(initialState, action)
      expect(r.lessonOrder).toEqual(action.payload.after)
    })

    it('should not modify the rest of state', () => {
      const r = lessonMetadataReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })
  })

  describe('GET_LESSON_ORDER_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.GET_LESSON_ORDER_SUCCESS
        , payload: { blah: 'blah' }
      }
    })

    it('should modify the expected properties of state as expected', () => {
      const r = lessonMetadataReducer(initialState, action)
      expect(r.lessonOrder).toEqual(action.payload)
    })

    it('should not modify the rest of state', () => {
      const r = lessonMetadataReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })
  })

  describe('SIGNOUT_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {}
      action = {
        type: ACTIONS.SIGNOUT_SUCCESS
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        lessonOrder: {}
      }
      const r = lessonMetadataReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })
  
})