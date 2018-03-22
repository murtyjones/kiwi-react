import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'
import NextArrow from './NextArrow'

const styles = {
  missionSection: {
    height: '60vh'
    , backgroundColor: '#FFFFFF'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#624F8F'
  },
  missionSectionH2: {
    fontSize: 'calc(8px + 1.8vw)'
    , margin: '8vh 10vw 0 10vw'
    , textDecoration: 'underline'
  },
  missionSectionH3: {
    fontSize: 'calc(7px + 1.6vw)'
    , margin: '0 10vw'
  }
}

const MissionSection = () =>
  <div style={ styles.missionSection }>
    <h2 style={ styles.missionSectionH2 }>Our Mission</h2>
    <h3 style={ styles.missionSectionH3 }>To make you proud of us.</h3>
    <h2 style={ styles.missionSectionH2 }>How We Do It</h2>
    <h3 style={ styles.missionSectionH3 }>By any means necessary.</h3>
    <NextArrow to={ window.innerHeight } />
  </div>

export default MissionSection