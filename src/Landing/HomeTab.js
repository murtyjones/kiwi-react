import React, { Component } from 'react'
import * as T from 'prop-types'
import StripedSection from './HomeSections/StripedSection'
import { AboutLink } from './HomeSections/Links'

import '../close.css'
import './overrides.css'
import DynamicHeader from "./DynamicHeader"

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
        <DynamicHeader />
        <StripedSection />
        <AboutLink />
      </div>
    )
  }
}
