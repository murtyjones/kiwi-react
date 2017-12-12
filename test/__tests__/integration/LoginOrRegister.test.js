import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Route, Link, MemoryRouter } from 'react-router-dom'

import { notCombined } from '../../../src/reducers/index'
// make sure to import your connected component
import LoginOrRegister from '../../../src/LoginOrRegister/LoginOrRegister'
import { setupIntegrationTest } from '../../intSetup'

describe('integration tests', () => {
  let store
    , dispatchSpy
    , router
    , component

  beforeEach(() => {
    router = {};
    ({store, dispatchSpy} = setupIntegrationTest(notCombined, router));

    component = mount(
      <MemoryRouter initialEntries={[ '/login' ]}>
        <Provider store={ store }>
          <LoginOrRegister />
        </Provider>
      </MemoryRouter>
      , {
        context: {
          muiTheme: getMuiTheme()
        },
        childContextTypes: {
          muiTheme: PropTypes.object.isRequired
        }
      })
  });

  it('should change the login text to register on click', () => {
    expect(component.find('span').prop('children')).toEqual('No account? Register here!');
    component.find('span').simulate('click');
    expect(component.find('span').prop('children')).toEqual('Already registered? Sign in here!');
  });

})