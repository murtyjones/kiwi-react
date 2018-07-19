import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'

import './utils/refreshToken'

import GoogleTagManager from './analytics/GoogleTagManager'
import Routes from './Routes/Routes'
import { closeSideNav, openSideNav, closeModal, setTopBarTitle, toggleTopBarTitleIsDisabled, signout } from './actions'

Modal.setAppElement(document.getElementById('app'))


/**
 * Route Components/Containers
 */
import SideNav from './SideNav/SideNav'
import TopBar from './TopBar/TopBar'


let baseAppStyle = {
  borderRadius: 0
  , margin: 0
  , position: "absolute"
  , top: '60px'
  , left: 0
  , right: 0
  , bottom: 0
  , fontFamily: "Roboto, sans-serif"
}

const nonMenuStyle = {
  width: '100%'
  , height: '100%'
}

const EnvironmentReminder = props =>
  <div style={ {
    position: 'fixed'
    , bottom: 0
    , left: 0
    , zIndex: 1200
    , backgroundColor:
      process.env.NODE_ENV === 'local'
        ? '#ff3f79'
        : process.env.NODE_ENV === 'development'
        ? '#32a8ff'
        : '#d9af21' // stage
    , width: '100%'
    , height: '20px'
    , margin: 0
    , textTransform: 'uppercase'
    , fontFamily: 'Arial'
    , fontWeight: 'bold'
    , color: '#FFFFFF'
    , textAlign: 'center'
  } }>
    { process.env.NODE_ENV } environment
  </div>

class Root extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
    , isAdmin: T.bool.isRequired
    , topBar: T.object.isRequired
    , setTopBarTitle: T.func.isRequired
    , closeSideNav: T.func.isRequired
    , openSideNav: T.func.isRequired
    , closeModal: T.func.isRequired
    , modal: T.object.isRequired
    , globalColors: T.object.isRequired
    , sideNav: T.object.isRequired
  }

  toggleSideNav = () => {
    this.props.sideNav.isSideNavOpen ? this.props.closeSideNav() : this.props.openSideNav()
  }

  render() {
    const {
      modal, isLoggedIn, isAdmin, isProvider, sideNav, topBar, setTopBarTitle, toggleTopBarTitleIsDisabled, globalColors
    } = this.props

    const topBarWidthString = `${topBar.topBarHeight}px`

    return (
      <Fragment>
        <GoogleTagManager gtmId='GTM-TJPSGHC' />
        <div>
          { process.env.NODE_ENV !== 'production' &&
              <EnvironmentReminder />
          }
          <Helmet>
            <title>Kiwi Compute</title>
          </Helmet>
          <Modal
            isOpen={ modal.isOpen }
            onRequestClose={ this.props.closeModal }
            className={ cns('kiwi-modal', modal.className) }
            overlayClassName={ modal.overlayClassName ? modal.overlayClassName : 'ModalOverlay' }
          >
            <div
              className='x-sm x-black'
              style={ { position: 'absolute', top: 20, right: 20 } }
              onClick={ this.props.closeModal }
            />
            { modal.children }
          </Modal>
          <SideNav
            isOpen={ sideNav.isSideNavOpen }
            toggleSideNav={ this.toggleSideNav }
            isLoggedIn={ isLoggedIn }
            isAdmin={ isAdmin }
            isProvider={ isProvider }
            toggleTopBarTitleIsDisabled={ toggleTopBarTitleIsDisabled }
            { ...globalColors }
          />
          <TopBar
            isOpen={ topBar.isTopBarOpen }
            backgroundColor={ globalColors.primaryColor }
            textColor={ globalColors.textColor }
            isFocused={ topBar.topBarFocused }
            title={ topBar.topBarTitle }
            titleDisabled={ topBar.topBarTitleDisabled }
            sideNavWidth={ sideNav.sideNavWidth }
            handleTitleChange={ setTopBarTitle }
            toggleSideNav={ this.toggleSideNav }
          />
          <div
            className={ cns('baseAppStyles') }
            style={ {
              ...baseAppStyle,
              top: topBarWidthString
              }
            }
          >
            <div style={ nonMenuStyle }>
              <Routes />
              </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export const RootComponent = Root

const mapStateToProps = (state) => {
  const {
    auth: { isLoggedIn, isAdmin, isProvider, subscription },
    sideNav,
    topBar,
    globalColors,
    modal
  } = state

  return {
    isLoggedIn
    , subscription
    , isAdmin
    , isProvider
    , sideNav
    , topBar
    , globalColors
    , modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , closeSideNav: () => dispatch(closeSideNav())
    , openSideNav: () => dispatch(openSideNav())
    , setTopBarTitle: (title) => dispatch(setTopBarTitle(title))
    , toggleTopBarTitleIsDisabled: isDisabled => dispatch(toggleTopBarTitleIsDisabled(isDisabled))
    , closeModal: params => dispatch(closeModal(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))
