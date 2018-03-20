import React, { Component } from 'react'
import * as T from 'prop-types'
import Add from 'material-ui-icons/Add'
import Extension from 'material-ui-icons/Extension'
import LaptopMac from 'material-ui-icons/LaptopMac'
import MonetizationOn from 'material-ui-icons/MonetizationOn'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import { styles as sharedStyles } from './sharedStyles'
import SectionOne from './AboutSections/SectionOne'
import SectionTwo from './AboutSections/SectionTwo'
import SectionThree from './AboutSections/SectionThree'
import SectionFour from './AboutSections/SectionFour'
import SectionFive from './AboutSections/SectionFive'
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
        <SectionOne />
        <SectionTwo handleMessageSubmit={ this.props.handleMessageSubmit }/>
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <Footer />
      </div>
    )
  }
}
