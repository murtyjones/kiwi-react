import React, { Component } from 'react'
import * as T from 'prop-types'
import WelcomeSection from './HomeSections/WelcomeSection'
import SalesSection from './HomeSections/SalesSection'
import ContactSection from './HomeSections/ContactSection'
import LoginLink from './HomeSections/LoginLink'

import '../close.css'
import './overrides.css'

const styles = {
  homeContentContainer: {
    width: '100%'
    , backgroundColor: '#3E2E61'
    , color: '#FFFFFF'
    , fontFamily: 'Arvo'
    , position: 'relative' // needed for abs children
  }
}

export default class HomeTab extends Component {
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
      <div key='homeContent' style={ styles.homeContentContainer }>
        <WelcomeSection
          openDrawer={ this.props.openDrawer }
        />
        <SalesSection />
        <ContactSection
          handleMessageSubmit={ this.props.handleMessageSubmit }
        />
        <LoginLink
          openDrawer={ this.props.openDrawer }
        />
      </div>
    )
  }
}
