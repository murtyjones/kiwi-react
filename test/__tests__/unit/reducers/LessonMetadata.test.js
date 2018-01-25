import lessonMetadataReducer from '../../../../src/reducers/LessonMetadata'
import { ACTIONS } from '../../../../src/constants'


describe('Lesson Metadata Reducer', () => {

  describe('...REQUEST', () => {
    describe('PUT_LESSON_ORDER_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          lessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.PUT_LESSON_ORDER_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const r = lessonMetadataReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_LESSON_ORDER_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          lessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_LESSON_ORDER_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const r = lessonMetadataReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })


    })
  })

  describe('...SUCCESS', () => {
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
  
      it('should modify state as expected', () => {
        const expected = {
          ...initialState
          , lessonOrder: action.payload.after
          , isFetching: false
        }
        const newState = lessonMetadataReducer(initialState, action)
        expect(newState).toEqual(expected)
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

    it('should modify state as expected', () => {
      const expected = {
        ...initialState
        , lessonOrder: action.payload
        , isFetching: false
      }
      const newState = lessonMetadataReducer(initialState, action)
      expect(newState).toEqual(expected)
    })

  })
  })

  describe('...FAILURE', () => {
    describe('PUT_LESSON_ORDER_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          lessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.PUT_LESSON_ORDER_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const r = lessonMetadataReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_LESSON_ORDER_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          lessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_LESSON_ORDER_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const r = lessonMetadataReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })


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
        , isFetching: false
      }
      const r = lessonMetadataReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })
  
})