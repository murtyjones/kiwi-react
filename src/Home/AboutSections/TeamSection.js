import React, { Component } from 'react'
import './teamOverrides.css'

const styles = {
  teamSection: {
    backgroundColor: '#FFFFFF'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#000000'
    , textAlign: 'left'
  },
  teamSectionH2: {
    fontSize: 'calc(10px + 2.3vw)'
    , margin: '5vh 5vw 5vh 5vw'
    , color: '#624F8F'
    , textAlign: 'center'
  },
  teamMemberName: {
    fontSize: 'calc(7px + 1.3vw)'
    , fontWeight: 'bold'
    , color: '#624F8F'
    , marginTop: '2%'
    , marginLeft: '2%'
  },
  teamMemberPosition: {
    fontSize: 'calc(6px + 0.9vw)'
    , color: '#624F8F'
    , marginLeft: '2%'
  },
  paragraph: {
    position: 'relative'
    , fontSize: 'calc(6px + 0.8vw)'
    , width: '96%'
    , left: '50%'
    , marginLeft: '-48%'
    , textAlign: 'justify'
    , fontFamily: 'Arial'
    , fontWeight: 'normal'
  }
}

const placeholderDescription = "This is my description. There are many like it, but this one is mine.\
My description is my best friend. It is my life. I must master it as I must master my life.\
Without me, my description is useless. Without my description, I am useless. I must fire my description true. I must shoot straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…"

const TeamMember = ({ name, position, description }) =>
  <div className='teamMember'>
    <img src='../../../assets/images/placeholder.svg' />
    <div style={ styles.teamMemberName }>{ name }</div>
    <div style={ styles.teamMemberPosition }>{ position }</div>
    <p style={ styles.paragraph }>
      { description }
    </p>
  </div>

const TeamSection = () =>
  <div style={ styles.teamSection }>
    <h2 style={ styles.teamSectionH2 }>The Team</h2>
    <TeamMember
      name='Julia Lamorelle'
      position='Chief Executive Officer'
      description='Julia loves working with youth and is passionate about creative learning. After graduating with a Business Degree from Indiana University, she worked as a Strategy Consultant before moving into education. She believes that a strong, diverse education is the.'
    />
    <TeamMember
      name='Marty Jones'
      position='Chief Technical Officer'
      description='Marty is a self-taught software developer in Austin with a passion for teaching kids to code. After graduating with a degree in Business Economics, he spent time at Goldman Sachs before moving into Software Development as a self-taught.'
    />
    <TeamMember
      name='Ben Poppel'
      position='Chief Product Officer'
      description='Ben graduated from Harvard and has extensive experience as a Product Owner. He is passionate about building teams and products by combining diverse perspectives.'
    />
  </div>

export default TeamSection