import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'
import NextArrow from './NextArrow'

const styles = {
  subscribeSection: {
    height: '100vh'
    , color: '#624F8F'
    , backgroundColor: '#FFFFFF'
    , position: 'relative'
    , overflow: 'auto'
  },
  subscribeSectionH1: {
    fontSize: 'calc(10px + 2.3vw)'
    , margin: '18vh 10vw 0 10vw'
  },
  subscribeSectionH2: {
    fontSize: 'calc(9px + 1.4vw)'
    , margin: '2vh 10vw 0 10vw'
  }
}

const SubscribeSection = ({handleMessageSubmit}) =>
  <div style={ styles.subscribeSection }>
    <h1 style={ styles.subscribeSectionH1 }>We love building our Kiwi community!</h1>
    <h1 style={ styles.subscribeSectionH2 }>Let’s stay in touch.</h1>
    <SubscribeForm
      onSubmit={ (p) => handleMessageSubmit({ subscribe: true, ...p }) }
    />
    <NextArrow to={ window.innerHeight * 2 } />
  </div>

export default SubscribeSection