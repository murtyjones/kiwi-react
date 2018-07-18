import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import BluebirdPromise from 'bluebird'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import has from 'lodash/has'
import withStyles from '@material-ui/core/styles/withStyles'

import { getProfileDetails, getManyProfiles, getManySubscriptions, login, register } from '../actions'

import DashboardHeader from './DashboardHeader/DashboardHeader'
import Toolbar from './Navigation/Toolbar'
import MobileDrawer from './Navigation/MobileDrawer'
import Drawer from './Navigation/Drawer'
import { MENU_ITEMS } from './Navigation/DrawerContents'
import withoutMainNavigation from '../hocs/withoutMainNavigation'
import { AccountInfo, PaymentInfo, ExploreTechIsland } from './HotLinks/HotLinks'

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: 950,
    minWidth: 768,
    margin: '0 auto',
    paddingTop: 20,
    minHeight: 100,
    display: 'flex'
  },
  dashboard: {
    backgroundColor: '#FFFFFF',
    padding: '0 10px',
    boxSizing: 'border-box',
    position: 'relative',
    minHeight: '100vh',
    flexGrow: 1
  },
  '@global': {
    "div[role='menu']": {
      padding: '0 !important'
    }
  }
})

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
    const { userId, getProfileDetails, getManySubscriptions, getManyProfiles } = this.props
    const promises = [
      getManySubscriptions({ providerId: userId }),
      getManyProfiles(),
      getProfileDetails({ userId, includeBilling: true })
    ]
    await BluebirdPromise.all(promises)
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
    const { classes } = this.props
    const { activeIndex, mobileOpen } = this.state
    const activeMenuItemObject = MENU_ITEMS[activeIndex]
    const ActiveMenuItemComponent = activeMenuItemObject.component

    return (
      <Fragment>
        <Toolbar
          activeIndex={ activeIndex }
          onSelect={ i => { this.setState({ activeIndex: i }) } }
          handleDrawerToggle={ this.handleDrawerToggle }
        />
        <DashboardHeader
          mainMessage='hello there'
          subMessage='nice to meet you. i love you very much. have a nice day.'
          hotLinks={ [ AccountInfo, PaymentInfo, ExploreTechIsland ] }
        />
        <div className={ classes.container }>
          <MobileDrawer
            isOpen={ mobileOpen }
            activeIndex={ activeIndex }
            onSelect={ i => { this.setState({ activeIndex: i }) } }
            handleDrawerToggle={ this.handleDrawerToggle }
          />
          <div className={ classes.dashboard }>
            <ActiveMenuItemComponent />
          </div>
        </div>
      </Fragment>
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
    , getProfileDetails: params => dispatch(getProfileDetails(params))
    , getManySubscriptions: params => dispatch(getManySubscriptions(params))
    , getManyProfiles: params => dispatch(getManyProfiles(params))
  }
}

ProviderDashboard = withoutMainNavigation(ProviderDashboard)

ProviderDashboard = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProviderDashboard))

export default withStyles(styles, { withTheme: true })(ProviderDashboard)