import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

const styles = {
  container: {
    position: 'relative'
    , backgroundColor: '#624F8F'
  },
  logoSection: {
    width: '130px'
    , margin: '10px auto'
    , position: 'relative'
    , overflow: 'hidden'
  }
}

const LogoSection = () =>
  <div style={ styles.container }>
    <Link to='/'>
      <img
        key={ 1 }
        src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535129642/Logos/kiwi_logo_white_v2.svg'
        style={ styles.logoSection }
      />
    </Link>
  </div>


export default LogoSection
