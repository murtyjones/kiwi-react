import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Route from 'react-router-dom/Route'
import Link from 'react-router-dom/Link'
import MemoryRouter from 'react-router-dom/MemoryRouter'

import { notCombined } from '../../../../src/reducers/index'
// make sure to import your connected component
import LoginOrRegister from '../../../../src/LoginOrRegister/LoginOrRegister'

import { setupIntegrationTest } from '../../../integrationSetup'

describe('integration tests', () => {
  let store
    , dispatchSpy
    , router
    , component

  beforeEach(() => {
    router = {}
    ;({store, dispatchSpy} = setupIntegrationTest(notCombined, router))

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
  })

  it('should start with the login text rendered since we specified /login', () => {
    expect(component.find('span[className="switchText"]').prop('children')).toEqual('No account? Click here to register!')
  })

  it('should change the login text to register on click', () => {
    expect(component.find('span[className="switchText"]').prop('children')).toEqual('No account? Click here to register!')
    component.find('span[className="switchText"]').simulate('click')
    expect(component.find('span[className="switchText"]').prop('children')).toEqual('Already registered? Click here to sign in!')
  })

  it('should click submit', () => {
    component.find('button[type="submit"]').simulate('click')
  })

})
