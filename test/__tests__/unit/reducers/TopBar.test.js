import topBarReducer from '../../../../src/reducers/TopBar'
import { ACTIONS } from '../../../../src/constants'


describe('TopBar Reducer', () => {

  describe('OPEN_TOPBAR', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.OPEN_TOPBAR
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        ...initialState
        , isTopBarOpen: true
        , topBarHeight: 60
      }
      const r = topBarReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })

  })

  describe('CLOSE_TOPBAR', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.CLOSE_TOPBAR
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        ...initialState
        , isTopBarOpen: false
        , topBarHeight: 0
      }
      const r = topBarReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })

  describe('SET_TOPBAR_TITLE', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.SET_TOPBAR_TITLE
        , payload: 'newTitle'
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        ...initialState
        , topBarTitle: action.payload
      }
      const r = topBarReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })

  describe('TOGGLE_TOPBAR_TITLE_EDITABLE', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.TOGGLE_TOPBAR_TITLE_EDITABLE
        , payload: true
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        ...initialState
        , topBarTitleDisabled: action.payload
      }
      const r = topBarReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })

  })

  describe('TOGGLE_TOPBAR_TITLE_FOCUS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        otherStuff: 'blah'
      }
      action = {
        type: ACTIONS.TOGGLE_TOPBAR_TITLE_FOCUS
        , payload: true
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        ...initialState
        , topBarFocused: action.payload
      }
      const r = topBarReducer(initialState, action)
      expect(r).toEqual(expectedState)
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
        isTopBarOpen: true,
        topBarHeight: 60,
        topBarTitle: '',
        topBarTitleDisabled: true,
        topBarFocused: false
      }
      const r = topBarReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })


})