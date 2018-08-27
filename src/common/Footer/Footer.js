import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import moment from 'moment'
import Link from 'react-router-dom/Link'
import { isMobile } from 'react-device-detect'

import LetsGoSection from '../../Landing/Home/LetsGoSection/LetsGoSection'

const styles = () => ({
  root: {
    fontFamily: 'Roboto',
    minHeight: '275px'
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
    width: '180px'
    , height: '50px'
    , margin: '0 auto'
  },
  socialImage: {
    width: '25px'
    , margin: '10px'
  },
  copyright: {
    fontFamily: 'Roboto',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '9pt',
    margin: '0 auto 5px auto'
  },
  emailus: {
    fontFamily: 'Roboto',
    bottom: 17,
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '12pt',
    margin: '0 auto 5px auto'
  },
  sitemap: {
    fontFamily: 'Roboto',
    margin: '10px auto',
    width: '100%',
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
        imageUrl='https://res.cloudinary.com/kiwi-prod/image/upload/v1535378410/Social/facebook_xq2id7.svg'
      />
      <SocialLink
        classes={ classes }
        url='https://instagram.com/kiwi_compute'
        imageUrl='https://res.cloudinary.com/kiwi-prod/image/upload/v1535378410/Social/instagram_giimcu.svg'
      />
      <SocialLink
        classes={ classes }
        url='https://twitter.com/kiwi_compute'
        imageUrl='https://res.cloudinary.com/kiwi-prod/image/upload/v1535378410/Social/twitter_uezqwj.svg'
      />
      <SocialLink
        classes={ classes }
        url='https://www.linkedin.com/company/kiwi-compute/'
        imageUrl='https://res.cloudinary.com/kiwi-prod/image/upload/v1535378410/Social/instagram_giimcu.svg'
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
