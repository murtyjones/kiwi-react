import React, { Component } from 'react'
import * as T from 'prop-types'

class FullPageText extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
  }

  render() {
    const { slideData } = this.props
    return (
      <div dangerouslySetInnerHTML={ { __html: slideData.instructions } } />
    )
  }
}

export default FullPageText