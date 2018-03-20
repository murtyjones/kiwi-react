import React, { Component } from 'react'
import './teamOverrides.css'

const styles = {
  footer: {
    height: '25vh'
    , backgroundColor: '#624F8F'
    , position: 'relative'
    , overflow: 'auto'
    , color: '#000000'
  },
  socialContainer: {
    position: 'absolute'
    , width: '180px'
    , marginLeft: '-90px'
    , height: '50px'
    , marginBottom: '-25px'
    , bottom: '50%'
    , left: '50%'
  },
  socialImage: {
    width: '25px'
    , margin: '10px'
  }
}

const SocialLink = ({ url, imageUrl }) =>
  <a href={ url }>
    <img style={ styles.socialImage } src={ imageUrl } />
  </a>


const Footer = () =>
  <div style={ styles.footer }>
    <div style={ styles.socialContainer }>
      <SocialLink
        url='https://www.facebook.com/kiwicompute/'
        imageUrl='../../../assets/images/social/facebook.svg'
      />
      <SocialLink
        url='https://instagram.com/kiwi_compute'
        imageUrl='../../../assets/images/social/instagram.svg'
      />
      <SocialLink
        url='https://twitter.com/kiwi_compute'
        imageUrl='../../../assets/images/social/twitter.svg'
      />
      <SocialLink
        url='https://www.linkedin.com/company/kiwi-compute/'
        imageUrl='../../../assets/images/social/linkedin.svg'
      />

    </div>
  </div>

export default Footer