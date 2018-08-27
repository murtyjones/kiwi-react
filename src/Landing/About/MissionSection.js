import React, { Component } from 'react'

const styles = {
  missionSection: {
    position: 'relative'
    , overflow: 'auto'
    , color: '#3E2E61'
    , backgroundColor: '#F1F1F1'
  },
  missionSectionBox1: {
    marginBottom: '5vh'
  },
  teamSectionH1: {
    fontSize: 'calc(25px + 1.6vw)'
    , margin: '3vh 5vw'
    , color: '#624F8F'
    , textAlign: 'center'
    , WebkitTextAlign: 'center'

  },
  missionSectionH3: {
    fontSize: 'calc(18px + 0.5vw)'
    , fontFamily: 'Arvo'
    , margin: '0 auto'
    , maxWidth: '700px'
    , width: '75%'
    , fontWeight: 'normal'
    , textAlign: 'justify'
    , textAlignLast: 'center'
  }
}

const MissionSection = () =>
  <div style={ styles.missionSection }>
    <div style={ styles.missionSectionBox1 }>
      <h1 style={ styles.teamSectionH1 }>Our Mission</h1>
      <h3 style={ styles.missionSectionH3 }>
        We believe that self-taught kid programmers are the future. We're building an ecosystem for kids to not just learn coding skills but also learn the mindset of a programmer and grow with a community of their peers.
      </h3>
    </div>
  </div>

export default MissionSection
