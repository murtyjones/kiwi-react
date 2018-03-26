import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'
import NextArrow from './NextArrow'

const styles = {
  quoteSection: {
    height: '100vh'
    , backgroundColor: '#624F8F'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#FFFFFF'
  },
  quoteSectionH1: {
    fontSize: 'calc(10px + 2.3vw)'
    , margin: '18vh 10vw 2.5vh 10vw'
  },
  signature: {
    fontSize: 'calc(8px + 2.0vw)'
    , fontWeight: 'bold'
  },
  quoteContainer: {
    position: 'relative'
    , width: '50vw'
    , left: '50vw'
    , marginLeft: '-25vw'
    , padding: '4vw 1vw 4vw 1vw'
    , boxSizing: 'border-box'
  },
  quote: {
    fontSize: 'calc(8px + 1.8vw)'
    , color: '#FFFFFF'
  }
}

const Quote = () =>
  <div style={ styles.quoteContainer }>
    <blockquote style={ styles.quote }>It’s fun to follow along with the stories while also learning coding through clearly explained directions.</blockquote>
    <div style={ styles.signature }>– Sasha, 13 years old</div>
  </div>

const QuoteSection = () =>
  <div style={ styles.quoteSection }>
    <h2 style={ styles.quoteSectionH1 }>See What Students Think</h2>
    <Quote />
    <NextArrow to={ window.innerHeight * 3 } />
  </div>

export default QuoteSection