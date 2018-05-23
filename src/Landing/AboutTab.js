import React, { Component } from 'react'
import * as T from 'prop-types'
import Add from 'material-ui-icons/Add'
import Extension from 'material-ui-icons/Extension'
import LaptopMac from 'material-ui-icons/LaptopMac'
import MonetizationOn from 'material-ui-icons/MonetizationOn'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import { styles as sharedStyles } from './sharedStyles'
import LogoSection from './AboutSections/LogoSection'
import SubscribeSection from './AboutSections/SubscribeSection'
import MissionSection from './AboutSections/MissionSection'
import QuoteSection from './AboutSections/QuoteSection'
import TeamSection from './AboutSections/TeamSection'
import Footer from './AboutSections/Footer'
import { Link } from 'react-router-dom'


import '../close.css'
import './overrides.css'

const styles = {
  container: {
    width: '100%'
    , backgroundColor: '#FFFFFF'
    , color: '#FFFFFF'
    , fontFamily: 'Arvo'
    , position: 'relative' // needed for abs children
    , textAlign: 'center'
  },
  backHome: {
    position: 'fixed'
    , fontWeight: 'bold'
    , top: '20px'
    , left: '5px'
    , zIndex: 2
    , textShadow: '1px 0 0 #fff, -1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff'
  }
}

const BackHome = () =>
  <Link style={ styles.backHome } to='/'>&lt; Home</Link>


export default class AboutTab extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openDrawer: T.func
    , scrollTo: T.func
    , handleMessageSubmit: T.func
  }

  render() {
    return (
      <div key='aboutContent' style={ styles.container }>
        <BackHome />
        <LogoSection />
        <MissionSection />
        <SubscribeSection handleMessageSubmit={ this.props.handleMessageSubmit }/>
        <QuoteSection />
        <TeamSection />
        <Footer />
      </div>
    )
  }
}
