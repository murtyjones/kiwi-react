import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'

const styles = {
  sectionThree: {
    height: '45vh'
    , backgroundColor: '#624F8F'
    , position: 'relative'
    , overflow: 'auto'
  },
  sectionThreeH2: {
    fontSize: 'calc(8px + 1.8vw)'
    , margin: '12.5vh 10vw 0 10vw'
    , textDecoration: 'underline'
  },
  sectionThreeH3: {
    fontSize: 'calc(7px + 1.6vw)'
    , margin: '0 10vw'
  }
}

const SectionThree = () =>
  <div style={ styles.sectionThree }>
    <h2 style={ styles.sectionThreeH2 }>Our Mission</h2>
    <h3 style={ styles.sectionThreeH3 }>To make you proud of us.</h3>
    <h2 style={ styles.sectionThreeH2 }>How we do it</h2>
    <h3 style={ styles.sectionThreeH3 }>By any means necessary.</h3>
  </div>

export default SectionThree