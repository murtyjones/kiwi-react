import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { openTopBar, closeTopBar, setTopBarTitle, toggleTopBarTitleFocus, toggleTopBarTitleIsDisabled } from '../../../../src/actions/TopBar'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('TopBar Themes Actions', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  describe('openTopBar', () => {
    it('should dispatch one action with expected args', async () => {
      await store.dispatch(openTopBar())
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.OPEN_TOP_BAR })

    })
  })

  describe('closeTopBar', () => {
    it('should dispatch one action with expected args', async () => {
      await store.dispatch(closeTopBar())
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.CLOSE_TOP_BAR })

    })
  })

  describe('setTopBarTitle', () => {
    it('should dispatch one action with expected args', async () => {
      let title = 'blah'
      await store.dispatch(setTopBarTitle(title))
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.SET_TOP_BAR_TITLE, payload: title })

    })
  })

  describe('toggleTopBarTitleFocus', () => {
    it('should dispatch one action with expected args', async () => {
      let isFocused = false
      await store.dispatch(toggleTopBarTitleFocus(isFocused))
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.TOGGLE_TOP_BAR_TITLE_FOCUS, payload: isFocused })

    })
  })

  describe('toggleTopBarTitleIsDisabled', () => {
    it('should dispatch one action with expected args', async () => {
      let isFocused = false
      await store.dispatch(toggleTopBarTitleIsDisabled(isFocused))
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.TOGGLE_TOP_BAR_TITLE_EDITABLE, payload: isFocused })

    })
  })

})