import React, { Component } from 'react'
import * as T from 'prop-types'
import LogoSection from './LogoSection'
import MissionSection from './MissionSection'
import QuoteSection from './QuoteSection'
import TeamSection from './TeamSection'
import Footer from '../../common/Footer/Footer'

import ProviderRegisterModal from '../Home/ProviderRegisterModal/ProviderRegisterModal'
import LoginModal from '../Home/LoginModal/LoginModal'
import { openModal } from '../../actions'
import withRouter from 'react-router-dom/withRouter'
import connect from 'react-redux/es/connect/connect'

import '../../../assets/css/close.css'

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

class About extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openDrawer: T.func
    , scrollTo: T.func
    , openModal: T.func
    , history: T.object
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


  openProviderRegisterModal = () => {
    this.props.history.push('/signup-modal')
    this.props.openModal({
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
      <div key='aboutContent' style={ styles.container }>
        <LogoSection />
        <MissionSection />
        <QuoteSection />
        <TeamSection />
        <Footer isAboutPage openModal={ this.openProviderRegisterModal } />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: params => dispatch(openModal(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(About))
