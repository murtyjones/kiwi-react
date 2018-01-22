import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { GridList, GridTile } from 'material-ui'
import { Drawer, Menu, MenuItem, Subheader, Divider } from 'material-ui'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'


import { openSideNav, closeSideNav, openTopBar, closeTopBar, signout, login } from '../actions'
import { ApiFetch } from '../utils/ApiFetch'
import LoginOrRegister from './LoginOrRegister'
import isMobile from '../utils/userAgentUtils'

import '../close.css'
import './overrides.css'

const styles = {
  homeContentContainer: {
    width: '100%'
    , backgroundColor: '#3E2E61'
    , color: '#FFFFFF'
    , fontFamily: 'Trebuchet MS'
    , position: 'relative' // needed for abs children
  },
  homePageOne: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
  },
  homePageTwo: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
  },
  salesBox: {
    backgroundColor: '#FFFFFF'
    , position: 'relative'
    , left: '50%'
    , width: '80%'
    , marginLeft: '-40%'
    , height: '80%'
    , color: '#2F2864'
    , fontFamily: 'Palatino'
  },
  salesH1: {
    textAlign: 'center'
    , fontSize: 'calc(10px + 3.6vw)'
  },
  titleContainer: {
    textAlign: 'left'
    , position: 'absolute'
    , top: '35%'
    , left: '15%'
    , zIndex: 20
  },
  titleStyle: {
    fontSize: 'calc(10px + 3.6vw)'
    , fontWeight: 'bold'
    , borderBottom: '3px #9AC045 solid'
  },
  loginButtonContainer: {
    position: 'absolute'
    , top: '20px'
    , right: '0'
    , width: '50px'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '15px'
  },
  loginButton: {
    borderBottom: '2px #FFFFFF solid'
    , paddingBottom: '3px'
    , cursor: 'pointer'
  },
  closeDrawerButton: {
    marginTop: '10px'
    , marginRight: '10px'
  },
  loginDrawer: {
    backgroundColor: '#765C9F'
  },
  loginDrawerWidth: 400 // px
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerIsOpen: false
    }
  }

  static propTypes = {
    openSideNav: T.func
    , closeSideNav: T.func
    , openTopBar: T.func
    , closeTopBar: T.func
    , signout: T.func
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  openDrawer = () => {
    this.setState({ drawerIsOpen: true })
  }

  closeDrawer = () => {
    this.setState({ drawerIsOpen: false })
  }

  render() {
    const { drawerIsOpen } = this.state

    return [
      <div key='homeContent' style={ styles.homeContentContainer }>
        <div key='homePageOne' style={ styles.homePageOne }>
          <img
            key='homeLogo'
            className='homeLogo'
            src='../../assets/images/landing-logo.svg'
          />

          <img
            key='homeDragon'
            className='homeDragon'
            src='../../assets/images/landing-bg_dragon.svg'
          />

          <img
            key='homeBackgroundLayer1'
            className='homeBackgroundLayer1'
            src='../../assets/images/landing-bg_01.svg'
          />

          <img
            key='homeBackgroundLayer2'
            className='homeBackgroundLayer2'
            src='../../assets/images/landing-bg_02.svg'
          />

          <img
            key='homeBackgroundLayer3'
            className='homeBackgroundLayer3'
            src='../../assets/images/landing-bg_03.svg'
          />

          <img
            key='homeBackgroundLayer4'
            className='homeBackgroundLayer4'
            src='../../assets/images/landing-bg_04.svg'
          />
          <div style={ styles.titleContainer } >
            <span style={ styles.titleStyle }>Start your coding<br />adventure today</span>
          </div>
        </div>

        <div key='homePageTwo' style={ styles.homePageTwo }>
          <div key='salesBox' style={ styles.salesBox }>
            <h1 style={ styles.salesH1 }>Lorem</h1>
          </div>
        </div>

        <div style={ styles.loginButtonContainer } >
          <span
            onClick={ this.openDrawer }
            style={ styles.loginButton }
          >
            log in
          </span>
        </div>


        
      </div>
      ,
      <Drawer
        key='loginDrawer'
        containerClassName='loginDrawer'
        containerStyle={ styles.loginDrawer }
        width={ isMobile() ? '100%' : styles.loginDrawerWidth }
        open={ drawerIsOpen }
        openSecondary={ true }
      >
        <div
          onClick={ this.closeDrawer }
          className='x'
          style={ styles.closeDrawerButton }
        />
        <LoginOrRegister />
      </Drawer>
    ]
  }
}

export const HomeComponent = Home


const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , login: (params) => dispatch(login(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
