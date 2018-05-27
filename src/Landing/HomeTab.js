import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'

import '../close.css'
import './overrides.css'

import { AboutLink } from './HomeSections/Links'
import DynamicHeader from './DynamicHeader'
import WelcomeSection from './HomeSections/WelcomeSection'
import StripedSections from './HomeSections/StripedSections/StripedSections'
import LetsGoSection from './HomeSections/LetsGoSection/LetsGoSection'
import SubscribeModal from './HomeSections/SubscribeModal'
import { openModal } from '../actions'

const styles = {
  homeContentContainer: {
    width: '100%'
    , backgroundColor: '#3E2E61'
    , color: '#FFFFFF'
    , fontFamily: 'Arvo'
    , position: 'relative' // needed for abs children
  }
}

class HomeTab extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openDrawer: T.func
    , scrollTo: T.func
    , handleMessageSubmit: T.func
    , openModal: T.func.isRequired
  }

  openModal = () => {
    this.props.openModal({
      children: <div>Hello</div>
    })
  }

  render() {
    return (
      <div key='homeContent' style={ styles.homeContentContainer }>
        <AboutLink />
        <DynamicHeader />
        <WelcomeSection />
        <StripedSections />
        <LetsGoSection openModal={ this.openModal } />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: params => dispatch(openModal(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(HomeTab))
