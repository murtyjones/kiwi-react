import React, { PureComponent } from 'react'
import * as T from 'prop-types'

import './overrides.css'

const themeAssetLinks = {
  neighborhood: {
    topLeft: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1517197076/map-houses-top-left_tzjpd7.svg'
    , topRight: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1517197076/map-houses-top-right_xwqruk.svg'
    , pattern: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1517197222/map-houses-pattern_li95mt.svg'
  }
  , egypt: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1517605601/map-egypt-withtexture_oqyej9.svg'
  , moon: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1517197076/map-moon_bo03vn.svg'
}

const styles = {
  container: {
    width: '100vw'
    , minWidth: '1024px'
    , position: 'absolute'
    , overflow: 'scroll'
    // , minHeight: '2500px'
  },
  layer1: {
    width: '100%',
    height: '400px',
  },
  neighborhood: {
    background: {
      backgroundColor: '#A5CC83'
      , width: '100%'
      , display: 'table'
      , paddingBottom: '150px'
      , position: 'relative'
      , background: `#A5CC83 url('http://res.cloudinary.com/kiwi-stage/image/upload/v1515428912/map-houses-pattern_kq8obi.svg')`
      , backgroundSize: '3vw'
    }
    , topLeft: {
      marginRight: '-17%'
      , width: '77%'
      , left: 0
      , float: 'left'
      , position: 'relative'
      , zIndex: 2
    }
    , topRight: {
      marginLeft: '5%'
      , width: '35%'
      , right: 0
      , float: 'left'
      , position: 'relative'
      , zIndex: 2
    }
  },
  egypt: {
    background: {
      position: 'relative'
      , width: '100%'
      , display: 'table'
      , paddingBottom: '150px'
      , zIndex: 1
    }
    , mainAsset: {
      width: '100%'
      , left: 0
      , float: 'left'
      , display: 'inline'
      , position: 'relative'
      , zIndex: -9
    }
  },
  moon: {
    background: {
      position: 'relative'
      , width: '100%'
      , display: 'table'
      , paddingBottom: '150px'
      , zIndex: 1
    },
    mainAsset: {
      width: '100%'
      , left: 0
      , float: 'left'
      , display: 'inline'
      , position: 'relative'
      , zIndex: -9
    }
  }
}

class LessonMapBackground extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {

  }

  render() {
    return (
      <div style={ styles.container }>
        <div key='neighborhood' style={ styles.neighborhood.background }>
          <img
            key='neighborhood-top-left'
            src={ themeAssetLinks.neighborhood.topLeft }
            style={ styles.neighborhood.topLeft }
          />
          <img
            key='neighborhood-top-right'
            src={ themeAssetLinks.neighborhood.topRight }
            style={ styles.neighborhood.topRight }
          />
        </div>
        <div key='egypt' className='egypt' style={ styles.egypt.background }>
          <img
            key='egypt-top-left'
            src={ themeAssetLinks.egypt }
            style={ styles.egypt.mainAsset }
          />
        </div>
        <div key='moon' className='moon' style={ styles.moon.background }>
          <img
            key='egypt-top-left'
            src={ themeAssetLinks.moon }
            style={ styles.moon.mainAsset }
          />
        </div>
      </div>
    )
  }

}

export default LessonMapBackground