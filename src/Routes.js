import React, { Component } from 'react'
import Loadable from 'react-loadable'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Redirect from 'react-router-dom/Redirect'

/**
 * Routing Components
 */
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import SubscriptionRoute from './Routes/SubscriptionRoute'
import AuthorizedRoute from './Routes/AuthorizedRoute'
import PlainRoute from './Routes/PlainRoute'

import Loading from './Loading/Loading'
import Landing from './Landing/Landing'
import StudentOnboarding from './StudentOnboarding/StudentOnboarding'
import Welcome from './WelcomeWizard/WelcomeWizard'
import UserProjects from './UserProjects/UserProjects'
import UserProject from './UserProject/UserProject'
import LoginOrRegister from './LoginOrRegister/LoginOrRegister'
import UserLessonWizard from './UserLessonWizard/UserLessonWizard'
import SignOut from './SignOut/SignOut'
import StandaloneEditor from './StandaloneEditor/StandaloneEditor'
import ProviderDashboard from './ProviderDashboard/ProviderDashboard'
import EmailVerification from './EmailVerification/EmailVerification'
import BetaLessons from './BetaLessons/BetaLessons'
import InvalidSubscription from './InvalidSubscription/InvalidSubscription'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'

import {
  closeSideNav, openSideNav, setGlobalColors, setTopBarTitle, signout, toggleTopBarTitleIsDisabled
} from './actions'

