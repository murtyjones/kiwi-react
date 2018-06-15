const ReactGA = require('react-ga')

const options = {
  gaOptions: {}
}

// if (process.env.NODE_ENV !== 'production') {
  options.debug = true
  options.gaOptions.cookieDomain = 'none'
// }

ReactGA.initialize('UA-120446838-1', options)

export default ReactGA
