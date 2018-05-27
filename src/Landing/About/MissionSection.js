import React, { Component } from 'react'
import SubscribeForm from './SubscribeForm'
import NextArrow from './NextArrow'

const styles = {
  missionSection: {
    height: '60vh'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#FFFFFF'
    , backgroundColor: '#624F8F'
  },
  missionSectionBox1: {
    marginBottom: '5vh'
  },
  missionSectionH2: {
    fontSize: 'calc(12px + 1.5vw)'
    , margin: '2vh 10vw 3vh 10vw'
  },
  missionSectionH3: {
    fontSize: 'calc(12px + 0.6vw)'
    , margin: '0 10vw'
    , fontFamily: 'Arial'
    , fontWeight: 'normal'
  }
}

const MissionSection = () =>
  <div style={ styles.missionSection }>
    <div style={ styles.missionSectionBox1 }>
      <h2 style={ styles.missionSectionH2 }>Our Mission</h2>
      <h3 style={ { textAlign: 'center', ...styles.missionSectionH3 } }>To create a comfortable and fun place for kids to improve their coding skills.</h3>
    </div>
    <h2 style={ styles.missionSectionH2 }>How We Do It</h2>
    <h3 style={ { textAlign: 'justify', ...styles.missionSectionH3 } }>
      Kiwi has taught coding in Austin over the last two years, reaching hundreds of kids. Using its curriculum, Kiwi built a learning platform with support from the National Science Foundation, US Ignite and the City of Austin. The tool uses game-based and academic learning, increasing technical aspects as coding skills advance. Students will move through the program to become a self-taught programmer. Through Kiwi, kids will enjoy coding while improving their technical fluency!
    </h3>
    <NextArrow to={ window.innerHeight } />
  </div>

export default MissionSection
