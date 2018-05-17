import React, { Component, PureComponent } from 'react'
import * as T from 'prop-types'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { get, find, has } from 'lodash'
import { closeSideNav, closeTopBar, login, openSideNav, openTopBar, register } from '../actions'
import ProviderMenu from './ProviderMenu'

import Profile from './Profile/Profile'
import ResetPassword from './ResetPassword/ResetPassword'
import Subscriptions from './Subscriptions/Subscriptions'

import './overrides.css'

export const MENU_ITEMS = [
  { label: 'Profile', url: '/profile', component: Profile },
  { label: 'Reset Password', url: '/reset-password', component: ResetPassword },
  { label: 'Subscriptions', url: '/subscriptions', component: Subscriptions }
]

const LeftSide = props => <div className='providerDashboard-left'>{ props.children }</div>
const RightSide = props => <div className='providerDashboard-right'>{ props.children }</div>


class ProviderDashboard extends PureComponent {
  constructor(props) {
    super(props)
    const activeIndex = MENU_ITEMS.reduce((acc, each, idx) => {
      if(props.location.pathname.includes(each.url))
        acc = idx
      return acc
    }, 0)
    this.state = { activeIndex }
  }

  static propTypes = {
    greeting: T.string
    , login: T.func
    , signout: T.func
    , register: T.func
    , closeSideNav: T.func
    , openSideNav: T.func
    , openTopBar: T.func
    , closeTopBar: T.func
    , history: T.any
    , location: T.any
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  componentWillUpdate(nextProps, nextState) {
    if(has(nextState, 'activeIndex') && nextState.activeIndex !== this.state.activeIndex) {
      const base = this.props.match.path
      const append = MENU_ITEMS[nextState.activeIndex].url
      this.props.history.replace(base + append)
    }
  }

  switchTabs = () => {
    const { location, history } = this.props
    const to = location.pathname === '/login' ? '/register' : '/login'
    history.push(to)
  }

  render() {
    const { activeIndex } = this.state
    const activeMenuItemObject = MENU_ITEMS[activeIndex]
    const ActiveMenuItemComponent = activeMenuItemObject.component

    return (
      <div className='providerDashboard-container'>
        <div className='providerDashboard-header'>
          <h2>Account Settings</h2>
        </div>
        <LeftSide>
          <ProviderMenu
            activeIndex={ activeIndex }
            onSelect={ i => { this.setState({ activeIndex: i }) } }
          />
        </LeftSide>
        <RightSide>
          <ActiveMenuItemComponent />
        </RightSide>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: params => dispatch(login(params))
    , register: params => dispatch(register(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}


export default withRouter(connect(null, mapDispatchToProps)(ProviderDashboard))
