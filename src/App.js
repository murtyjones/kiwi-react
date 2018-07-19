import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { Provider } from 'react-redux'
import Router from 'react-router-dom/BrowserRouter'
import GoogleTagManager from './analytics/GoogleTagManager'
import 'babel-polyfill'
import 'raf/polyfill' // polyfill
import WebFont from 'webfontloader'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import LegacyMuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// hover.css library
import './hover.css'

// animate.css library
import './animate.css'

// animate.css transition stuff
import './animate-transitions.css'

// general css stuff to be reused
import './general.css'
import './modals.css'
import './spinner.css'
import './common/form/styles.css'

import Root from './Root'

WebFont.load({
  google: {
    families: ['Arvo', 'Roboto', 'Gaegu']
  }
})

const mainColor = '#513d80'

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize'
      },
      outlined: {
        border: '1px solid #765C9F !important',
        color: '#765C9F',
        '&:hover': {
          color: '#FFF',
          backgroundColor: mainColor
        },
        '&$disabled': {
          border: '1px solid rgba(0, 0, 0, 0.26) !important'
        },
      },
      flat: {
        border: 'none',
        color: '#765C9F',
        '&:hover': {
          color: '#000',
          backgroundColor: 'rbga(118, 92, 159, 0.1)',
          opacity: 0.3
        }
      }
    }
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
      <Fragment>
        <GoogleTagManager gtmId='GTM-TJPSGHC' />
        <LegacyMuiThemeProvider muiTheme={  getMuiTheme() }>
          <MuiThemeProvider theme={ theme }>
            <Provider store={ store }>
              <Router onUpdate={ () => window.scrollTo(0, 0) }>
                <Root store={ store } />
              </Router>
            </Provider>
          </MuiThemeProvider>
        </LegacyMuiThemeProvider>
      </Fragment>
    )
  }
}

export default App
