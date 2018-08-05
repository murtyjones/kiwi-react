import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import moment from 'moment'
import Link from 'react-router-dom/Link'
import LetsGoSection from '../../Landing/Home/LetsGoSection/LetsGoSection'

const styles = () => ({
  root: {
    fontFamily: 'Roboto',
    height: '275px'
    , backgroundColor: '#624F8F'
    , position: 'relative'
    , overflow: 'auto'
    , textAlign: 'center'
    , WebkitTextAlign: 'center'
    , '& a': {
      color: '#FFF'
    }
  },
  socialContainer: {
    position: 'absolute'
    , width: '180px'
    , marginLeft: -90
    , height: '50px'
    , marginBottom: '-25px'
    , bottom: 90
    , left: '50%'
  },
  socialImage: {
    width: '25px'
    , margin: '10px'
  },
  copyright: {
    fontFamily: 'Roboto',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    padding: 18,
    boxSizing: 'border-box',
    fontSize: '9pt'
  },
  emailus: {
    fontFamily: 'Roboto',
    position: 'absolute',
    bottom: 17,
    width: '100%',
    padding: 18,
    boxSizing: 'border-box',
    fontSize: '12pt'
  },
  sitemap: {
    fontFamily: 'Roboto',
    position: 'absolute',
    width: '100%',
    bottom: 120,
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
  <div className={ classes.root }>

    <LetsGoSection openModal={ openModal } />

    <div className={ classes.sitemap }>
      { isAboutPage
        ? <Link to='/'>Home</Link>
        : <Link to='/about'>About</Link>
      }
      <span className={ classes.divider }>|</span>
      <a
        rel='noopener noreferrer'
        href='https://medium.com/@kiwicompute'
        target='_blank'
      >
        Kiwi Blog
      </a>
      <span className={ classes.divider }>|</span>
      <Link to='/terms'>Terms of Service</Link>
      <span className={ classes.divider }>|</span>
      <Link to='/privacy'>Privacy Policy</Link>
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
    <h3 className={ classes.emailus }>
      Need help? E-mail us at <a href='mailto:support@kiwicompute.com'>support@kiwicompute.com</a>
    </h3>
  </div>

Footer = withStyles(styles, { withTheme: true })(Footer)

export default Footer
