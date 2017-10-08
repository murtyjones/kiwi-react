import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { AppContainer } from 'react-hot-loader'
import { applyMiddleware, createStore, compose } from 'redux'

import './Polyfills'
import App from './App'
import reducer from './reducers/index'
import { setStoreForFetch } from './utils/ApiFetch'

// devtools!
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunk]
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middleware)))

setStoreForFetch(store) // needed for better fetch w/ state access

ReactDOM.render(
  <AppContainer>
    <App store={ store } />
  </AppContainer>,
  document.getElementById('app')
)

// Hot Module Replacement API
if(module.hot) {

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
