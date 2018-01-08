import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import '../../../__mocks__/config'
import config from 'config'
import { ACTIONS } from '../../../../src/constants'
import { openSideNav, closeSideNav } from '../../../../src/actions/SideNav'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('SideNav Themes Actions', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  describe('openSideNav', () => {
    it('should dispatch one action with expected args', async () => {
      await store.dispatch(openSideNav())
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.OPEN_SIDENAV })

    })
  })

  describe('closeSideNav', () => {
    it('should dispatch one action with expected args', async () => {
      await store.dispatch(closeSideNav())
      const actions = store.getActions()
      expect(actions.length).toEqual(1)
      expect(actions[0]).toEqual({ type: ACTIONS.CLOSE_SIDENAV })

    })
  })

})