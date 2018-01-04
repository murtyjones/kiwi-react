import React, { PureComponent } from 'react'
import * as T from 'prop-types'

const themeAssetLinks = {
  neighborhood: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1514922216/map-houses-minified_iaf86n.svg'
  , egypt: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1514912906/map-egypt-optimized_qrnphc.svg'
}

const styles = {
  container: {
    width: '100vw'
    , minWidth: '1024px'
    , position: 'absolute'
    , overflow: 'scroll'
  },
  layer1: {
    width: '100%',
    height: '400px',
  },
  egypt: {
    position: 'relative'
    , marginTop: '-350px'
  }
}

class LessonMapBackground extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    sideNavWidth: T.number.isRequired
  }

  render() {
    return (
      <div style={ { ...styles.container, left: `${-this.props.sideNavWidth}px` } }>
        <img src={ themeAssetLinks.neighborhood } />
        <img src={ themeAssetLinks.egypt } style={ styles.egypt } />
      </div>
    )
  }

}

export default LessonMapBackground