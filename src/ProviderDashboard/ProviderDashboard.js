import React, { Component, PureComponent } from 'react'
import * as T from 'prop-types'
import BluebirdPromise from 'bluebird'
import withRouter from 'react-router-dom/withRouter'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import { connect } from 'react-redux'
import has from 'lodash/has'
import ObjectID from 'bson-objectid'
import { getProfileDetails, getManyProfiles, getManySubscriptions, closeSideNav, closeTopBar, login, openSideNav, openTopBar, register } from '../actions'
import ProviderMenu from './ProviderMenu'

import Account from './Account/Account'
import Billing from './Billing/Billing'
import ChangePassword from './ChangePassword/ChangePassword'
import Subscriptions from './Subscriptions/Subscriptions'
import Toolbar from './Navigation/Toolbar'
import MobileDrawer from './Navigation/MobileDrawer'
import Drawer from './Navigation/Drawer'

import './overrides.css'

export const MENU_ITEMS = [
  { label: 'My Account', section: 'account', component: Account },
  { label: 'Billing Information', section: 'billing', component: Billing },
  { label: 'My Password', section: 'reset-password', component: ChangePassword },
  { label: 'Subscriptions', section: 'subscriptions', component: Subscriptions }
]

const LeftSide = props => <div className='providerDashboard-left'>{ props.children }</div>
const RightSide = props => <div className='providerDashboard-right'>{ props.children }</div>


class ProviderDashboard extends PureComponent {
  constructor(props) {
    super(props)
    const activeIndex = MENU_ITEMS.reduce((acc, each, idx) => {
      if(props.match.params.section === each.section)
        acc = idx
      return acc
    }, 0)
    this.state = {
      activeIndex,
      mobileOpen: false
    }
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
    , getProfileDetails: T.func.isRequired
    , getManySubscriptions: T.func.isRequired
    , getManyProfiles: T.func.isRequired
  }

  async componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
    const { userId, getProfileDetails, getManySubscriptions, getManyProfiles } = this.props
    const promises = [
      getManySubscriptions({ providerId: userId }),
      getManyProfiles(),
      getProfileDetails({ userId, billing: true })
    ]
    await BluebirdPromise.all(promises)
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
      const base = '/provider'
      const append = `/${MENU_ITEMS[nextState.activeIndex].section}`
      this.props.history.replace(base + append)
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render() {
    const { activeIndex, mobileOpen } = this.state
    const activeMenuItemObject = MENU_ITEMS[activeIndex]
    const ActiveMenuItemComponent = activeMenuItemObject.component

    return (
      <div className='providerDashboard-container'>
        <Toolbar />
        <MobileDrawer isOpen={ mobileOpen } />
        <div className='providerDashboard-header'>
          <h2>Account Settings</h2>
        </div>
        <div className='providerDashboard-body'>
          <Drawer
            isOpen={ mobileOpen }
            activeIndex={ activeIndex }
            onSelect={ i => { this.setState({ activeIndex: i }) } }
          />
          <RightSide>
            <ActiveMenuItemComponent />
          </RightSide>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId } } = state
  return {
    userId
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
    , getProfileDetails: params => dispatch(getProfileDetails(params))
    , getManySubscriptions: params => dispatch(getManySubscriptions(params))
    , getManyProfiles: params => dispatch(getManyProfiles(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProviderDashboard))
