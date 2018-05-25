import React, { Component } from 'react'
import { styles as sharedStyles } from '../sharedStyles'
import NextArrow from './NextArrow'
import DynamicCTA from './DynamicCTA/DynamicCTA'

const styles = {
  homePageOne: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
  },
  titleContainer: {
    textAlign: 'center'
    , position: 'absolute'
    , top: '35%'
    , width: '100%'
  },
  titleStyle: {
    fontSize: 'calc(10px + 3.6vw)'
    , fontWeight: 'bold'
    , borderBottom: '3px #9AC045 solid'
    , paddingBottom: '2px'
  }
}

export default class WelcomeSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div key='homePageOne' style={ styles.homePageOne }>


        <img
          key='homeDragon'
          className='homeDragon'
          src='../../../assets/images/landing-bg_dragon.svg'
        />

        <img
          key='homeBackgroundLayer1'
          className='homeBackgroundLayer1'
          src='../../../assets/images/landing-bg_01.svg'
        />

        <img
          key='homeBackgroundLayer2'
          className='homeBackgroundLayer2'
          src='../../../assets/images/landing-bg_02.svg'
        />

        <img
          key='homeBackgroundLayer3'
          className='homeBackgroundLayer3'
          src='../../../assets/images/landing-bg_03.svg'
        />

        <img
          key='homeBackgroundLayer4'
          className='homeBackgroundLayer4'
          src='../../../assets/images/landing-bg_04.svg'
        />
        <DynamicCTA
          text='start your coding adventure today.'
          smallText='start coding today.'
          fixPoint={ 2.836 }
        />
        <div style={ styles.titleContainer } >
          <div style={ sharedStyles.buttonContainer }>
            <div
              className='greenButton hvr-grow'
              onClick={ this.props.openDrawer }
            >
              Let's go!
            </div>
          </div>
        </div>

        <NextArrow
          to={ window.innerHeight - 60 }
          textColor='#FFFFFF'
        />

      </div>
    )
  }
}
