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
  teamMemberPosition: {
    fontSize: 'calc(6px + 1vw)'
    , fontStyle: 'italic'
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
      position='Chief Executive Officer + Co-Founder'
      description='Julia loves working with youth and is passionate about creative learning. After graduating with a Business Degree from Indiana University, she worked as a Strategy Consultant before moving into education. She believes that a strong, diverse education is the foundation for success and integrates that philosophy at Kiwi. Outside of Kiwi, Julia works in schools, after-school programs and STEM committees to better the Austin community. Julia manages the strategy, sales and community partnerships of Kiwi. In her free time, she loves reading, art museums and copious amounts of coffee.'
    />
    <TeamMember
      name='Marty Jones'
      position='Chief Technical Officer + Co-Founder'
      description='Marty is a self-taught software developer in Austin with a passion for teaching kids to code. After graduating with a degree in Business Economics, he spent time at Goldman Sachs before moving into Software Development as a self-taught programmer. Marty has a passion for coding, innovating and independent learning, and wants to share that with kids. He manages the Kiwi Development Team as Dev Lead. Outside of Kiwi, Marty loves hiking, traveling and teaching himself new programming concepts.'
    />
    <TeamMember
      name='Ben Poppel'
      position='Chief Product Officer + Co-Founder'
      description='Ben graduated from Harvard and has extensive experience as a Product Owner. He is passionate about building teams and products by combining diverse perspectives. His passions are Data, User Experience, and Technology perspectives that merge to solve the everyday customer problems. At Kiwi, Ben drives product strategy, manages the product roadmap, and oversees user testing. In his free time, he loves learning about data, startups and urban gardening.'
    />
  </div>

export default TeamSection