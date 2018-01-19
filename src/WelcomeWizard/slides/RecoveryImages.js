import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

const recoveryUri = '../assets/images/recovery'

const images = [
  'bull'
  , 'chick'
  , 'fox'
  , 'hippopotamus'
  , 'koala'
  , 'pig'
  , 'tiger'
  , 'whale'
  , 'zebra'
]

const styles = {
  imageContainer: {
    position: 'absolute'
    , height: '500px'
    , width: '520px'
    , top: '50%'
    , left: '50%'
    , marginTop: '-250px'
    , marginLeft: '-250px'
  },
  image: {
    width: '90px'
    , padding: '30px'
    , backgroundColor: '#FFFFFF'
    , margin: '10px'
    , borderRadius: '5px'
  },
  attribution: {
    fontSize: '11px'
    , textAlign: 'center'
  }
}

export default class RecoveryImages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('rendered')
    return (
      <div style={ styles.imageContainer }>
        { images.map((uri, i) =>
          <img
            key={ i }
            style={ styles.image }
            src={ `${recoveryUri}/${uri}.svg` }
          />
        ) }

        <div style={ styles.attribution }>
          Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
      </div>
    )
  }
}