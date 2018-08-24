import React, { Component } from 'react'

const styles = {
  quoteSection: {
    backgroundColor: '#FFFFFF'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#624F8F'
  },
  quoteSectionH1: {
    fontSize: 'calc(15px + 2.3vw)'
    , margin: '50px 10vw 0 10vw'
  },
  signature: {
    fontSize: 'calc(8px + 2.0vw)'
    , fontWeight: 'bold'
  },
  age: {
    fontSize: 'calc(7px + 0.75vw)'
    , fontWeight: 'bold'
  },
  quoteContainer: {
    position: 'relative'
    , width: '70vw'
    , paddingBottom: '50px'
    , boxSizing: 'border-box'
    , margin: '0 auto'
  },
  quote: {
    fontSize: 'calc(13px + 1.8vw)'
    , color: '#624F8F'
  }
}

const Quote = () =>
  <div style={ styles.quoteContainer }>
    <blockquote style={ styles.quote }>It’s fun to follow along with the stories while also learning coding through clearly explained directions.</blockquote>
    <div style={ styles.signature }>– Sasha</div>
    <div style={ styles.age }>14 years old</div>
  </div>

const QuoteSection = () =>
  <div style={ styles.quoteSection }>
    <h2 style={ styles.quoteSectionH1 }>See What Students Think</h2>
    <Quote />
  </div>

export default QuoteSection
