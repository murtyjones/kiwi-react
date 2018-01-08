import lessonMetadataReducer from '../../../../src/reducers/LessonMetadata'
import { ACTIONS } from '../../../../src/constants'


describe('Lessons Reducer', () => {

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
  
})