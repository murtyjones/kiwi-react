import React, { Component } from 'react'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import { animateScroll as scroll } from 'react-scroll'

const size = 'calc(16px + 1.6vw)'
const marginOffset = 'calc(-8px - 0.8vw)'

const scrollTo = to => scroll.scrollTo(to)

const styles = {
  learnMore: {
    position: 'absolute'
    , cursor: 'pointer'
    , fontWeight: 'bold'
    , fontSize: 'calc(12pt + 0.4vw)'
    , width: size
    , height: size
    , bottom: '30px'
    , left: '50%'
    , marginLeft: marginOffset
    , zIndex: 1000
    , textAlign: 'center'
    , borderRadius: '50%'
    , backgroundColor: '#9AC045'
  },
  learnMoreArrow: {
    position: 'absolute'
    , top: 'calc(50% + 2px)' // the 2px fixes a weird offset issue with the arrow
    , left: '50%'
    , marginTop: marginOffset
    , marginLeft: marginOffset
    , height: size
    , width: size
  }
}

const NextArrow = ({ to }) =>
  <div
    key={ 2 }
    style={ styles.learnMore }
    className='hvr-pulse'
    onClick={ () => scrollTo(to) }
  >
    <KeyboardArrowDown
      color='#FFFFFF'
      style={ styles.learnMoreArrow }
    />
  </div>

export default NextArrow