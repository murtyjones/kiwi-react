import 'babel-polyfill'
import 'raf/polyfill' // polyfill

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

window.addEventListener('error', function(e) {
  var errorText = [
    e.message,
    'URL: ' + e.filename,
    'Line: ' + e.lineno + ', Column: ' + e.colno,
    'Stack: ' + (e.error && e.error.stack || '(no stack trace)')
  ].join('\n');

  // Example: log errors as visual output into the host page.
  // Note: you probably don’t want to show such errors to users, or
  //       have the errors get indexed by Googlebot; however, it may
  //       be a useful feature while actively debugging the page.
  var DOM_ID = 'rendering-debug-pre';
  if (!document.getElementById(DOM_ID)) {
    var log = document.createElement('pre');
    log.id = DOM_ID;
    log.style.whiteSpace = 'pre-wrap';
    log.textContent = errorText;
    if (!document.body) document.body = document.createElement('body');
    document.body.insertBefore(log, document.body.firstChild);
  } else {
    document.getElementById(DOM_ID).textContent += '\n\n' + errorText;
  }

});