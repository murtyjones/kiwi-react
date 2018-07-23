import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'

const recoveryUri = '../assets/images/recovery'

const images = [
  'bull'
  , 'chick'
  , 'crab'
  , 'fox'
  , 'hippopotamus'
  , 'koala'
  , 'pig'
  , 'tiger'
  , 'whale'
  , 'zebra'
]

const styles = {
  container: {
    position: 'absolute'
    , left: '50%'
    , width: '800px'
    , height: '100%'
    , marginLeft: '-400px'
  },
  selectedImagesContainer: {
    position: 'relative'
    , left: '50%'
    , height: '130px'
    , width: '50%'
    , marginLeft: '-25%'
  },
  imageContainer: {
    width: '100%'
  },
  image: {
    width: '80px'
    , padding: '30px'
    , backgroundColor: '#5d4692'
    , margin: '10px'
    , borderRadius: '5px'
    , cursor: 'pointer'
  },
  imageSelected: {
    display: 'inline-block'
    , height: '80px'
    , width: '80px'
    , margin: '10px 3%'
    , padding: '10px'
    , border: '1px solid #3E2E61'
    , borderRadius: '5px'
    , backgroundColor: '#FFFFFF'
    , backgroundRepeat: 'no-repeat'
    , backgroundPosition: '10px 10px'
    , backgroundSize: '80px 80px'
  },
  imageRow: {
    width: '100%'
    , height: '90px'
    , borderRadius: '5px'
    , margin: '10px 0'
  },
  attribution: {
    fontSize: '11px'
    , color: '#000000'
    , textAlign: '-webkit-center'
  },
  incorrectGuess: {
    textAlign: '-webkit-center'
    , color: '#ff8eca'
    , fontWeight: 'bold'
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

  static propTypes = {
    attemptsRemaining: T.number
    , guessFailed: T.bool
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
      { images.map((image, i) =>
        <div
          key={ i }
          style={ {
            ...styles.imageSelected
            , backgroundImage: image ? `url(${recoveryUri}/${image}.svg)` : ''
          } }
        />
      ) }
    </div>

  render() {
    const { image1, image2, image3 } = this.state
    const { attemptsRemaining, guessFailed } = this.props
      , guessOrGuesses = (guessFailed && attemptsRemaining === 1) ? 'guess' : 'guesses'
      , guessMessage = guessFailed
        ? attemptsRemaining === 0
        ? "You have guessed incorrectly too many times! Your account is locked. :("
        : `You guessed incorrectly! You have ${attemptsRemaining} ${guessOrGuesses} remaining before your account is locked`
        : ''

    return (
      <div style={ styles.container }>
        { guessFailed &&
          <div style={ styles.incorrectGuess }>
            { guessMessage }
          </div>
        }
        <div key='selected-images' style={ styles.selectedImagesContainer }>
          { this.renderImageSelection([image1, image2, image3]) }
        </div>
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
      </div>
    )
  }
}