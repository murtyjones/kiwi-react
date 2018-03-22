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
    fontSize: 'calc(12px + 1vw)'
    , margin: '8vh 10vw 0 10vw'
    , textDecoration: 'underline'
  },
  missionSectionH3: {
    fontSize: 'calc(12px + 0.6vw)'
    , margin: '0 10vw'
  }
}

const MissionSection = () =>
  <div style={ styles.missionSection }>
    <h2 style={ styles.missionSectionH2 }>Our Mission</h2>
    <h3 style={ { textAlign: 'center', ...styles.missionSectionH3 } }>To create a comfortable and fun place for kids to improve their coding skills.</h3>
    <h2 style={ styles.missionSectionH2 }>How We Do It</h2>
    <h3 style={ { textAlign: 'justify', ...styles.missionSectionH3 } }>It's easy to get kids started on coding – but difficult to keep them interested. Middle schoolers today know that coding is important, but struggle with finding the best platform on which to learn. Kiwi has taught coding in Austin for the last two years, reaching hundreds of students. Using its curriculum, Kiwi developed an initial platform with support from the National Science Foundation, US Ignite and the City of Austin. Our goal is to provide an engaging environment where kids are excited to learn coding and improve their technical fluency! The platform teaches coding and balances game-based and academic learning. As the student’s coding skills advance, the lessons increase technical components and slowly introduce new concept.</h3>
    <NextArrow to={ window.innerHeight } />
  </div>

export default MissionSection