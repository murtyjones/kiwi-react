import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { GridList, GridTile } from 'material-ui'
import { Drawer, Menu, MenuItem, Subheader, Divider } from 'material-ui'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'


import { openSideNav, closeSideNav, openTopBar, closeTopBar, signout, login } from '../actions/index'
import { ApiFetch } from '../utils/ApiFetch'
import LoginOrRegister from './LoginOrRegister'


import '../close.css'

const styles = {
  container: {
    width: '100%'
    , height: '100%'
    , backgroundColor: '#2E2860'
    , color: '#FFFFFF'
    , fontFamily: 'Trebuchet MS'
  },
  gridlist: {
    width: '100%'
    , height: '100vh'
  },
  titleStyle: {
    display: 'block'
    , width: '100%'
    , position: 'absolute'
    , top: '35%'
    , fontWeight: 'bold'
    , fontSize: '5.5vw'
    , textAlign: 'center'
  },
  subTitleStyle: {
    display: 'block'
    , width: '100%'
    , textAlign: 'center'
  },
  titleTileStyle: {
    textAlign: 'center'
    , minHeight: '300px'
    , height: '100%'
  },
  downArrow: {
    color: '#FFFFFF'
    , display: 'inline-block'
    , margin: '0 auto'
  },
  bottomCTAContainer: {
    height: '50px'
    , position: 'absolute'
    , bottom: '0'
    , textAlign: 'center'
    , width: '100%'
  },
  bottomCTA: {
    cursor: 'pointer'
    , width: '256px'
    , height: '100%'
    , margin: '0 auto'
  },
  loginContainer: {
    position: 'absolute'
    , top: '10px'
    , right: '0'
    , width: '10%'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '10px'
  },
  login: {
    borderBottom: '2px #FFFFFF solid'
    , paddingBottom: '3px'
    , cursor: 'pointer'
  },
  x: {
    marginTop: '10px'
    , marginRight: '10px'
  },
  loginDrawer: {
    backgroundColor: '#4E449A'
  },
  loginDrawerWidth: '25%'
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerIsOpen: false
    }
  }

  static propTypes = {
    openSideNav: T.func
    , closeSideNav: T.func
    , openTopBar: T.func
    , closeTopBar: T.func
    , signout: T.func
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  handleLoginSubmit = async(v) => {
    const { login } = this.props
    const { email, password } = v
    return login({ email, password })
      .then(result => {
        this.props.history.push("/lessons")
      }).catch(e => {
        if(e.description.includes('Wrong email or password.')) {
          throw new SubmissionError({ password: '', _error: 'Wrong email or password.' })
        }
      })
  }

  render() {
    const { drawerIsOpen } = this.state

    return (
      <div style={ styles.container }>
        <Drawer
          containerStyle={ styles.loginDrawer }
          width={ styles.loginDrawerWidth }
          open={ drawerIsOpen }
          openSecondary={ true }
        >
          <div
            onClick={ () => this.setState({ drawerIsOpen: false }) }
            className='x'
            style={ styles.x }
          />
          <LoginOrRegister />
        </Drawer>
        <GridList
          style={ styles.gridlist }
          cols={ 6 }
          cellHeight={ 'auto' }
        >
          <GridTile cols={ 1 } />
          <GridTile
            cols={ 4 }
            style={ styles.titleTileStyle }
          >
            <span style={ styles.titleStyle }>Start your coding<br />adventure today</span>

            {/* disabled until we have the theme stuff sorted
            <div style={ styles.bottomCTAContainer }>
              <div style={ styles.bottomCTA }>
                <span style={ styles.subTitleStyle }>Learn more</span>
                <KeyboardArrowDown
                  viewBox={ '4 4 16 16' }
                  style={ styles.downArrow }
                />
              </div>
            </div>
            */}
          </GridTile>
          <GridTile cols={ 1 } />
        </GridList>
        <div style={ styles.loginContainer } >
          <span
          onClick={ () => this.setState({ drawerIsOpen: true })}
            style={ styles.login }
          >
            log in
          </span>
        </div>

      </div>
    )
  }
}

export const HomeComponent = Home


const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , login: (params) => dispatch(login(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
