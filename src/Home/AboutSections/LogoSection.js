import React, { Component } from 'react'

const styles = {
  container: {
    position: 'relative'
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
      src='../../../assets/images/kiwi_logo_large_color.svg'
      style={ styles.logoSection }
    />
  </div>


export default LogoSection