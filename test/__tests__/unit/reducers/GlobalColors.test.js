import globalColorsReducer from '../../../../src/reducers/GlobalColors'
import { ACTIONS } from '../../../../src/constants'
import { GLOBAL_COLORS } from '../../../../src/constants'


describe('GlobalColors Reducer', () => {

  describe('SET_GLOBAL_COLORS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.SET_GLOBAL_COLORS
        , payload: null
      }
    })

    it('should have expected default state', () => {
      const expectedState = {
        ...initialState
      }
      const r = globalColorsReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })

    it('should change state as expected', () => {
      action.payload = { blah: 'blah' }
      const expectedState = {
        ...initialState
        , ...action.payload
      }
      const r = globalColorsReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })

  })

  describe('SIGNOUT_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.SIGNOUT_SUCCESS
        , payload: null
      }
    })

    it('should have expected default state', () => {
      const expectedState = {
        ...initialState
        , ...GLOBAL_COLORS.default
      }
      const r = globalColorsReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })

  })


})