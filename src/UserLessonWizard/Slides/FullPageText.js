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

  componentDidMount() {
    this.props.setToViewed()
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.input.isViewed) {
      nextProps.setToViewed()
    }
  }

  render() {
    const { slideData, className } = this.props
    return (
      <div style={ slideContent } className={ className }>
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
    )
  }
}

export default FullPageText