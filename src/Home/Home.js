import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { GridList, GridTile } from 'material-ui'
import { Drawer, Menu, MenuItem, Subheader, Divider } from 'material-ui'
import CropSquare from 'material-ui-icons/CropSquare'
import Add from 'material-ui-icons/Add'
import Extension from 'material-ui-icons/Extension'
import LaptopMac from 'material-ui-icons/LaptopMac'
import MonetizationOn from 'material-ui-icons/MonetizationOn'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import { animateScroll as scroll } from 'react-scroll'

import { openSideNav, closeSideNav, openTopBar, closeTopBar, signout, login, postMessage } from '../actions'
import { ApiFetch } from '../utils/ApiFetch'
import { find } from 'lodash'
import { styles as sharedStyles } from './sharedStyles'
import LoginOrRegister from './LoginOrRegister'
import isMobile from '../utils/userAgentUtils'
import HomeTab from './HomeTab'
import AboutTab from './AboutTab'

import '../close.css'
import './overrides.css'

const styles = {
  closeDrawerButton: {
    marginTop: '10px'
    , marginRight: '10px'
  },
  loginDrawer: {
    backgroundColor: '#765C9F'
  },
  loginDrawerWidth: 400, // px
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

  handleMessageSubmit = (params) => {
    this.props.postMessage(params)
  }

  scrollTo = to => scroll.scrollTo(to)

  render() {
    const { drawerIsOpen } = this.state
    const { location } = this.props
    const currentPath = location.pathname

    const availableRoutes = [
      {
        path: '/',
        component: HomeTab
      },
      {
        path: '/about',
        component: AboutTab
      }
    ]
    const currentTab = find(availableRoutes, { path: currentPath }) || availableRoutes[0]
    const ActiveTabComponent = currentTab.component

    return [
      <ActiveTabComponent
        key='activeTab'
        openDrawer={ this.openDrawer }
        scrollTo={ this.scrollTo }
        handleMessageSubmit={ this.handleMessageSubmit }
      />
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
    , login: params => dispatch(login(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
    , postMessage: params => dispatch(postMessage(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
