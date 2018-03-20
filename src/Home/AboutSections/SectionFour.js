import React, { Component } from 'react'
import SubscribeForm from '../SubscribeForm'

const styles = {
  sectionFour: {
    height: '55vh'
    , backgroundColor: '#9575C9'
    , position: 'relative'
    , overflow: 'auto'
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

const SectionFour = () =>
  <div style={ styles.sectionFour }>
    <blockquote style={ styles.quote }>This is just super neat. It's so interesting.</blockquote>
    <div style={ styles.signature }>– Billy</div>
  </div>

export default SectionFour