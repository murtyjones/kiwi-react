import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'


import { openSideNav, closeSideNav, openTopBar, closeTopBar } from '../actions'

const styles = theme => ({
  container: {
    textAlign: 'center'
  },
  carl: {
    display: 'block',
    width: '20%',
    margin: '10% auto',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      height: '100vh',
      margin: 0,
      verticalAlign: 'top'
    }
  },
  message: {
    display: 'block',
    margin: '10% auto',
    padding: '0 5%',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      height: '100vh',
      margin: 0
    }
  },
  h1: {
    [theme.breakpoints.up('md')]: {
      marginTop: '40%'
    }
  }
})

class InvalidSubscription extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
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

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.container }>
        <img
          className={ classes.carl }
          src='http://res.cloudinary.com/kiwi-prod/image/upload/v1529182059/sad_carl_uppk8x.svg'
        />
        <div className={ classes.message }>
          <h1 className={ classes.h1 }>Whoops!</h1>
          <h2>Looks like your subscription is invalid.</h2>
          <h4>Please tell the owner of your account to restart your subscription and make Carl smile again!</h4>
        </div>
      </div>
    )
  }
}

export const InvalidSubscriptionComponent = InvalidSubscription


const mapStateToProps = (state) => {
  const { auth: { isLoggedIn, subscription } } = state

  return {
    isLoggedIn
    , subscription
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(InvalidSubscription)
))
