import lessonsReducer from '../../../../src/reducers/Lessons'
import { ACTIONS } from '../../../../src/constants'


describe('Lessons Reducer', () => {
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
      }
      action = {
        type: ACTIONS.PUT_LESSON_SUCCESS
        , payload: {
          before: {}
          , after: { _id: '123' }
        }
      }
    })

    it('should modify lessonsById as expected', () => {
      const expectedLessonsById = {
        ...initialState.lessonsById
        , [action.payload.after._id]: action.payload.after
      }
      const r = lessonsReducer(initialState, action)
      expect(r.lessonsById).toEqual(expectedLessonsById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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
      }
      action = {
        type: ACTIONS.GET_LESSON_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify lessonsById as expected', () => {
      const expectedLessonsById = {
        ...initialState.lessonsById
        , [action.payload._id]: action.payload
      }
      const r = lessonsReducer(initialState, action)
      expect(r.lessonsById).toEqual(expectedLessonsById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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
      }
      action = {
        type: ACTIONS.POST_LESSON_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify lessonsById as expected', () => {
      const expectedLessonsById = {
        ...initialState.lessonsById
        , [action.payload._id]: action.payload
      }
      const r = lessonsReducer(initialState, action)
      expect(r.lessonsById).toEqual(expectedLessonsById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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
      }
      action = {
        type: ACTIONS.GET_MANY_LESSONS_SUCCESS
        , payload: [
          { _id: '1', key: 'value' }
          , { _id: '2', key: 'value' }
          , { _id: '3', key: 'value' }
        ]
      }
    })

    it('should modify lessonsById as expected', () => {
      const expectedLessonsById = {
        ...initialState.lessonsById
      }
      action.payload.forEach(e => { expectedLessonsById[e._id] = e })
      const r = lessonsReducer(initialState, action)
      expect(r.lessonsById).toEqual(expectedLessonsById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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
      }
      action = {
        type: ACTIONS.DELETE_LESSON_SUCCESS
        , payload: {
          ok: 1
          , value: { _id: lessonId }
        }
      }
    })

    it('should modify lessonsById as expected if ok returned', () => {
      const expectedLessonsById = {
        ...initialState.lessonsById
      }
      delete expectedLessonsById[lessonId]
      const r = lessonsReducer(initialState, action)
      expect(r.lessonsById).toEqual(expectedLessonsById)
    })

    it('should not modify lessonsById at all if !ok', () => {
      action.payload.ok = 0
      const expectedLessonsById = {
        ...initialState.lessonsById
      }
      const r = lessonsReducer(initialState, action)
      expect(r.lessonsById).toEqual(expectedLessonsById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonsReducer(initialState, action)
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
        lessonsById: {}
      }
      const r = lessonsReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })

})