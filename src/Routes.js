import React, { Component } from 'react'
import * as T from 'prop-types'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Redirect from 'react-router-dom/Redirect'
import withRouter from 'react-router-dom/withRouter'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AuthService from './utils/AuthService'
import { closeSideNav, openSideNav, openModal, closeModal, setTopBarTitle, toggleTopBarTitleIsDisabled, setGlobalColors, signout } from './actions'


const authService = new AuthService()

Modal.setAppElement(document.getElementById('app'))


/**
 * Routing Components
 */
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import AuthorizedRoute from './Routes/AuthorizedRoute'


/**
 * Route Components/Containers
 */
import Landing from './Landing/Landing'
import Welcome from './WelcomeWizard/WelcomeWizard'
import Dashboard from './Dashboard/Dashboard'
import UserProjects from './UserProjects/UserProjects'
import UserProject from './UserProject/UserProject'
import LoginOrRegister from './LoginOrRegister/LoginOrRegister'
import ProviderLoginOrRegister from './ProviderLoginOrRegister/ProviderLoginOrRegister'
import AddOrEditLesson from './admin/AddOrEditLesson/AddOrEditLesson'
import AddOrEditLessonTheme from './admin/AddOrEditLessonTheme/AddOrEditLessonTheme'
import AddOrEditVariable from './admin/AddOrEditVariable/AddOrEditVariable'
import AddOrEditSubscription from './admin/AddOrEditSubscription/AddOrEditSubscription'
import ManageLessons from './admin/ManageLessons/ManageLessons'
import ManageLessonThemes from './admin/ManageLessonThemes/ManageLessonThemes'
import ManageVariables from './admin/ManageVariables/ManageVariables'
import Signups from './admin/Signups/Signups'
import ManageSubscriptions from './admin/ManageSubscriptions/ManageSubscriptions'
import Lessons from './Lessons/Lessons'
import UserLessonWizard from './UserLessonWizard/UserLessonWizard'
import SideNav from './SideNav/SideNav'
import TopBar from './TopBar/TopBar'
import SignOut from './SignOut/SignOut'
import ForgotPasswordWizard from './ForgotPasswordWizard/ForgotPasswordWizard'
import StandaloneEditor from './StandaloneEditor/StandaloneEditor'
import ProviderDashboard from './ProviderDashboard/ProviderDashboard'
import EmailVerification from './EmailVerification/EmailVerification'
import BetaLessons from './BetaLessons/BetaLessons'


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
    , top: 0
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

