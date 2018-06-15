import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { animateScroll as scroll } from 'react-scroll'

import { openSideNav, closeSideNav, openTopBar, closeTopBar, signout, login } from '../actions'
import find from 'lodash/find'
import Home from './Home/Home'
import About from './About/About'

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

class Landing extends Component {
  constructor(props) {
    super(props)
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

  scrollTo = to => scroll.scrollTo(to)

  render() {
    const { location } = this.props
    const currentPath = location.pathname

    const availableRoutes = [
      {
        path: '/',
        component: Home
      },
      {
        path: '/onboarding', // prevents auto-redirect
        component: Home
      },
      {
        path: '/about',
        component: About
      }
    ]
    const currentTab = find(availableRoutes, { path: currentPath }) || availableRoutes[0]
    const ActiveTabComponent = currentTab.component

    return (
      <ActiveTabComponent
        key='activeTab'
        scrollTo={ this.scrollTo }
      />
    )
  }
}

export const HomeComponent = Landing


const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , login: params => dispatch(login(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Landing))
