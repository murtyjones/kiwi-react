
import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import BluebirdPromise from 'bluebird'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import has from 'lodash/has'
import get from 'lodash/get'
import Link from 'react-router-dom/Link'
import withStyles from '@material-ui/core/styles/withStyles'

import {
  getProfileDetails,
  getManyProfiles,
  getManySubscriptions,
  login,
  register,
  resendVerificationEmail
} from '../actions'

import DashboardHeader from './DashboardHeader/DashboardHeader'
import Toolbar from './Navigation/Toolbar'
import MobileDrawer from './Navigation/MobileDrawer'
import Drawer from './Navigation/Drawer'
import { MENU_ITEMS } from './Navigation/DrawerContents'
import withoutMainNavigation from '../hocs/withoutMainNavigation'
import { AccountInfo, PaymentInfo, ExploreTechIsland } from './HotLinks/HotLinks'

const errorColor = '#FF5472'
const successColor = '#52cc4a'

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: 950,
    minWidth: 768,
    margin: '0 auto',
    paddingTop: 20,
    minHeight: 100,
    boxSizing: 'border-box',
    padding: '0 15px',
  },
  dashboard: {
    position: 'relative',
    minHeight: '100vh',
    flexGrow: 1,
  },
  divider: {
    width: '100%',
    maxWidth: 950,
    minWidth: 768,
    height: 1,
    backgroundColor: '#AAAAAA',
    marginBottom: 15
  },
  needEmailVerification: {
    color: errorColor
  },
  sent: {
    color: successColor
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
      if (props.match.url.includes(each.section))
        acc = idx
      return acc
    }, 0)
    this.state = {
      activeIndex,
      mobileOpen: false,
      isEmailSent: false
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
    , resendVerificationEmail: T.func.isRequired
    , getManyProfiles: T.func.isRequired
    , classes: T.object.isRequired
    , profile: T.object.isRequired
    , match: T.object.isRequired
  }

  async UNSAFE_componentWillMount() {
    const { userId, getProfileDetails, getManySubscriptions, getManyProfiles } = this.props
    const promises = [
      getManySubscriptions({ providerId: userId }),
      getManyProfiles(),
      getProfileDetails({ userId, includeBilling: true })
    ]
    await BluebirdPromise.all(promises)
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // replace browser history if activeIndex has changed
    if (has(nextState, 'activeIndex') && nextState.activeIndex !== this.state.activeIndex) {
      const base = '/provider'
      const append = `/${MENU_ITEMS[nextState.activeIndex].section}`
      this.props.history.replace(base + append)
    }
    // change activeIndex if url has changed
    if (nextProps.match.url !== this.props.match.url) {
      const activeIndex = MENU_ITEMS.reduce((acc, each, idx) => {
        if (nextProps.match.url.includes(each.section))
          acc = idx
        return acc
      }, 0)
      this.setState({ activeIndex })
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  resendVerificationEmail = () => {
    this.props.resendVerificationEmail(this.props.userId)
    this.setState({ isEmailSent: true })
  }

  render() {
    const { classes, profile } = this.props
    const { activeIndex, mobileOpen, isEmailSent } = this.state
    const activeMenuItemObject = MENU_ITEMS[activeIndex]
    const ActiveMenuItemComponent = activeMenuItemObject.component


    return (
      <Fragment>
        <Toolbar
          activeIndex={ activeIndex }
          onSelect={ i => { this.setState({ activeIndex: i }) } }
          handleDrawerToggle={ this.handleDrawerToggle }
        />
        <div className={ classes.container }>
          <DashboardHeader
            mainMessage={ profile.firstName ? `Hi ${profile.firstName}!` : 'Hello there!' }
            subMessage={ !profile.isEmailVerified
              ?
              <div className={ classes.needEmailVerification }>
                Please verify your email address so that we can restore your password in the
                event that you ever lose it.&nbsp;
                <Link to='#' onClick={ this.resendVerificationEmail }>
                  Click here to resend verification email.
                </Link>
                { isEmailSent && <div className={ classes.sent }>Sent!</div> }
              </div>
              : 'Thanks for working with parents across the country to create a\n' +
              'generation of self taught kid programmers!'
            }
            hotLinks={ [ AccountInfo, PaymentInfo, ExploreTechIsland ] }
          />
          <div className={ classes.divider } />
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
  const { auth: { userId }, profiles: { profilesById } } = state
  const profile = profilesById[userId] || {}
  return {
    profile,
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
    , resendVerificationEmail: params => dispatch(resendVerificationEmail(params))
  }
}

ProviderDashboard = withoutMainNavigation(ProviderDashboard)

ProviderDashboard = withStyles(styles, { withTheme: true })(ProviderDashboard)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProviderDashboard))