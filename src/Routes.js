import React, { Component } from 'react'
import * as T from 'prop-types'
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AuthService from './utils/AuthService'
import { closeSideNav, openSideNav } from './actions'


const authService = new AuthService()



/**
 * Routing Components
 */
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import AuthorizedRoute from './Routes/AuthorizedRoute'


/**
 * Route Components/Containers
 */
import Home from './Home'
import Dashboard from './Dashboard/Dashboard'
import Projects from './Projects/Projects'
import UserProject from './UserProject/UserProject'
import LoginOrRegister from './LoginOrRegister/LoginOrRegister'
import AddOrEditLesson from './admin/AddOrEditLesson/AddOrEditLesson'
import ManageLessons from './admin/ManageLessons/ManageLessons'
import Lessons from './Lessons/Lessons'
import LessonWizard from './LessonWizard/LessonWizard'
import SideNav from './SideNav/SideNav'
import TopBar from './TopBar/TopBar'



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
  }

  toggleSideNav = () => {
    if(this.props.isSideNavOpen) {
      this.props.closeSideNav()
    } else {
      this.props.openSideNav()
    }

  }

  render() {
    const { isLoggedIn, isAdmin, isSideNavOpen, sideNavWidth, isTopBarOpen, topBarHeight } = this.props
    const sideNavWidthString = `${sideNavWidth}px`
    const topBarWidthString = `${topBarHeight}px`
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <div>
          <Helmet>
            <title>Kiwi Compute</title>
          </Helmet>
          <SideNav isOpen={ isSideNavOpen } isAdmin={ isAdmin } />
          <TopBar isOpen={ isTopBarOpen } sideNavWidth={ sideNavWidth } toggleSideNav={ this.toggleSideNav } />
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
                <Route path='/' exact component={ Home } />
                <Route path='/login' exact auth={ authService } component={ LoginOrRegister } />
                <Route path='/register' exact auth={ authService } component={ LoginOrRegister } />
                {/* ----------------- */}
                {/* Logged in routes  */}
                {/* ----------------- */}
                <AuthenticatedRoute path='/dashboard' exact component={ Dashboard } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/projects' exact component={ Projects } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/new' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/project/:id' exact component={ UserProject } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/lessons' exact component={ Lessons } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/lessons/new' exact component={ LessonWizard } isLoggedIn={ isLoggedIn } />
                <AuthenticatedRoute path='/lessons/:id' exact component={ LessonWizard } isLoggedIn={ isLoggedIn } />
                {/* ----------------- */}
                {/* Admin-only routes */}
                {/* ----------------- */}
                <AuthorizedRoute path='/admin/lessons' exact component={ ManageLessons } isLoggedIn={ isLoggedIn } isAdmin={ isAdmin } />
                <AuthorizedRoute path='/admin/lesson/new' exact component={ AddOrEditLesson } isLoggedIn={ isLoggedIn } isAdmin={ isAdmin } />
                <AuthorizedRoute path='/admin/lesson/:id' exact component={ AddOrEditLesson } isLoggedIn={ isLoggedIn } isAdmin={ isAdmin } />
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
  const { auth: { isLoggedIn, isAdmin }, sideNav: { sideNavWidth, isSideNavOpen }, topBar: { topBarHeight, isTopBarOpen } } = state

  return {
    isLoggedIn
    , isAdmin
    , isSideNavOpen
    , sideNavWidth
    , isTopBarOpen
    , topBarHeight
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , closeSideNav: () => dispatch(closeSideNav())
    , openSideNav: () => dispatch(openSideNav())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
