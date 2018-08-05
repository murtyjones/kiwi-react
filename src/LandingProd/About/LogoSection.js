import React, { Component } from 'react'

const styles = {
  container: {
    position: 'relative'
    , backgroundColor: '#624F8F'
  },
  logoSection: {
    height: '40vh'
    , maxWidth: '70vw'
    , margin: '0 auto'
    , position: 'relative'
    , overflow: 'hidden'
  }
}

const LogoSection = () =>
  <div style={ styles.container }>
    <img
      key={ 1 }
      src='../../../assets/images/kiwi-logo-large-white.svg'
      style={ styles.logoSection }
    />
  </div>


export default LogoSection
