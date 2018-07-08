/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { Component } from 'react'
import { trackPage } from '../analytics/utils'

export default function withTracker(WrappedComponent, options = {}) {
  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname
      trackPage(page, options)
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage, options)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}
