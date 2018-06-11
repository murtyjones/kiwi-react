import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import config from 'config'

import '../../close.css'
import './overrides.css'

import { AboutLink } from './Links'
import DynamicHeader from './DynamicHeader'
import WelcomeSection from './WelcomeSection'
import StripedSections from './StripedSections/StripedSections'
import LetsGoSection from './LetsGoSection/LetsGoSection'
import SubscribeModal from './SubscribeModal/SubscribeModal'
import ProviderRegisterModal from './ProviderRegisterModal/ProviderRegisterModal'
import { openModal, closeModal, postMessage } from '../../actions'

const styles = {
  homeContentContainer: {
    width: '100%'
    , backgroundColor: '#3E2E61'
    , color: '#FFFFFF'
    , fontFamily: 'Arvo'
    , position: 'relative' // needed for abs children
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openDrawer: T.func
    , scrollTo: T.func
    , openModal: T.func.isRequired
    , closeModal: T.func.isRequired
    , postMessage: T.func.isRequired
  }

  handleMessageSubmit = (v) => {
    this.props.postMessage({ subscribe: true, ...v })
  }

  openModal = () => {
    const providerRegisterFlow = config.features.providerRegisterFlow
    if (providerRegisterFlow) {
      return this.openProviderRegisterModal()
    }
    this.openSignupModal()
  }

  openSignupModal = () => {
    this.props.openModal({
      className: 'subscribeModal',
      children: (
        <SubscribeModal
          handleSubmit={ this.handleMessageSubmit }
        />
      )
    })
  }

  openProviderRegisterModal = () => {
    this.props.openModal({
      className: 'subscribeModal',
      children: (
        <ProviderRegisterModal /* Each slide handles its submit function */ />
      )
    })
  }

  render() {
    return (
      <div key='homeContent' style={ styles.homeContentContainer }>
        <AboutLink />
        <DynamicHeader />
        <WelcomeSection openModal={ this.openModal } />
        <StripedSections />
        <LetsGoSection openModal={ this.openModal } />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: params => dispatch(openModal(params))
    , closeModal: params => dispatch(closeModal(params))
    , postMessage: params => dispatch(postMessage(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
