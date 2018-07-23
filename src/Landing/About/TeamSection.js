import React, { Component } from 'react'
import './teamOverrides.css'

const styles = {
  teamSection: {
    backgroundColor: '#F1F1F1'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#624F8F'
    , textAlign: 'left'
  },
  teamSectionH1: {
    fontSize: 'calc(15px + 2.3vw)'
    , margin: '5vh 5vw 5vh 5vw'
    , color: '#624F8F'
    , textAlign: '-webkit-center'
  },
  teamMemberName: {
    fontSize: 'calc(20px + 0.6vw)'
    , fontWeight: 'bold'
    , color: '#624F8F'
    , marginTop: '2%'
    , marginLeft: '2%'
  },
  teamMemberPosition: {
    fontSize: 'calc(15px + 0.4vw)'
    , color: '#624F8F'
    , marginLeft: '2%'
  },
  paragraph: {
    position: 'relative'
    , fontSize: 'calc(14px + 0.4vw)'
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

const TeamMember = ({ name, position, imageUrl, description }) =>
  <div className='teamMember'>
    <img src={ imageUrl } />
    <div style={ styles.teamMemberName }>{ name }</div>
    <div style={ styles.teamMemberPosition }>{ position }</div>
    <p style={ styles.paragraph }>
      { description }
    </p>
  </div>

const TeamSection = () =>
  <div style={ styles.teamSection }>
    <h1 style={ styles.teamSectionH1 }>The Team</h1>
    <TeamMember
      name='Julia Lamorelle'
      position='Chief Executive Officer'
      imageUrl='https://res.cloudinary.com/kiwi-stage/image/upload/v1522032620/julia_ayw2yd.jpg'
      description='Julia drives Kiwi’s strategic vision and partnerships. Her background includes consulting, education programs and STEM committees. Julia is passionate about mentoring youth and creative solutions in education. She loves reading, art museums and copious amounts of coffee.'
    />
    <TeamMember
      name='Marty Jones'
      position='Chief Technical Officer'
      imageUrl='https://res.cloudinary.com/kiwi-stage/image/upload/v1522032620/murty_jyfotu.jpg'
      description='Marty leads the Kiwi Development Team. After working at Goldman Sachs, he moved into Software Development as a self-taught programmer. Marty is an advocate for independent learning and wants to share that with kids. He loves hiking, traveling and teaching himself new programming concepts.'
    />
    <TeamMember
      name='Ben Poppel'
      position='Chief Product Officer'
      imageUrl='https://res.cloudinary.com/kiwi-stage/image/upload/v1522032621/ben_znisgj.jpg'
      description='Ben oversees Kiwi’s product strategy, product growth and user experience. After graduating from Harvard, he worked with numerous startups as a Product Owner. He is passionate about data, user experience and startups. In his free time, he loves exploring Austin and urban gardening.'
    />
  </div>

export default TeamSection
