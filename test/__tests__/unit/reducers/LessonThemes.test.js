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
      const expectedState = {
        ...initialState
      }
      expectedState.lessonThemesById[action.payload.after._id] = action.payload.after
      const newState = lessonThemesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
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
      const expectedState = {
        ...initialState
      }
      expectedState.lessonThemesById[action.payload._id] = action.payload
      const newState = lessonThemesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
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
      const expectedState = {
        ...initialState
      }
      expectedState.lessonThemesById[action.payload._id] = action.payload
      const newState = lessonThemesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
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
      const expectedState = {
        ...initialState
      }
      action.payload.forEach(e => { expectedState.lessonThemesById[e._id] = e })
      const newState = lessonThemesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
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

    it('should modify state as expected if ok returned', () => {
      const expectedState = {
        ...initialState
      }
      delete expectedState.lessonThemesById[lessonId]
      const newState = lessonThemesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })

    it('should not modify lessonThemesById at all if !ok', () => {
      action.payload.ok = 0
      const expectedState = {
        ...initialState
      }
      const newState = lessonThemesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
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
        lessonThemesById: {}
      }
      const newState = lessonThemesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })
  })

})