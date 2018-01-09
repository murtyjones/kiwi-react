import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { titleStyle, slideContent } from './commonSlideStyles'

const styles = {
  instructions: {
    overflow: 'hidden'
  }
}

class FullPageText extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
    , setToViewed: T.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.input.isViewed) {
      this.props.setToViewed()
    }
  }

  render() {
    const { slideData, className } = this.props
    return (
      <div className={ className }>
        <div style={ slideContent }>
          <div
            key='title'
            id='title'
            style={ titleStyle }
          >
            { slideData.title }
            </div>
          <div
            key='instructions'
            id='instructions'
            className='instructions'
            style={ styles.instructions }
            dangerouslySetInnerHTML={ { __html: slideData.instructions } }
          />
        </div>
      </div>
    )
  }
}

export default FullPageText