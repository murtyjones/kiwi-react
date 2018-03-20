import React, { Component } from 'react'
import './teamOverrides.css'

const styles = {
  sectionFive: {
    height: '100vh'
    , backgroundColor: '#FFFFFF'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#000000'
  },
  sectionFiveH2: {
    fontSize: 'calc(8px + 1.8vw)'
    , margin: '12.5vh 10vw 5vw 10vw'
    , textDecoration: 'underline'
    , color: '#9575C9'
  },
  teamMemberName: {
    fontSize: 'calc(7px + 1.6vw)'
    , fontWeight: 'bold'
    , color: '#000000'
  },
  paragraph: {
    position: 'relative'
    , fontSize: 'calc(7px + 0.8vw)'
    , width: '96%'
    , left: '50%'
    , marginLeft: '-48%'
    , textAlign: 'justify'
  }
}

const TeamMember = ({ name }) =>
  <div className='teamMember'>
    <img src='../../../assets/images/placeholder.svg' />
    <div style={ styles.teamMemberName }>{ name }</div>
    <p style={ styles.paragraph }>
      This is my information section. There are many like it, but this one is mine. I am nothing without my information section.
    </p>
  </div>

const SectionFive = () =>
  <div style={ styles.sectionFive }>
    <h2 style={ styles.sectionFiveH2 }>The Team</h2>
    <TeamMember name='Julia Lamorelle' />
    <TeamMember name='Marty Jones' />
    <TeamMember name='Ben Poppel' />
  </div>

export default SectionFive