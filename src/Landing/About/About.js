import React, { Component } from 'react'
import * as T from 'prop-types'
import LogoSection from './LogoSection'
import MissionSection from './MissionSection'
import QuoteSection from './QuoteSection'
import TeamSection from './TeamSection'
import Footer from './Footer'
import Link from 'react-router-dom/Link'


import '../../close.css'
import { HomeLink } from '../Home/Links'

const styles = {
  container: {
    width: '100%'
    , backgroundColor: '#FFFFFF'
    , color: '#FFFFFF'
    , fontFamily: 'Arvo'
    , position: 'relative' // needed for abs children
    , textAlign: '-webkit-center'
  }
}

export default class About extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openDrawer: T.func
    , scrollTo: T.func
  }

  render() {
    return (
      <div key='aboutContent' style={ styles.container }>
        <HomeLink />
        <LogoSection />
        <MissionSection />
        <QuoteSection />
        <TeamSection />
        <Footer />
      </div>
    )
  }
}
