import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'
import NextArrow from './NextArrow'

const styles = {
  subscribeSection: {
    height: '100vh'
    , backgroundColor: '#624F8F'
    , position: 'relative'
    , overflow: 'auto'
  },
  subscribeSectionH1: {
    fontSize: 'calc(10px + 2.3vw)'
    , margin: '18vh 10vw 0 10vw'
  }
}

const SubscribeSection = ({handleMessageSubmit}) =>
  <div style={ styles.subscribeSection }>
    <h1 style={ styles.subscribeSectionH1 }>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</h1>
    <SubscribeForm
      onSubmit={ (p) => handleMessageSubmit({ subscribe: true, ...p }) }
    />
    <NextArrow to={ window.innerHeight * 2 } />
  </div>

export default SubscribeSection