class App extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
    , isAdmin: T.bool.isRequired
    , isSideNavOpen: T.bool.isRequired
    , sideNavWidth: T.number.isRequired
    , isTopBarOpen: T.bool.isRequired
    , topBarHeight: T.number.isRequired
    , topBarTitle: T.string
    , topBarTitleDisabled: T.bool.isRequired
    , setTopBarTitle: T.func.isRequired
    , setGlobalColors: T.func.isRequired
    , openModal: T.func.isRequired
    , closeModal: T.func.isRequired
    , modal: T.object.isRequired
  }

  toggleSideNav = () =>
    this.props.isSideNavOpen ? this.props.closeSideNav() : this.props.openSideNav()

  render() {
    const { modal, isLoggedIn, isAdmin, isProvider, isSideNavOpen, sideNavWidth, isTopBarOpen, topBarHeight, topBarTitle, topBarTitleDisabled, setTopBarTitle, toggleTopBarTitleIsDisabled, setGlobalColors, topBarFocused, primaryColor, secondaryColor, textColor } = this.props
    const topBarWidthString = `${topBarHeight}px`
    const extras = { isLoggedIn, isAdmin, isProvider, setTopBarTitle, setGlobalColors, primaryColor, secondaryColor, textColor, toggleTopBarTitleIsDisabled }

    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <div>
          { process.env.NODE_ENV !== "production" &&
              <EnvironmentReminder />
          }
          <Helmet>
            <title>Kiwi Compute</title>
          </Helmet>
          <Modal
            isOpen={ modal.isOpen }
            onRequestClose={ this.props.closeModal }
            className={ modal.className }
            overlayClassName={ modal.overlayClassName ? modal.overlayClassName : 'ModalOverlay' }
          >
            { modal.children }
          </Modal>
          <SideNav
            isOpen={ isSideNavOpen }
            toggleSideNav={ this.toggleSideNav }
            { ...extras }
          />
          <TopBar
            isOpen={ isTopBarOpen }
            backgroundColor={ primaryColor }
            textColor={ textColor }
            isFocused={ topBarFocused }
            title={ topBarTitle }
            titleDisabled={ topBarTitleDisabled }
            sideNavWidth={ sideNavWidth }
            handleTitleChange={ setTopBarTitle }
            toggleSideNav={ this.toggleSideNav }
          />
          <div
            className={ cns('baseAppStyles') }
            style={ {
              ...baseAppStyle
              , top: topBarWidthString
              }
            }
          >
            <div style={ nonMenuStyle }>
              <Switch>
                {/* ----------------- */}
                {/* Logged out routes */}
                {/* ----------------- */}
                <Route path='/' exact render={() => (
                  isLoggedIn ? (
                    <Redirect to="/lessons"/>
                  ) : (
                    <Landing />
                  )
                )} />
                <Route path='/about' exact component={ Landing } />
                <Route path='/login' exact component={ LoginOrRegister } />
                <Route path='/register' exact component={ LoginOrRegister } />
                <Route path='/provider/login' exact component={ ProviderLoginOrRegister } />
                <Route path='/provider/register' exact component={ ProviderLoginOrRegister } />
                <Route path='/signout' exact component={ SignOut } />
                <Route path='/password' exact component={ ForgotPasswordWizard } />
                <Route path='/python' exact component={ StandaloneEditor } />
                <Route path='/email-verification' exact component={ EmailVerification } />
                {/* ----------------- */}
                {/* Logged in routes  */}
                {/* ----------------- */}
                <AuthenticatedRoute path='/welcome' exact component={ Welcome } { ...extras } />
                <AuthenticatedRoute path='/projects' exact component={ UserProjects } title='Projects' { ...extras } />
                <AuthenticatedRoute path='/project/new' exact component={ UserProject } title='name me!' topBarTitleDisabled={ false } { ...extras } />
                <AuthenticatedRoute path='/project/:id' exact component={ UserProject } topBarTitleDisabled={ false } { ...extras } />
                <AuthenticatedRoute path='/lessons' exact component={ Lessons } title='Lessons' { ...extras } />
                <AuthenticatedRoute path='/lessons/beta' exact component={ BetaLessons } title='Lessons (Beta)' { ...extras } />
                <AuthenticatedRoute path='/lessons/:id' exact component={ UserLessonWizard } { ...extras } />
                {/* ----------------- */}
                {/* Admin-only routes */}
                {/* ----------------- */}
                <AuthorizedRoute path='/admin/lessons' exact component={ ManageLessons } title='Manage Lessons' { ...extras } />
                <AuthorizedRoute path='/admin/lessons/themes' exact component={ ManageLessonThemes } title='Manage Lesson Themes' { ...extras } />

                <AuthorizedRoute path='/admin/lessons/new' exact component={ AddOrEditLesson } title='Create new lesson' { ...extras } />
                <AuthorizedRoute path='/admin/lessons/:id' exact component={ AddOrEditLesson } title='Edit Lesson' { ...extras } />

                <AuthorizedRoute path='/admin/lessons/themes/new' exact component={ AddOrEditLessonTheme } title='Create new Lesson Theme' { ...extras } />
                <AuthorizedRoute path='/admin/lessons/themes/:id' exact component={ AddOrEditLessonTheme } title='Edit Lesson Theme' { ...extras } />

                <AuthorizedRoute path='/admin/variables' exact component={ ManageVariables } title='Manage Variables' { ...extras } />
                <AuthorizedRoute path='/admin/variables/new' exact component={ AddOrEditVariable } title='Create new Variable' { ...extras } />
                <AuthorizedRoute path='/admin/variables/:id' exact component={ AddOrEditVariable } title='Edit Variable' { ...extras } />

                <AuthorizedRoute path='/admin/subscriptions' exact component={ ManageSubscriptions } title='Manage Subscriptions' { ...extras } />
                <AuthorizedRoute path='/admin/subscriptions/new' exact component={ AddOrEditSubscription } title='Create new Subscription' { ...extras } />
                <AuthorizedRoute path='/admin/subscriptions/:id' exact component={ AddOrEditSubscription } title='Edit Subscription' { ...extras } />

                <AuthorizedRoute path='/admin/signups' exact component={ Signups } title='See Beta Signups' { ...extras } />
                {/* ----------------- */}
                {/* Provider routes */}
                {/* ----------------- */}
                <AuthorizedRoute path='/provider/:section/:id' exact component={ ProviderDashboard } title='Dashboard' { ...extras } />
                <AuthorizedRoute path='/provider/:section' component={ ProviderDashboard } title='Dashboard' { ...extras } />
              </Switch>
              </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export const AppComponent = App

const mapStateToProps = (state) => {
  const {
    auth: { isLoggedIn, isAdmin, isProvider },
    sideNav: { sideNavWidth, isSideNavOpen },
    topBar: { topBarHeight, isTopBarOpen, topBarTitle, topBarTitleDisabled, topBarFocused },
    globalColors: { primaryColor, secondaryColor, textColor },
    modal
  } = state

  return {
    isLoggedIn
    , isAdmin
    , isProvider
    , isSideNavOpen
    , sideNavWidth
    , isTopBarOpen
    , topBarHeight
    , topBarTitle
    , topBarTitleDisabled
    , topBarFocused
    , primaryColor
    , secondaryColor
    , textColor
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
    , setGlobalColors: params => dispatch(setGlobalColors(params))
    , openModal: params => dispatch(openModal(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
