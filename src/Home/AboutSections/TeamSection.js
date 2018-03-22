import React, { Component } from 'react'
import './teamOverrides.css'

const styles = {
  teamSection: {
    backgroundColor: '#FFFFFF'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#000000'
  },
  teamSectionH2: {
    fontSize: 'calc(8px + 1.8vw)'
    , margin: '10vh 10vw 5vw 10vw'
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
      This is my description. There are many like it, but this one is mine.
      My description is my best friend. It is my life. I must master it as I must master my life.

      Without me, my description is useless. Without my description, I am useless. I must fire my description true. I must shoot straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…
    </p>
  </div>

const TeamSection = () =>
  <div style={ styles.teamSection }>
    <h2 style={ styles.teamSectionH2 }>The Team</h2>
    <TeamMember name='Julia Lamorelle' />
    <TeamMember name='Marty Jones' />
    <TeamMember name='Ben Poppel' />
  </div>

export default TeamSection