const Lessons = Loadable({ loader: () => import('./Lessons/Lessons'), loading: Loading })
const ForgotPasswordWizard = Loadable({ loader: () => import('./ForgotPasswordWizard/ForgotPasswordWizard'), loading: Loading })
const AddOrEditLesson = Loadable({ loader: () => import('./admin/AddOrEditLesson/AddOrEditLesson'), loading: Loading })
const ProviderLoginOrRegister = Loadable({ loader: () => import('./ProviderLoginOrRegister/ProviderLoginOrRegister'), loading: Loading })
const AddOrEditLessonTheme = Loadable({ loader: () => import('./admin/AddOrEditLessonTheme/AddOrEditLessonTheme'), loading: Loading })
const AddOrEditVariable = Loadable({ loader: () => import('./admin/AddOrEditVariable/AddOrEditVariable'), loading: Loading })
const AddOrEditSubscription = Loadable({ loader: () => import('./admin/AddOrEditSubscription/AddOrEditSubscription'), loading: Loading })
const ManageLessons = Loadable({ loader: () => import('./admin/ManageLessons/ManageLessons'), loading: Loading })
const ManageLessonThemes = Loadable({ loader: () => import('./admin/ManageLessonThemes/ManageLessonThemes'), loading: Loading })
const ManageVariables = Loadable({ loader: () => import('./admin/ManageVariables/ManageVariables'), loading: Loading })
const ManageSubscriptions = Loadable({ loader: () => import('./admin/ManageSubscriptions/ManageSubscriptions'), loading: Loading })
const Signups = Loadable({ loader: () => import('./admin/Signups/Signups'), loading: Loading })

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
    , isAdmin: T.bool.isRequired
    , isProvider: T.bool.isRequired
    , setTopBarTitle: T.func.isRequired
    , toggleTopBarTitleIsDisabled: T.func.isRequired
    , setGlobalColors: T.func.isRequired
    , globalColors: T.object.isRequired
    , subscription: T.object.isRequired
  }

  render() {
    const {
      isLoggedIn, isAdmin, isProvider, setTopBarTitle, toggleTopBarTitleIsDisabled, setGlobalColors, globalColors, subscription
    } = this.props

    const routeProps = {
      isLoggedIn, subscription, isAdmin,
      isProvider, setTopBarTitle, setGlobalColors,
      toggleTopBarTitleIsDisabled,
      ...globalColors
    }

    return (
      <Switch>
        {/* ----------------- */}
        {/* Logged out routes */}
        {/* ----------------- */}
        <PlainRoute path='/' exact render={() => (
          isLoggedIn && isProvider ? (
            <Redirect to='/provider/dashboard' />
          ) : isLoggedIn ? (
            <Redirect to='/lessons' />
          ) : (
            <Landing />
          )
        )} />
        <PlainRoute path='/signup-modal' exact component={ Landing } />
        <PlainRoute path='/student' exact component={ StudentOnboarding } />
        <PlainRoute path='/about' exact component={ Landing } />
        <PlainRoute path='/login' exact component={ LoginOrRegister } />
        <PlainRoute path='/register' exact component={ LoginOrRegister } />
        <PlainRoute path='/provider/login' exact component={ ProviderLoginOrRegister } />
        <PlainRoute path='/provider/register' exact component={ ProviderLoginOrRegister } />
        <PlainRoute path='/signout' exact component={ SignOut } />
        <PlainRoute path='/password' exact component={ ForgotPasswordWizard } />
        <PlainRoute path='/python' exact component={ StandaloneEditor } />
        <PlainRoute path='/email-verification' exact component={ EmailVerification } />
        {/* ----------------- */}
        {/* Logged in routes  */}
        {/* ----------------- */}
        <AuthenticatedRoute exact
          path='/invalid-subscription' component={ InvalidSubscription } { ...routeProps }
        />
        <AuthenticatedRoute exact
          path='/welcome' component={ Welcome } { ...routeProps }
        />
        <AuthenticatedRoute exact
          path='/projects' component={ UserProjects } title='Projects' { ...routeProps }
        />
        <AuthenticatedRoute exact
          path='/project/new' component={ UserProject } title='name me!' topBarTitleDisabled={ false } { ...routeProps }
        />
        <AuthenticatedRoute exact
          path='/project/:id' component={ UserProject } topBarTitleDisabled={ false } { ...routeProps }
        />
        <SubscriptionRoute exact
          path='/lessons' component={ Lessons } title='Lessons' { ...routeProps }
        />
        <AuthenticatedRoute exact
          path='/lessons/beta' component={ BetaLessons } title='Lessons (Beta)' { ...routeProps }
        />
        <AuthenticatedRoute exact
          path='/lessons/:id' component={ UserLessonWizard } { ...routeProps }
        />
        {/* ----------------- */}
        {/* Admin-only routes */}
        {/* ----------------- */}
        <AuthorizedRoute exact
          path='/admin/lessons' component={ ManageLessons } title='Manage Lessons' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/lessons/themes' component={ ManageLessonThemes } title='Manage Lesson Themes' { ...routeProps }
        />

        <AuthorizedRoute exact
          path='/admin/lessons/new' component={ AddOrEditLesson } title='Create new lesson' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/lessons/:id' component={ AddOrEditLesson } title='Edit Lesson' { ...routeProps }
        />

        <AuthorizedRoute exact
          path='/admin/lessons/themes/new' component={ AddOrEditLessonTheme } title='Create new Lesson Theme' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/lessons/themes/:id' component={ AddOrEditLessonTheme } title='Edit Lesson Theme' { ...routeProps }
        />

        <AuthorizedRoute exact
          path='/admin/variables' component={ ManageVariables } title='Manage Variables' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/variables/new' component={ AddOrEditVariable } title='Create new Variable' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/variables/:id' component={ AddOrEditVariable } title='Edit Variable' { ...routeProps }
        />

        <AuthorizedRoute exact
          path='/admin/subscriptions' component={ ManageSubscriptions } title='Manage Subscriptions' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/subscriptions/new' component={ AddOrEditSubscription } title='Create new Subscription' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/subscriptions/:id' component={ AddOrEditSubscription } title='Edit Subscription' { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/signups' component={ Signups } title='See Beta Signups' { ...routeProps }
        />
        {/* ----------------- */}
        {/* Provider routes */}
        {/* ----------------- */}
        <AuthorizedRoute exact
          path='/provider/account' component={ ProviderDashboard } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/provider/students/new' component={ ProviderDashboard } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/provider/students/:id' component={ ProviderDashboard } { ...routeProps }
        />
        <AuthorizedRoute exact
         path='/provider/:section/:id' component={ ProviderDashboard } { ...routeProps }
        />
        <AuthorizedRoute
          path='/provider/:section' component={ ProviderDashboard } { ...routeProps }
        />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    auth: { isLoggedIn, isAdmin, isProvider, subscription },
    globalColors,
  } = state

  return {
    isLoggedIn
    , subscription
    , isAdmin
    , isProvider
    , globalColors
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))

