import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'

import LogoSection from './LogoSection'
import MissionSection from './MissionSection'
import QuoteSection from './QuoteSection'
import TeamSection from './TeamSection'
import Footer from '../../common/Footer/Footer'

import ProviderRegisterModal from '../Home/ProviderRegisterModal/ProviderRegisterModal'
import LoginModal from '../Home/LoginModal/LoginModal'
import { openModal } from '../../actions'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'

import '../../../assets/css/close.css'
import { purple } from '../../colors'

const styles = {
  container: {
    width: '100%'
    , backgroundColor: '#FFFFFF'
    , color: '#FFFFFF'
    , fontFamily: 'Arvo'
    , position: 'relative' // needed for abs children
    , textAlign: 'center'
    , WebkitTextAlign: 'center'
  }
}

const HomeButton = () =>
  <Link to='/'>
    <button
      className='hvr-grow'
      style={ {
        position: 'absolute',
        top: 12,
        right: 13,
        color: '#FFFFFF',
        cursor: 'pointer',
        zIndex: 1,
        padding: '10px',
        fontSize: 'calc(11px + 0.25vw)',
        textAlign: 'center',
        fontWeight: 'bold',
        width: '21vw',
        maxWidth: 120,
        fontFamily: 'Arvo',
        borderRadius: 25,
        backgroundColor: 'rgb(98, 79, 143)',
        border: '2px solid #FFFFFF'
      } }
    >
      Home
    </button>
  </Link>

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

  componentWillMount() {
    window.scrollTo(0, 0)
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
        <HomeButton />
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
