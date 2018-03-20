import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'
import NextArrow from './NextArrow'

const styles = {
  sectionTwo: {
    height: '65vh'
    , backgroundColor: '#765C9F'
    , position: 'relative'
    , overflow: 'auto'
  },
  sectionTwoH1: {
    fontSize: 'calc(10px + 2.3vw)'
    , margin: '18vh 10vw 0 10vw'
  }
}

const SubscribeSection = ({handleMessageSubmit}) =>
  <div style={ styles.sectionTwo }>
    <h1 style={ styles.sectionTwoH1 }>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</h1>
    <SubscribeForm
      onSubmit={ (p) => handleMessageSubmit({ subscribe: true, ...p }) }
    />
    <NextArrow to={ window.innerHeight } />
  </div>

export default SubscribeSection