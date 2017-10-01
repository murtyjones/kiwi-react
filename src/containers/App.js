import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'
import ScrollRestoration from '../components/ScrollRestoration'

class App extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={ store }>
        <Router>
          <ScrollRestoration>
            <Routes store={ store } />
          </ScrollRestoration>
        </Router>
      </Provider>
    );
  }
}

export default App
