import lessonThemesReducer from '../../../../src/reducers/LessonThemes'
import { ACTIONS } from '../../../../src/constants'


describe('Lesson Themes Reducer', () => {
  describe('PUT_LESSON_THEME_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        lessonThemesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.PUT_LESSON_THEME_SUCCESS
        , payload: {
          before: {}
          , after: { _id: '123' }
        }
      }
    })

    it('should modify lessonThemesById as expected', () => {
      const expectedLessonThemesById = {
        ...initialState.lessonThemesById
        , [action.payload.after._id]: action.payload.after
      }
      const r = lessonThemesReducer(initialState, action)
      expect(r.lessonThemesById).toEqual(expectedLessonThemesById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonThemesReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })
  })

  describe('GET_LESSON_THEME_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        lessonThemesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.GET_LESSON_THEME_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify lessonThemesById as expected', () => {
      const expectedLessonThemesById = {
        ...initialState.lessonThemesById
        , [action.payload._id]: action.payload
      }
      const r = lessonThemesReducer(initialState, action)
      expect(r.lessonThemesById).toEqual(expectedLessonThemesById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonThemesReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })

  })

  describe('POST_LESSON_THEME_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        lessonThemesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.POST_LESSON_THEME_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify lessonThemesById as expected', () => {
      const expectedLessonThemesById = {
        ...initialState.lessonThemesById
        , [action.payload._id]: action.payload
      }
      const r = lessonThemesReducer(initialState, action)
      expect(r.lessonThemesById).toEqual(expectedLessonThemesById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonThemesReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })

  })

  describe('GET_MANY_LESSON_THEMES_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        lessonThemesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.GET_MANY_LESSON_THEMES_SUCCESS
        , payload: [
          { _id: '1', key: 'value' }
          , { _id: '2', key: 'value' }
          , { _id: '3', key: 'value' }
        ]
      }
    })

    it('should modify lessonThemesById as expected', () => {
      const expectedLessonThemesById = {
        ...initialState.lessonThemesById
      }
      action.payload.forEach(e => { expectedLessonThemesById[e._id] = e })
      const r = lessonThemesReducer(initialState, action)
      expect(r.lessonThemesById).toEqual(expectedLessonThemesById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonThemesReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })


  })

  describe('DELETE_LESSON_THEME_SUCCESS', () => {
    let initialState, action, lessonId
    beforeEach(() => {
      lessonId = 'id1'
      initialState = {
        lessonThemesById: {
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
        type: ACTIONS.DELETE_LESSON_THEME_SUCCESS
        , payload: {
          ok: 1
          , value: { _id: lessonId }
        }
      }
    })

    it('should modify lessonThemesById as expected if ok returned', () => {
      const expectedLessonThemesById = {
        ...initialState.lessonThemesById
      }
      delete expectedLessonThemesById[lessonId]
      const r = lessonThemesReducer(initialState, action)
      expect(r.lessonThemesById).toEqual(expectedLessonThemesById)
    })

    it('should not modify lessonThemesById at all if !ok', () => {
      action.payload.ok = 0
      const expectedLessonThemesById = {
        ...initialState.lessonThemesById
      }
      const r = lessonThemesReducer(initialState, action)
      expect(r.lessonThemesById).toEqual(expectedLessonThemesById)
    })

    it('should not modify the rest of state', () => {
      const r = lessonThemesReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })


  })

})