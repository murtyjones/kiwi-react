import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { explanationStyle, slideContent } from './commonSlideStyles'

const styles = {
  example: {
    overflow: 'hidden'
  },
  explanationStyle: {

  }
}

class FullPageCodeExample extends PureComponent {
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
      <div className={ className }>
        <div style={ slideContent }>
          <div
            key='explanation'
            id='explanation'
            style={ styles.explanationStyle }
          >
            { slideData.title }
          </div>
          <div
            key='example'
            id='example'
            className='example'
            style={ styles.example }
            dangerouslySetInnerHTML={ { __html: slideData.example } }
          />
        </div>
      </div>
    )
  }
}

export default FullPageCodeExample