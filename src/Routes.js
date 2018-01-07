import React, { Component } from 'react'
import * as T from 'prop-types'
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AuthService from './utils/AuthService'
import { closeSideNav, openSideNav, setTopBarTitle } from './actions'


const authService = new AuthService()



/**
 * Routing Components
 */
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import AuthorizedRoute from './Routes/AuthorizedRoute'


/**
 * Route Components/Containers
 */
import Home from './Home/Home'
import Dashboard from './Dashboard/Dashboard'
import Projects from './Projects/Projects'
import UserProject from './UserProject/UserProject'
import LoginOrRegister from './LoginOrRegister/LoginOrRegister'
import AddOrEditLesson from './admin/AddOrEditLesson/AddOrEditLesson'
import AddOrEditLessonTheme from './admin/AddOrEditLessonTheme/AddOrEditLessonTheme'
import ManageLessons from './admin/ManageLessons/ManageLessons'
import ManageLessonThemes from './admin/ManageLessonThemes/ManageLessonThemes'
import Lessons from './Lessons/Lessons'
import UserLessonWizard from './UserLessonWizard/UserLessonWizard'
import SideNav from './SideNav/SideNav'
import TopBar from './TopBar/TopBar'
import SignOut from './SignOut/SignOut'



let baseAppStyle = {
  borderRadius: 0
  , margin: 0
  , position: "absolute"
  , top: '60px'
  , right: 0
  , bottom: 0
  , fontFamily: "Roboto, sans-serif"
}

const nonMenuStyle = {
  width: '100%'
  , height: '100%'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
    , isAdmin: T.bool.isRequired
    , isSideNavOpen: T.bool.isRequired
    , sideNavWidth: T.number.isRequired
    , isTopBarOpen: T.bool.isRequired
    , topBarHeight: T.number.isRequired
    , topBarTitle: T.string.isRequired
    , topBarTitleDisabled: T.bool.isRequired
  }

  toggleSideNav = () => {
    if(this.props.isSideNavOpen) {
      this.props.closeSideNav()
    } else {
      this.props.openSideNav()
    }
  }

  render() {
    const { isLoggedIn, isAdmin, isSideNavOpen, sideNavWidth, isTopBarOpen, topBarHeight, topBarTitle, topBarTitleDisabled, setTopBarTitle, topBarFocused } = this.props
    const sideNavWidthString = `${sideNavWidth}px`
    const topBarWidthString = `${topBarHeight}px`
    const extras = { isLoggedIn, isAdmin, setTopBarTitle }
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <div>
          <Helmet>
            <title>Kiwi Compute</title>
          </Helmet>
          <SideNav isOpen={ isSideNavOpen } { ...extras } />
          <TopBar
            isOpen={ isTopBarOpen }
            isFocused={ topBarFocused }
            title={ topBarTitle }
            titleDisabled={ topBarTitleDisabled }
            sideNavWidth={ sideNavWidth }
            handleTitleChange={ setTopBarTitle }
            toggleSideNav={ this.toggleSideNav }
          />
          <div className={ cns('baseAppStyles') } style={{
            ...baseAppStyle
            , left: sideNavWidthString
            , top: topBarWidthString
            }
          }>
            <div style={ nonMenuStyle }>
              <Switch>
                {/* ----------------- */}
                {/* Logged out routes */}
                {/* ----------------- */}
                <Route path='/' exact render={() => (
                  isLoggedIn ? (
                    <Redirect to="/lessons"/>
                  ) : (
                    <Home />
                  )
                )} />
                <Route path='/login' exact component={ LoginOrRegister } />
                <Route path='/register' exact component={ LoginOrRegister } />
                <Route path='/signout' exact component={ SignOut } />
                {/* ----------------- */}
                {/* Logged in routes  */}
                {/* ----------------- */}
                <AuthenticatedRoute path='/dashboard' exact component={ Dashboard } { ...extras } />
                <AuthenticatedRoute path='/projects' exact component={ Projects } { ...extras } />
                <AuthenticatedRoute path='/project/new' exact component={ UserProject } { ...extras } />
                <AuthenticatedRoute path='/project/:id' exact component={ UserProject } { ...extras } />
                <AuthenticatedRoute path='/lessons' exact component={ Lessons } { ...extras } />
                <AuthenticatedRoute path='/lessons/new' exact component={ UserLessonWizard } { ...extras } />
                <AuthenticatedRoute path='/lessons/:id' exact component={ UserLessonWizard } { ...extras } />
                {/* ----------------- */}
                {/* Admin-only routes */}
                {/* ----------------- */}
                <AuthorizedRoute path='/admin/lessons' exact component={ ManageLessons } { ...extras } />
                <AuthorizedRoute path='/admin/lessons/themes' exact component={ ManageLessonThemes } { ...extras } />
                <AuthorizedRoute path='/admin/lessons/new' exact component={ AddOrEditLesson } { ...extras } />
                <AuthorizedRoute path='/admin/lessons/:id' exact component={ AddOrEditLesson } { ...extras } />
                <AuthorizedRoute path='/admin/lessons/themes/new' exact component={ AddOrEditLessonTheme } { ...extras } />
                <AuthorizedRoute path='/admin/lessons/themes/:id' exact component={ AddOrEditLessonTheme } { ...extras } />
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
  const { auth: { isLoggedIn, isAdmin }, sideNav: { sideNavWidth, isSideNavOpen }, topBar: { topBarHeight, isTopBarOpen, topBarTitle, topBarTitleDisabled, topBarFocused } } = state

  return {
    isLoggedIn
    , isAdmin
    , isSideNavOpen
    , sideNavWidth
    , isTopBarOpen
    , topBarHeight
    , topBarTitle
    , topBarTitleDisabled
    , topBarFocused
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , closeSideNav: () => dispatch(closeSideNav())
    , openSideNav: () => dispatch(openSideNav())
    , setTopBarTitle: (title) => dispatch(setTopBarTitle(title))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
