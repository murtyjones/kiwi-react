import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import { titleStyle, slideContent } from './commonSlideStyles'

const styles = {
  container: {
    width: '600px'
    , height: '600px'
    , position: 'absolute'
    , top: '50%'
    , left: '50%'
    , marginLeft: '-300px'
    , marginTop: '-300px'
  },
  title: {
    textAlign: 'center'

  },
  subtitle: {
    textAlign: 'center'

  },
  description: {
    textAlign: 'center'

  },
  iconContainer: {
    textAlign: 'center'
  },
  icon: {
    height: '50px'
    , width: '50px'
  }
}

class Title extends PureComponent {
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
      <div className={ className } style={ styles.container }>
        <div style={ slideContent }>
          <div
            key='icon'
            id='icon'
            style={ styles.iconContainer }
          >
            <img src={ slideData.iconUrl } style={ styles.icon }/>
          </div>
          <div
            key='title'
            id='title'
            style={ styles.title }
          >
            { slideData.title }
          </div>
          <div
            key='subtitle'
            id='subtitle'
            style={ styles.subtitle }
          >
            { slideData.subtitle }
          </div>
          <div
            key='description'
            id='description'
            style={ styles.description }
          >
            { slideData.description }
          </div>
        </div>
      </div>
    )
  }
}

export default Title