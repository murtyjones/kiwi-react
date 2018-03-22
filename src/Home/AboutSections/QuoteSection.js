import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'
import NextArrow from './NextArrow'

const styles = {
  quoteSection: {
    height: '100vh'
    , backgroundColor: '#624F8F'
    , position: 'relative'
    , overflow: 'auto'
  },
  quoteSectionH1: {
    fontSize: 'calc(10px + 2.3vw)'
    , margin: '18vh 10vw 0 10vw'
  },
  signature: {
    fontSize: 'calc(8px + 2.0vw)'
    , fontWeight: 'bold'
  },
  quote: {
    position: 'relative'
    , width: '50vw'
    , left: '50vw'
    , marginLeft: '-25vw'
    , fontSize: 'calc(8px + 1.8vw)'
  }
}

const QuoteSection = () =>
  <div style={ styles.quoteSection }>
    <h2 style={ styles.quoteSectionH1 }>What students think</h2>
    <blockquote style={ styles.quote }>This is just super neat. It's so interesting.</blockquote>
    <div style={ styles.signature }>– Billy</div>
    <NextArrow to={ window.innerHeight * 3 } />
  </div>

export default QuoteSection