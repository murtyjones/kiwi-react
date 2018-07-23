import React, { Component } from 'react'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import { animateScroll as scroll } from 'react-scroll'

const scrollTo = to => scroll.scrollTo(to)

const styles = {
  learnMore: {
    cursor: 'pointer'
    , fontWeight: 'bold'
    , fontSize: 'calc(12pt + 0.4vw)'
    , position: 'absolute'
    , width: '200px'
    , bottom: 0
    , left: '50%'
    , marginLeft: '-100px'
    , zIndex: 50
    , textAlign: '-webkit-center'
  },
  learnMoreArrow: {
    height: 'calc(36px + 3vw)'
    , width: 'calc(36px + 3vw)'
  }
}

const NextArrow = ({ to, text, textColor }) =>
  <div
    style={ styles.learnMore }
    className='hvr-wobble-vertical'
    onClick={ () => scrollTo(to) }
  >
    <div style={ { color: textColor } }>{ text }</div>
    <KeyboardArrowDown
      color='#9AC045'
      style={ styles.learnMoreArrow }
    />
  </div>

export default NextArrow
