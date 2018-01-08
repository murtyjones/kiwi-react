import React, { PureComponent } from 'react'
import * as T from 'prop-types'

import './overrides.css'

const themeAssetLinks = {
  neighborhood: {
    topLeft: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1515429030/map-houses-top-left_sfahix.svg'
    , topRight: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1515428912/map-houses-top-right_wqhkkn.svg'
    , pattern: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1515428912/map-houses-pattern_kq8obi.svg'
  }
  , egypt: 'http://res.cloudinary.com/kiwi-stage/image/upload/v1514912906/map-egypt-optimized_qrnphc.svg'
}

const styles = {
  container: {
    width: '100vw'
    , minWidth: '1024px'
    , position: 'absolute'
    , overflow: 'scroll'
    , minHeight: '2500px'
  },
  layer1: {
    width: '100%',
    height: '400px',
  },
  egypt: {
    background: {
      position: 'relative'
      , marginTop: '-300px'
      , width: '100%'
      , display: 'table'
      , paddingBottom: '150px'
      , zIndex: 1
    }
    // , assets: {
    //   display: 'table-row'
    //   , width: '100%'
    // }
    , mainAsset: {
      width: '100%'
      , left: 0
      , float: 'left'
      , display: 'inline'
      , position: 'relative'
      , zIndex: -9
    }
  },
  neighborhood: {
    background: {
      backgroundColor: '#A5CC83'
      , width: '100%'
      , display: 'table'
      , paddingBottom: '150px'
      , position: 'relative'
      //, zIndex: -200
    }
    // , assets: {
    //   display: 'table-row'
    //   , width: '100%'
    // }
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
        <div key='neighborhood' style={ styles.neighborhood.background }>
          {/*<div key='neighborhood-row'>*/}
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
          {/*</div>*/}
        </div>
        <div key='egypt' style={ styles.egypt.background }>
          {/*<div key='egypt-row'>*/}
            <img
              key='egypt-top-left'
              src={ themeAssetLinks.egypt }
              style={ styles.egypt.mainAsset }
          />
          {/*</div>*/}
        </div>
      </div>
    )
  }

}

export default LessonMapBackground