import React, { Component } from 'react'

const styles = {
  quoteSection: {
    backgroundColor: '#FFFFFF'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#624F8F'
  },
  quoteSectionH1: {
    fontSize: 'calc(25px + 1.6vw)'
    , margin: '3vh 5vw'
  },
  quoteContainer: {
    position: 'relative'
    , paddingBottom: '50px'
    , boxSizing: 'border-box'
    , margin: '0 auto'
    , textAlign: 'justify'
    , textAlignLast: 'center'
    , fontSize: 'calc(18px + 0.5vw)'
    , color: 'rgb(62, 46, 97)'
    , maxWidth: 700
    , width: '75%'
  }
}

const Quote = () =>
  <div style={ styles.quoteContainer }>
    Kiwi started in 2016 in Austin, TX as an in-person coding education company. For two years, the Kiwi team taught hundreds of middle schoolers in Austin and developed a Python curriculum for kids. In 2017, Kiwi won a grant from The National Science Foundation, the City of Austin and US Ignite to digitize its curriculum. Wanting to reach more middle schoolers nationwide, Kiwi created its online platform to provide a self-paced way for all middle schoolers to learn together.
  </div>

const QuoteSection = () =>
  <div style={ styles.quoteSection }>
    <h2 style={ styles.quoteSectionH1 }>Kiwi's Story</h2>
    <Quote />
  </div>

export default QuoteSection
