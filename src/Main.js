import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import './Polyfills'
import App from './App'

import store from './Store'

ReactDOM.render(
  <AppContainer>
    <App store={ store } />
  </AppContainer>,
  document.getElementById('app')
)

// Hot Module Replacement API
if (module.hot) {

  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers').default
    store.replaceReducer(nextReducer)
  })

  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <AppContainer>
        <NextApp store={ store } />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
