import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'

class ScrollRestoration extends Component {

  static propTypes = {
    children: T.any,
    location: T.any,
  }

  componentDidUpdate(prevProps) {
    if(this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollRestoration)
