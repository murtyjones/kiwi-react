import React, { Component } from 'react'
import * as T from 'prop-types'
import { titleStyle, slideContent } from './commonSlideStyles'

class FullPageText extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
    , setToViewed: T.func.isRequired
  }

  componentWillMount() {
    this.props.setToViewed()
  }

  render() {
    const { slideData, className } = this.props
    return (
      <div className={ className }>
        <div style={ slideContent }>
          <div style={ titleStyle }>{ slideData.title }</div>
          <div
            className='instructions'
            style={{overflow: 'hidden'}}
            dangerouslySetInnerHTML={ { __html: slideData.instructions } }
          />
        </div>
      </div>
    )
  }
}

export default FullPageText