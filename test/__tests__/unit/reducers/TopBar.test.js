import topBarReducer from '../../../../src/reducers/TopBar'
import { ACTIONS } from '../../../../src/constants'


describe('Lessons Reducer', () => {

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

    it('should modify the expected properties of state as expected', () => {
      const expectedIsTopBarOpen = true
      const expectedTopBarHeight = 60
      const r = topBarReducer(initialState, action)
      expect(r.isTopBarOpen).toEqual(expectedIsTopBarOpen)
      expect(r.topBarHeight).toEqual(expectedTopBarHeight)
    })

    it('should not modify the rest of state', () => {
      const r = topBarReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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

    it('should modify the expected properties of state as expected', () => {
      const expectedIsTopBarOpen = false
      const expectedTopBarHeight = 0
      const r = topBarReducer(initialState, action)
      expect(r.isTopBarOpen).toEqual(expectedIsTopBarOpen)
      expect(r.topBarHeight).toEqual(expectedTopBarHeight)
    })

    it('should not modify the rest of state', () => {
      const r = topBarReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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

    it('should modify the expected properties of state as expected', () => {
      const r = topBarReducer(initialState, action)
      expect(r.topBarTitle).toEqual(action.payload)
    })

    it('should not modify the rest of state', () => {
      const r = topBarReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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

    it('should modify the expected properties of state as expected', () => {
      const r = topBarReducer(initialState, action)
      expect(r.topBarTitleDisabled).toEqual(action.payload)
    })

    it('should not modify the rest of state', () => {
      const r = topBarReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
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

    it('should modify the expected properties of state as expected', () => {
      const r = topBarReducer(initialState, action)
      expect(r.topBarFocused).toEqual(action.payload)
    })

    it('should not modify the rest of state', () => {
      const r = topBarReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })
  })


})