import React, { Component } from 'react'
import NextArrow from './NextArrow'

const styles = {
  missionSection: {
    height: '60vh'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#3E2E61'
    , backgroundColor: '#F1F1F1'
  },
  missionSectionBox1: {
    marginBottom: '5vh'
  },
  missionSectionH2: {
    fontSize: 'calc(12px + 1.5vw)'
    , margin: '2vh 10vw 3vh 10vw'
  },
  missionSectionH3: {
    fontSize: 'calc(18px + 0.5vw)'
    , lineHeight: '36px'
    , margin: '50px auto 0 auto'
    , maxWidth: '700px'
    , width: '90%'
    , fontFamily: 'Arial'
    , fontWeight: 'normal'
  }
}

const MissionSection = () =>
  <div style={ styles.missionSection }>
    <div style={ styles.missionSectionBox1 }>
      <h3 style={ { textAlign: 'justify', ...styles.missionSectionH3 } }>
        We believe that self-taught kid programmers are the future. We're building an ecosystem for kids to not just learn coding skills but also learn the mindset of a programmer and grow with a community of their peers.
      </h3>
      <NextArrow to={ window.innerHeight } />
    </div>
  </div>

export default MissionSection
