import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import config from 'config'

import '../../close.css'
import './overrides.css'

import { AboutLink, LoginLink } from './Links'
import DynamicHeader from './DynamicHeader'
import WelcomeSection from './WelcomeSection'
import StripedSections from './StripedSections/StripedSections'
import LetsGoSection from './LetsGoSection/LetsGoSection'
import SubscribeModal from './SubscribeModal/SubscribeModal'
import ProviderRegisterModal from './ProviderRegisterModal/ProviderRegisterModal'
import LoginModal from './LoginModal/LoginModal'
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

  openLoginModal = () => {
    this.props.openModal({
      className: 'loginModal',
      children: (
        <LoginModal /* Each slide handles its submit function */ />
      )
    })
  }

  openRegisterModal = () => {
    const allowSignInRegister = config.features.allowSignInRegister
    if (allowSignInRegister) {
      return this.openProviderRegisterModal()
    }
    this.openSubscribeModal()
  }

  openSubscribeModal = () => {
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
    this.props.history.push('/onboarding')
    this.props.openModal({
      className: 'providerRegisterModal',
      children: (
        <ProviderRegisterModal /* Each slide handles its submit function */ />
      )
    })
  }

  render() {
    return (
      <div key='homeContent' style={ styles.homeContentContainer }>
        <AboutLink />
        { config.features.allowSignInRegister &&
          <LoginLink onClick={ this.openLoginModal } />
        }
        <DynamicHeader />
        <WelcomeSection openModal={ this.openRegisterModal } />
        <StripedSections />
        <LetsGoSection openModal={ this.openRegisterModal } />
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
