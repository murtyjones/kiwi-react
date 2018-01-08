import sideNavReducer from '../../../../src/reducers/SideNav'
import { ACTIONS } from '../../../../src/constants'


describe('SideNav Reducer', () => {

  describe('OPEN_SIDENAV', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {}
      action = {
        type: ACTIONS.OPEN_SIDENAV
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        isSideNavOpen: true
        , sideNavWidth: 256
      }
      const r = sideNavReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })

  describe('CLOSE_SIDENAV', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {}
      action = {
        type: ACTIONS.CLOSE_SIDENAV
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        isSideNavOpen: false
        , sideNavWidth: 0
      }
      const r = sideNavReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })

})