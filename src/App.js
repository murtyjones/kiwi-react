import React, { Component } from 'react'
import * as T from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'babel-polyfill'
import 'raf/polyfill' // polyfill
import WebFont from 'webfontloader'

import Routes from './Routes'

WebFont.load({
  google: {
    families: ['Arvo', 'Roboto']
  }
})

class App extends Component {

  static propTypes = {
    store: T.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.props
    return (
      <Provider store={ store }>
        <Router onUpdate={ () => window.scrollTo(0, 0) }>
          <Routes store={ store } />
        </Router>
      </Provider>
    )
  }
}

export default App
