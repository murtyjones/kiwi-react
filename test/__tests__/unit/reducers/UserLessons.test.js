import userLessonsReducer from '../../../../src/reducers/UserLessons'
import { ACTIONS } from '../../../../src/constants'


describe('UserLessons Reducer', () => {

  describe('...REQUEST', () => {
    describe('PUT_USER_LESSON_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.PUT_USER_LESSON_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('POST_USER_LESSON_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.POST_USER_LESSON_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_MANY_USER_LESSONS_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_USER_LESSON_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_USER_LESSON_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })
  })


  describe('...SUCCESS', () => {
    describe('PUT_USER_LESSON_SUCCESS', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , userLessonsByLessonId: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.PUT_USER_LESSON_SUCCESS
          , payload: {
            before: {}
            , after: { _id: '123', lessonId: 'abc' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        expectedState.userLessonsById[action.payload.after._id] = action.payload.after
        expectedState.userLessonsByLessonId[action.payload.after.lessonId] = action.payload.after
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_USER_LESSON_SUCCESS', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , userLessonsByLessonId: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_USER_LESSON_SUCCESS
          , payload: {_id: '1', lessonId: 'a'}
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        expectedState.userLessonsById[action.payload._id] = action.payload
        expectedState.userLessonsByLessonId[action.payload.lessonId] = action.payload
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('POST_USER_LESSON_SUCCESS', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , userLessonsByLessonId: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.POST_USER_LESSON_SUCCESS
          , payload: {_id: '123', lessonId: 'abc'}
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        expectedState.userLessonsById[action.payload._id] = action.payload
        expectedState.userLessonsByLessonId[action.payload.lessonId] = action.payload
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_MANY_USER_LESSONS_SUCCESS', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , userLessonsByLessonId: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS
          , payload: [
            {_id: '1', lessonId: 'a'}
            , {_id: '2', lessonId: 'b'}
            , {_id: '3', lessonId: 'c'}
          ]
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        action.payload.forEach(e => {
          expectedState.userLessonsById[e._id] = e
          expectedState.userLessonsByLessonId[e.lessonId] = e
        })
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })
  })


  describe('...FAILURE', () => {
    describe('PUT_USER_LESSON_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.PUT_USER_LESSON_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('POST_USER_LESSON_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.POST_USER_LESSON_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_MANY_USER_LESSONS_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_MANY_USER_LESSONS_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const r = userLessonsReducer(initialState, action)
        expect(r).toEqual(expectedState)
      })

    })

    describe('GET_USER_LESSON_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          userLessonsById: {
            'shouldSurvive': {
              key: 'value'
            }
          }
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_USER_LESSON_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify isFetching as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const r = userLessonsReducer(initialState, action)
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
        userLessonsById: {},
        userLessonsByLessonId: {},
        isFetching: false
      }
      const r = userLessonsReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })


})