import React, { Component } from 'react'

const styles = {
  container: {
    position: 'relative'
    , backgroundColor: '#624F8F'
  },
  logoSection: {
    height: '40vh'
    , maxWidth: '50vw'
    , margin: '0 auto'
    , position: 'relative'
    , overflow: 'hidden'
  }
}

const LogoSection = () =>
  <div style={ styles.container }>
    <img
      key={ 1 }
      src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535129642/Logos/kiwi_logo_white_v2.svg'
      style={ styles.logoSection }
    />
  </div>


export default LogoSection
