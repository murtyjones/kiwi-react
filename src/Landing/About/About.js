import React, { Component } from 'react'
import * as T from 'prop-types'
import LogoSection from './LogoSection'
import SubscribeSection from './SubscribeSection'
import MissionSection from './MissionSection'
import QuoteSection from './QuoteSection'
import TeamSection from './TeamSection'
import Footer from './Footer'
import Link from 'react-router-dom/Link'


import '../../close.css'

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


export default class About extends Component {
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
