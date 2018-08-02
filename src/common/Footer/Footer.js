import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import moment from 'moment'
import Link from 'react-router-dom/Link'
import LetsGoSection from '../../Landing/Home/LetsGoSection/LetsGoSection'

const styles = () => ({
  footer: {
    height: '250px'
    , backgroundColor: '#624F8F'
    , position: 'relative'
    , overflow: 'auto'
    , textAlign: 'center'
    , '-webkit-text-align': 'center'

  },
  socialContainer: {
    position: 'absolute'
    , width: '180px'
    , marginLeft: '-90px'
    , height: '50px'
    , marginBottom: '-25px'
    , bottom: 65
    , left: '50%'
  },
  socialImage: {
    width: '25px'
    , margin: '10px'
  },
  copyright: {
    fontFamily: 'Roboto',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 18,
    boxSizing: 'border-box',
    fontSize: '9pt'
  },
  sitemap: {
    fontFamily: 'Roboto',
    position: 'absolute',
    width: '100%',
    bottom: 90,
    '& a': {
      color: '#FFF'
    }
  },
  divider: {
    margin: '0 8px'
  }
})

const SocialLink = ({ classes, url, imageUrl }) =>
  <a href={ url }>
    <img className={ classes.socialImage } src={ imageUrl } />
  </a>


let Footer = ({ classes, openModal, isAboutPage = false }) =>
  <div className={ classes.footer }>

    <LetsGoSection openModal={ openModal } />

    <div className={ classes.sitemap }>
      { isAboutPage
        ? <Link to='/'>Home</Link>
        : <Link to='/about'>About</Link>
      }
      <span className={ classes.divider }>|</span>
      <Link to='#'>Kiwi Blog</Link>
      <span className={ classes.divider }>|</span>
      <Link to='#'>Legal</Link>
    </div>

    <div className={ classes.socialContainer }>
      <SocialLink
        classes={ classes }
        url='https://www.facebook.com/kiwicompute/'
        imageUrl='../../../assets/images/social/facebook.svg'
      />
      <SocialLink
        classes={ classes }
        url='https://instagram.com/kiwi_compute'
        imageUrl='../../../assets/images/social/instagram.svg'
      />
      <SocialLink
        classes={ classes }
        url='https://twitter.com/kiwi_compute'
        imageUrl='../../../assets/images/social/twitter.svg'
      />
      <SocialLink
        classes={ classes }
        url='https://www.linkedin.com/company/kiwi-compute/'
        imageUrl='../../../assets/images/social/linkedin.svg'
      />
    </div>
    <div className={ classes.copyright }>
      Copyright &copy; { moment().year() } – Kiwi Compute, LLC
    </div>
  </div>

Footer = withStyles(styles, { withTheme: true })(Footer)

export default Footer
