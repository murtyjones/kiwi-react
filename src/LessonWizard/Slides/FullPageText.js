import React, { Component } from 'react'
import * as T from 'prop-types'

class FullPageText extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
  }

  render() {
    const { slideData, className } = this.props
    return (
      <div
        className={ className }
        dangerouslySetInnerHTML={ { __html: slideData.instructions } }
      />
    )
  }
}

export default FullPageText