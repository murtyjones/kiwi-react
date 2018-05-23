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

import Profile from './Profile/Profile'
import ChangePassword from './ChangePassword/ChangePassword'
import Subscriptions from './Subscriptions/Subscriptions'

import './overrides.css'

export const MENU_ITEMS = [
  { label: 'Profile', section: 'profile', component: Profile },
  { label: 'Reset Password', section: 'reset-password', component: ChangePassword },
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
      getProfileDetails({ userId })
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
