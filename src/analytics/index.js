const ReactGA = require('react-ga')

const options = {
  gaOptions: {}
}

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-120446838-4', options)
}


export default ReactGA
