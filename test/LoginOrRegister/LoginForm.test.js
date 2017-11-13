jest.mock('react-router-dom', () => {
  return {
    Link: (props) => <a>{props.children}</a>
  }
})



import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import localStorageMock from '../__mocks__/localStorage'
import '../__mocks__/reduxForm'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import LoginFormComponent from '../../src/LoginOrRegister/LoginForm'

window.localStorage = localStorageMock


test('UserProjectCard should render', () => {
  const wrapper = mount(
    <LoginFormComponent
      project={{}}
    />
    , {
      context: {
        muiTheme: getMuiTheme()
      },
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired
      }
    })
  expect(wrapper).not.toBeFalsy()
})
