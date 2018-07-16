import React, { Component } from 'react'
import Link from 'react-router-dom/Link'


const styles = {
  linkContainerStyle: {
    position: 'absolute'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '15px'
    , zIndex: 52 // just in front of dynamicHeader
  },
  linkStyle: {
    borderBottom: '2px #3E2E61 solid'
    , paddingBottom: '3px'
    , cursor: 'pointer'
    , fontSize: '16pt'
    , color: '#3E2E61'
    , textDecoration: 'none'
  }
}


export const AboutLink = () =>
  <div style={ {
      ...styles.linkContainerStyle, top: '20px', right: '10px', width: '100px'
    } }
  >
    <Link to='/about' style={ styles.linkStyle }>
      about us
    </Link>
  </div>


export const LoginLink = ({ onClick }) =>
  <div style={ {
      ...styles.linkContainerStyle, top: '20px', right: '130px', width: '100px'
    } }
  >
    <Link
      to={ onClick ? '#' : '/login' }
      onClick={ onClick }
      style={ styles.linkStyle }
    >
      sign in
    </Link>
  </div>


export const HomeLink = () =>
  <div style={ {
    ...styles.linkContainerStyle, top: '20px', right: '10px', width: '100px'
  } }
  >
    <Link to='/' style={ styles.linkStyle }>
      home
    </Link>
  </div>
