import lessonsReducer from '../../../../src/reducers/Lessons'
import { ACTIONS } from '../../../../src/constants'


describe('Lessons Reducer', () => {

  describe('...REQUEST', () => {
    describe('PUT_LESSON_REQUEST', () => {
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
          type: ACTIONS.PUT_LESSON_REQUEST
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('POST_LESSON_REQUEST', () => {
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
          type: ACTIONS.POST_LESSON_REQUEST
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })


    })

    describe('GET_MANY_LESSONS_REQUEST', () => {
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
          type: ACTIONS.GET_MANY_LESSONS_REQUEST
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })
    })

    describe('GET_LESSON_REQUEST', () => {
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
          type: ACTIONS.GET_LESSON_REQUEST
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })
    })
  })


  describe('...FAILURE', () => {
    describe('PUT_LESSON_FAILURE', () => {
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
          type: ACTIONS.PUT_LESSON_FAILURE
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('POST_LESSON_FAILURE', () => {
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
          type: ACTIONS.POST_LESSON_FAILURE
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })


    })

    describe('GET_MANY_LESSONS_FAILURE', () => {
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
          type: ACTIONS.GET_MANY_LESSONS_FAILURE
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })
    })

    describe('GET_LESSON_FAILURE', () => {
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
          type: ACTIONS.GET_LESSON_FAILURE
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
        const r = lessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })
    })
  })


  describe('...SUCCESS', () => {

    describe('PUT_LESSON_SUCCESS', () => {
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
          , isFetching: false
        }
        action = {
          type: ACTIONS.PUT_LESSON_SUCCESS
          , payload: {
            before: {}
            , after: {_id: '123'}
          }
        }
      })

      it('should modify lessonsById as expected', () => {
        const expectedState = {
          ...initialState
        }
        expectedState.lessonsById[action.payload.after._id] = action.payload.after
        const newState = lessonsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })

    })

    describe('GET_LESSON_SUCCESS', () => {
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
          , isFetching: false
        }
        action = {
          type: ACTIONS.GET_LESSON_SUCCESS
          , payload: {_id: '1', key: 'value'}
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        expectedState.lessonsById[action.payload._id] = action.payload
        const newState = lessonsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })

    })

    describe('POST_LESSON_SUCCESS', () => {
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
          , isFetching: false
        }
        action = {
          type: ACTIONS.POST_LESSON_SUCCESS
          , payload: {_id: '1', key: 'value'}
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        expectedState.lessonsById[action.payload._id] = action.payload
        const newState = lessonsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })

    })

    describe('GET_MANY_LESSONS_SUCCESS', () => {
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
          , isFetching: false
        }
        action = {
          type: ACTIONS.GET_MANY_LESSONS_SUCCESS
          , payload: [
            {_id: '1', key: 'value'}
            , {_id: '2', key: 'value'}
            , {_id: '3', key: 'value'}
          ]
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        action.payload.forEach(e => {
          expectedState.lessonsById[e._id] = e
        })
        const newState = lessonsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })


    })

    describe('DELETE_LESSON_SUCCESS', () => {
      let initialState, action, lessonId
      beforeEach(() => {
        lessonId = 'id1'
        initialState = {
          lessonsById: {
            [lessonId]: {
              key: 'value'
            }
            , shouldNotSurvive: {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
          , isFetching: false
        }
        action = {
          type: ACTIONS.DELETE_LESSON_SUCCESS
          , payload: {
            ok: 1
            , value: {_id: lessonId}
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        delete expectedState.lessonsById[lessonId]
        const newState = lessonsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })

      it('should not modify state at all if !ok', () => {
        action.payload.ok = 0
        const newState = lessonsReducer(initialState, action)
        expect(newState).toEqual(initialState)
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
        lessonsById: {}
      }
      const newState = lessonsReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })
  })

})