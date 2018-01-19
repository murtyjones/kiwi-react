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
  selectedImagesContainer: {
    position: 'absolute'
    , height: '100px'
    , width: '520px'
    , top: '50%'
    , left: '50%'
    , marginTop: '-350px'
    , marginLeft: '-260px'
  },
  imageContainer: {
    position: 'absolute'
    , width: '510px'
    , top: '50%'
    , left: '50%'
    , marginTop: '-250px'
    , marginLeft: '-255px'
  },
  image: {
    width: '90px'
    , padding: '30px'
    , backgroundColor: '#FFFFFF'
    , margin: '10px'
    , borderRadius: '5px'
    , cursor: 'pointer'
  },
  imageSelected: {
    height: '60px'
    , margin: '5px 10.7%'
  },
  imageRow: {
    width: '100%'
    , height: '70px'
    , backgroundColor: '#FFF'
    , borderRadius: '5px'
    , marginTop: '10px'
  },
  attribution: {
    fontSize: '11px'
    , color: '#000000'
    , textAlign: 'center'
  }
}

const makeRef = (baseRef, n) => `${baseRef}.1`


export default class RecoveryImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image1: ''
      , image2: ''
      , image3: ''
    }
  }

  saveImageChoice = (name) => {
    const { image1, image2 } = this.state
    const indexToSaveAt = image2 ? 2 : image1 ? 1 : 0
    this.setState({
        [`image${indexToSaveAt+1}`]: name
      }, () => {
      this.props.fields.insert(indexToSaveAt, name)
    })
  }

  renderImageSelection = (images) =>
    <div style={ styles.imageRow }>
      { images.map(image =>
        image
          ?
            <img
              key={ image }
              style={ styles.imageSelected }
              src={ `${recoveryUri}/${image}.svg` }
            />
          : null
      ) }
    </div>

  render() {
    const { image1, image2, image3 } = this.state
    return [
      <div key='selected-images' style={ styles.selectedImagesContainer }>
        { this.renderImageSelection([image1, image2, image3]) }
      </div>
      ,
      <div key='image-options' style={ styles.imageContainer }>
        { images.map((name, i) =>
          <img
            key={ i }
            style={ styles.image }
            src={ `${recoveryUri}/${name}.svg` }
            onClick={ () => this.saveImageChoice(name) }
          />
        ) }
        <div style={ styles.attribution }>
          Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
      </div>
    ]
  }
}