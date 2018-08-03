import React, { Component } from 'react'
import Loadable from 'react-loadable'
import config from 'config'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Redirect from 'react-router-dom/Redirect'

/**
 * Routing Components
 */
import AuthenticatedRoute from './AuthenticatedRoute'
import SubscriptionRoute from './SubscriptionRoute'
import AuthorizedRoute from './AuthorizedRoute'
import PlainRoute from './PlainRoute'

import Loading from '../Loading/Loading'
import Landing from '../Landing/Landing'
import StudentOnboarding from '../StudentOnboarding/StudentOnboarding'
import UserProjects from '../UserProjects/UserProjects'
import UserProject from '../UserProject/UserProject'
import LoginOrRegister from '../LoginOrRegister/LoginOrRegister'
import UserLessonWizard from '../UserLessonWizard/UserLessonWizard'
import SignOut from '../SignOut/SignOut'
import StandaloneEditor from '../StandaloneEditor/StandaloneEditor'
import ProviderDashboard from '../ProviderDashboard/ProviderDashboard'
import EmailVerification from '../EmailVerification/EmailVerification'
import BetaLessons from '../BetaLessons/BetaLessons'
import InvalidSubscription from '../InvalidSubscription/InvalidSubscription'
import Terms from '../Terms/Terms'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'

import { setGlobalColors, signout } from '../actions/index'

const LessonMap = Loadable({ loader: () => import('../LessonMap/LessonMap'), loading: Loading })
const AddOrEditLesson = Loadable({ loader: () => import('../admin/AddOrEditLesson/AddOrEditLesson'), loading: Loading })
const ProviderLoginOrRegister = Loadable({ loader: () => import('../ProviderLoginOrRegister/ProviderLoginOrRegister'), loading: Loading })
const AddOrEditVariable = Loadable({ loader: () => import('../admin/AddOrEditVariable/AddOrEditVariable'), loading: Loading })
const AddOrEditSubscription = Loadable({ loader: () => import('../admin/AddOrEditSubscription/AddOrEditSubscription'), loading: Loading })
const ManageLessons = Loadable({ loader: () => import('../admin/ManageLessons/ManageLessons'), loading: Loading })
const ManageVariables = Loadable({ loader: () => import('../admin/ManageVariables/ManageVariables'), loading: Loading })
const ManageSubscriptions = Loadable({ loader: () => import('../admin/ManageSubscriptions/ManageSubscriptions'), loading: Loading })
const Signups = Loadable({ loader: () => import('../admin/Signups/Signups'), loading: Loading })

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isLoggedIn: T.bool.isRequired
    , isAdmin: T.bool.isRequired
    , isProvider: T.bool.isRequired
    , setGlobalColors: T.func.isRequired
    , globalColors: T.object.isRequired
    , subscription: T.object.isRequired
    , temporaryPassword: T.string.isRequired
  }

  render() {
    const {
      isLoggedIn, isAdmin, isProvider, setGlobalColors, globalColors, subscription, temporaryPassword
    } = this.props

    const routeProps = {
      isLoggedIn, subscription, isAdmin,
      isProvider, setGlobalColors, temporaryPassword,
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
        <PlainRoute path='/student' exact
          redirectIfMobile
          component={ StudentOnboarding }
        />
        <PlainRoute path='/about' exact component={ Landing } />
        <PlainRoute path='/login' exact component={ LoginOrRegister } />
        <PlainRoute path='/register' exact component={ LoginOrRegister } />
        <PlainRoute path='/provider/login' exact component={ ProviderLoginOrRegister } />
        <PlainRoute path='/provider/register' exact component={ ProviderLoginOrRegister } />
        <PlainRoute path='/signout' exact component={ SignOut } />
        <PlainRoute path='/python' exact component={ StandaloneEditor } />
        <PlainRoute path='/email-verification' exact component={ EmailVerification } />
        <PlainRoute path='/terms' exact component={ Terms } />
        <PlainRoute path='/privacy' exact component={ PrivacyPolicy } />
        {/* ----------------- */}
        {/* Logged in routes  */}
        {/* ----------------- */}
        <AuthenticatedRoute exact redirectIfMobile
          path='/invalid-subscription' component={ InvalidSubscription } { ...routeProps }
        />
        <AuthenticatedRoute exact redirectIfMobile
          path='/projects' component={ UserProjects } { ...routeProps }
        />
        <AuthenticatedRoute exact redirectIfMobile
          path='/project/new' component={ UserProject } { ...routeProps }
        />
        <AuthenticatedRoute exact redirectIfMobile
          path='/project/:id' component={ UserProject } { ...routeProps }
        />
        <SubscriptionRoute exact redirectIfMobile
          path='/lessons' component={ LessonMap }
          { ...routeProps }
        />
        <AuthenticatedRoute exact redirectIfMobile
          path='/lessons/beta' component={ BetaLessons } { ...routeProps }
        />
        <AuthenticatedRoute exact redirectIfMobile showMiddleSection={ false }
          breadcrumbLink='/lessons'
          path='/lessons/:id' component={ UserLessonWizard } { ...routeProps }
        />
        {/* ----------------- */}
        {/* Admin-only routes */}
        {/* ----------------- */}
        <AuthorizedRoute exact
          path='/admin/lessons' component={ ManageLessons } { ...routeProps }
        />

        <AuthorizedRoute exact
          path='/admin/lessons/new' component={ AddOrEditLesson } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/lessons/:id' component={ AddOrEditLesson } { ...routeProps }
        />

        <AuthorizedRoute exact
          path='/admin/variables' component={ ManageVariables } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/variables/new' component={ AddOrEditVariable } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/variables/:id' component={ AddOrEditVariable } { ...routeProps }
        />

        <AuthorizedRoute exact
          path='/admin/subscriptions' component={ ManageSubscriptions } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/subscriptions/new' component={ AddOrEditSubscription } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/subscriptions/:id' component={ AddOrEditSubscription } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/admin/signups' component={ Signups } { ...routeProps }
        />
        {/* ----------------- */}
        {/* Provider routes */}
        {/* ----------------- */}
        <AuthorizedRoute exact
          path='/provider/account' component={ ProviderDashboard } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/provider/subscriptions/new' component={ ProviderDashboard } { ...routeProps }
        />
        <AuthorizedRoute exact
          path='/provider/subscriptions/:id' component={ ProviderDashboard } { ...routeProps }
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
    auth: { isLoggedIn, isAdmin, isProvider, subscription, temporaryPassword },
    globalColors,
  } = state


  return {
    isLoggedIn
    , subscription
    , isAdmin
    , isProvider
    , globalColors
    , temporaryPassword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , setGlobalColors: params => dispatch(setGlobalColors(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))

