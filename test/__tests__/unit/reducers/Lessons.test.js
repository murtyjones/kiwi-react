import lessonsReducer from '../../../../src/reducers/Lessons'
import { ACTIONS } from '../../../../src/constants'


describe('Lessons Reducer', () => {
  describe('PUT_LESSON_SUCCESS', () => {
    it('should return expected result', () => {
      const initialState = {
        lessonsById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , shouldAlsoSurvive: {
          key: 'value'
        }
      }
      const action = {
        type: ACTIONS.PUT_LESSON_SUCCESS
        , payload: {
          before: {}
          , after: { _id: '123' }
        }
      }
      const expected = {
        lessonsById: {
          ...initialState.lessonsById
          , [action.payload.after._id]: action.payload.after
        }
        , shouldAlsoSurvive: initialState.shouldAlsoSurvive
      }
      const r = lessonsReducer(initialState, action)
      expect(r).toEqual(expected)
    })


  })
})