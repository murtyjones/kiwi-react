import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { Experiment, Variant } from '@marvelapp/react-ab-test'

import '../../../assets/css/close.css'
import './overrides.css'

import { LoginLink } from './Links'
import DynamicHeader from './DynamicHeader'
import WelcomeSection1 from './WelcomeSection1'
import WelcomeSection2 from './WelcomeSection2'
import Body from './Body/Body'
import Footer from '../../common/Footer/Footer'
import ProviderRegisterModal from './ProviderRegisterModal/ProviderRegisterModal'
import LoginModal from './LoginModal/LoginModal'
import { openModal, closeModal } from '../../actions'

const styles = {
  homeContentContainer: {
    width: '100%'
    , backgroundColor: '#f0f8fb'
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
    , history: T.object.isRequired
  }

  openLoginModal = () => {
    this.props.openModal({
      className: 'loginModal',
      children: (
        <LoginModal
          switchModals={ this.openProviderRegisterModal }
        />
      )
    })
  }

  openRegisterModal = () => {
    return this.openProviderRegisterModal()
  }

  openProviderRegisterModal = () => {
    this.props.history.push('/signup-modal')
    this.props.openModal({
      hasCloseButton: false,
      className: 'providerRegisterModal',
      children: (
        <ProviderRegisterModal
          switchModals={ this.openLoginModal }
        />
      )
    })
  }

  render() {
    return (
      <div key='homeContent' style={ styles.homeContentContainer }>
        <LoginLink onClick={ this.openLoginModal } />
        <DynamicHeader openModal={ this.openRegisterModal } />
        <Experiment
          userIdentifier={ window.sessionStorage.getItem('SESSION_ID') }
          name='welcome'
        >
          <Variant name='A'>
            <WelcomeSection1 openModal={ this.openRegisterModal } />
          </Variant>
          <Variant name='B'>
            <WelcomeSection2 openModal={ this.openRegisterModal } />
          </Variant>
        </Experiment>

        <Body />
        <Footer openModal={ this.openRegisterModal } /> {/* Dont forget about the Footer on the about page*/}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: params => dispatch(openModal(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
