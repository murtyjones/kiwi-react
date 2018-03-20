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
  }
}


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
        <LogoSection />
        <SubscribeSection handleMessageSubmit={ this.props.handleMessageSubmit }/>
        <MissionSection />
        <QuoteSection />
        <TeamSection />
        <Footer />
      </div>
    )
  }
}
