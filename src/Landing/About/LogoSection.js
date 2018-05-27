import React, { Component } from 'react'

const styles = {
  container: {
    position: 'relative'
    , backgroundColor: '#624F8F'
  },
  logoSection: {
    height: '40vh'
    , position: 'relative'
    , overflow: 'auto'
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