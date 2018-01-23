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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(true)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(true)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(true)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(true)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.PUT_USER_LESSON_SUCCESS
          , payload: {
            before: {}
            , after: {_id: '123'}
          }
        }
      })

      it('should modify userLessonsById as expected', () => {
        const expectedUserLessonsById = {
          ...initialState.userLessonsById
          , [action.payload.after._id]: action.payload.after
        }
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsById).toEqual(expectedUserLessonsById)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
          , otherStuff: {
            key: 'value'
          }
        }
        action = {
          type: ACTIONS.GET_USER_LESSON_SUCCESS
          , payload: {_id: '1', lessonId: 'a'}
        }
      })

      it('should modify userLessonsById as expected', () => {
        const expectedUserLessonsById = {
          ...initialState.userLessonsById
          , [action.payload._id]: action.payload
        }
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsById).toEqual(expectedUserLessonsById)
      })

      it('should modify userLessonsByLessonId as expected', () => {
        const expectedUserLessonsByLessonId = {
          ...initialState.userLessonsByLessonId
          , [action.payload.lessonId]: action.payload
        }
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsByLessonId).toEqual(expectedUserLessonsByLessonId)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
          , payload: {_id: '1', lessonId: 'a'}
        }
      })

      it('should modify userLessonsById as expected', () => {
        const expectedUserLessonsById = {
          ...initialState.userLessonsById
          , [action.payload._id]: action.payload
        }
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsById).toEqual(expectedUserLessonsById)
      })

      it('should modify userLessonsByLessonId as expected', () => {
        const expectedUserLessonsByLessonId = {
          ...initialState.userLessonsByLessonId
          , [action.payload.lessonId]: action.payload
        }
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsByLessonId).toEqual(expectedUserLessonsByLessonId)
      })

      it('should modify userLessonsById as expected', () => {
        const expectedUserLessonsById = {
          ...initialState.userLessonsById
          , [action.payload._id]: action.payload
        }
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsById).toEqual(expectedUserLessonsById)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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

      it('should modify userLessonsById as expected', () => {
        const expectedUserLessonsById = {
          ...initialState.userLessonsById
        }
        action.payload.forEach(e => {
          expectedUserLessonsById[e._id] = e
        })
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsById).toEqual(expectedUserLessonsById)
      })

      it('should modify userLessonsByLessonId as expected', () => {
        const expectedUserLessonsByLessonId = {
          ...initialState.userLessonsByLessonId
        }
        action.payload.forEach(e => {
          expectedUserLessonsByLessonId[e.lessonId] = e
        })
        const r = userLessonsReducer(initialState, action)
        expect(r.userLessonsByLessonId).toEqual(expectedUserLessonsByLessonId)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(false)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(false)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(false)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
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
        const r = userLessonsReducer(initialState, action)
        expect(r.isFetching).toEqual(false)
      })

      it('should not modify the rest of state', () => {
        const r = userLessonsReducer(initialState, action)
        expect(r.otherStuff).toEqual(initialState.otherStuff)
      })
    })
  })


})