import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { GridList, GridTile } from 'material-ui'
import { Drawer, Menu, MenuItem, Subheader, Divider } from 'material-ui'
import CropSquare from 'material-ui-icons/CropSquare'
import Add from 'material-ui-icons/Add'
import Extension from 'material-ui-icons/Extension'
import LaptopMac from 'material-ui-icons/LaptopMac'
import MonetizationOn from 'material-ui-icons/MonetizationOn'


import { openSideNav, closeSideNav, openTopBar, closeTopBar, signout, login, postMessage } from '../actions'
import { ApiFetch } from '../utils/ApiFetch'
import LoginOrRegister from './LoginOrRegister'
import isMobile from '../utils/userAgentUtils'
import ContactForm from './ContactForm'

import '../close.css'
import './overrides.css'

const laptopImageUrl = 'http://res.cloudinary.com/kiwi-stage/image/upload/v1516730490/landing-mock_1_yldeln.png'

const styles = {
  homeContentContainer: {
    width: '100%'
    , backgroundColor: '#3E2E61'
    , color: '#FFFFFF'
    , fontFamily: 'Trebuchet MS'
    , position: 'relative' // needed for abs children
  },
  homePageOne: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
  },
  homePageTwo: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
  },
  homePageThree: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
    , backgroundColor: '#5D4781'
  },
  salesBox: {
    backgroundColor: '#FFFFFF'
    , position: 'relative'
    , left: '50%'
    , width: '80%'
    , marginLeft: '-40%'
    , color: '#2F2864'
    , fontFamily: 'Palatino'
    , paddingTop: '20px'
  },
  salesH1: {
    textAlign: 'center'
    , fontSize: 'calc(10px + 2.3vw)'
    , fontWeight: 'bold'
    , padding: '0 20%'
  },
  questionsTitle: {
    textAlign: 'center'
    , fontSize: 'calc(10px + 1vw)'
    , fontWeight: 'bold'
    , color: '#3E2E61'
    , paddingTop: '20%'
    , paddingBottom: '2.5%'
    , fontFamily: 'Palatino'
    , textTransform: 'uppercase'
  },
  questionsSubtitle: {
    textAlign: 'center'
    , fontSize: 'calc(10px + 2.3vw)'
    , fontWeight: 'bold'
    , color: '#FFFFFF'
    , margin: 0
    , paddingBottom: '2.5%'
  },
  sellingPointContainer: {
    margin: '20px 0'
    , position: 'relative'
  },
  sellingPointHeader: {
    textAlign: 'center'
    , paddingTop: '8vw' // padding for sellingPointIcon
    , fontSize: 'calc(10px + 1.3vw)'
    , fontWeight: 'bold'
  },
  sellingPointBody: {
    textAlign: 'center'
    , fontSize: 'calc(10px + 0.4vw)'
    //, color: '#818181'
    // , fontFamily: 'helvetica'
  },
  sellingPointIcon: {
    height: '8vw'
    , width: '8vw'
    , position: 'absolute'
    , left: '50%'
    , marginLeft: '-4vw'
  },
  laptopImage: {
    backgroundImage: `url(${laptopImageUrl})`
    , backgroundSize: '100% 100%'
    , width: '65vw'
    , height: 'calc(65vw * 0.736667)' // maintains aspect ratio
    , marginLeft: '-5vw'
    , marginTop: '20px'
  },
  bulletPoints: {
    position: 'relative'
    , top: 'calc(-65vw * 0.736667)'
    , left: '55vw'
    , width: '30vw'
    , marginLeft: '-10vw'
    , height: 'calc(44.2vw)'
  },
  bulletPointContainer: {
    width: '100%'
    , marginTop: '40px'
  },
  bulletPointIcon: {
    display: 'inline-block'
    , height: 'calc(10px + 0.5vw)'
    , width: 'calc(10px + 0.5vw)'
    , verticalAlign: 'top'
    , marginTop: '5px'
    , marginRight: '5px'
  },
  bulletPointText: {
    display: 'inline-block'
    , fontSize: 'calc(10px + 1.3vw)'
    , fontWeight: 'bold'
    , width: 'calc(100% - 10px - 2vw)'
  },
  sellingPointIconColor: '#93B846',
  bulletPointIconColor: '#93B846',
  titleContainer: {
    textAlign: 'left'
    , position: 'absolute'
    , top: '35%'
    , left: '15%'
    , zIndex: 20
  },
  titleStyle: {
    fontSize: 'calc(10px + 3.6vw)'
    , fontWeight: 'bold'
    , borderBottom: '3px #9AC045 solid'
  },
  loginButtonContainer: {
    position: 'absolute'
    , top: '20px'
    , right: '0'
    , width: '50px'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '15px'
    , zIndex: 20
  },
  loginButton: {
    borderBottom: '2px #FFFFFF solid'
    , paddingBottom: '3px'
    , cursor: 'pointer'
  },
  closeDrawerButton: {
    marginTop: '10px'
    , marginRight: '10px'
  },
  loginDrawer: {
    backgroundColor: '#765C9F'
  },
  loginDrawerWidth: 400 // px
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

  openDrawer = () => {
    this.setState({ drawerIsOpen: true })
  }

  closeDrawer = () => {
    this.setState({ drawerIsOpen: false })
  }

  handleMessageSubmit = (params) => {
    console.log('here')
    this.props.postMessage(params)
  }

  render() {
    const { drawerIsOpen } = this.state

    return [
      <div key='homeContent' style={ styles.homeContentContainer }>

        <div key='homePageOne' style={ styles.homePageOne }>
          <img
            key='homeLogo'
            className='homeLogo'
            src='../../assets/images/landing-logo.svg'
          />

          <img
            key='homeDragon'
            className='homeDragon'
            src='../../assets/images/landing-bg_dragon.svg'
          />

          <img
            key='homeBackgroundLayer1'
            className='homeBackgroundLayer1'
            src='../../assets/images/landing-bg_01.svg'
          />

          <img
            key='homeBackgroundLayer2'
            className='homeBackgroundLayer2'
            src='../../assets/images/landing-bg_02.svg'
          />

          <img
            key='homeBackgroundLayer3'
            className='homeBackgroundLayer3'
            src='../../assets/images/landing-bg_03.svg'
          />

          <img
            key='homeBackgroundLayer4'
            className='homeBackgroundLayer4'
            src='../../assets/images/landing-bg_04.svg'
          />
          <div style={ styles.titleContainer } >
            <span style={ styles.titleStyle }>Start your coding<br />adventure today</span>
          </div>
        </div>

        <div key='homePageTwo' style={ styles.homePageTwo }>
          <div key='salesBox' style={ styles.salesBox }>
            <h1 style={ styles.salesH1 }>
              The Path to Python: Every kid needs the opportunity to code.
            </h1>

            <div className='sellingPointContainer' style={ styles.sellingPointContainer }>
              <Extension
                className='sellingPointIcon'
                style={ styles.sellingPointIcon }
                color={ styles.sellingPointIconColor }
              />
              <div style={ styles.sellingPointHeader }>Kid-Friendly</div>
              <div style={ styles.sellingPointBody }>to make coding simple</div>
            </div>

            <div className='sellingPointContainer' style={ styles.sellingPointContainer }>
              <LaptopMac
                className='sellingPointIcon'
                style={ styles.sellingPointIcon }
                color={ styles.sellingPointIconColor }
              />
              <div style={ styles.sellingPointHeader }>Accessible</div>
              <div style={ styles.sellingPointBody }>from any computer</div>
            </div>

            <div className='sellingPointContainer' style={ styles.sellingPointContainer }>
              <MonetizationOn
                style={ styles.sellingPointIcon }
                color={ styles.sellingPointIconColor }
              />
              <div style={ styles.sellingPointHeader }>Free</div>
              <div style={ styles.sellingPointBody }>for all kids</div>
            </div>

            <div style={ styles.laptopImage } />

            <div className='bulletPoints' style={ styles.bulletPoints }>

              <div style={ styles.bulletPointContainer }>
                <Add
                  viewBox='9 9 6 6'
                  style={ styles.bulletPointIcon }
                  color={ styles.bulletPointIconColor }
                />
                <div style={ styles.bulletPointText }>
                  Start your student with foundational coding concepts
                </div>
              </div>

              <div style={ styles.bulletPointContainer }>
                <Add
                  viewBox='9 9 6 6'
                  style={ styles.bulletPointIcon }
                  color={ styles.bulletPointIconColor }
                />
                <div style={ styles.bulletPointText }>
                  All concepts and lessons geared towards middle school
                </div>
              </div>

              <div style={ styles.bulletPointContainer }>
                <Add
                  viewBox='9 9 6 6'
                  style={ styles.bulletPointIcon }
                  color={ styles.bulletPointIconColor }
                />
                <div style={ styles.bulletPointText }>
                  Includes independent projects to practice coding concepts
                </div>
              </div>

            </div>

          </div>
        </div>

        <div className='homePageThree' style={ styles.homePageThree }>
          <h1 style={ styles.questionsTitle }>
            Questions?
          </h1>
          <h2 style={ styles.questionsSubtitle }>
            We want to hear from you!
          </h2>
          <ContactForm
            onSubmit={ this.handleMessageSubmit }
          />
        </div>

        <div style={ styles.loginButtonContainer } >
          <span
            onClick={ this.openDrawer }
            style={ styles.loginButton }
          >
            log in
          </span>
        </div>


        
      </div>
      ,
      <Drawer
        key='loginDrawer'
        containerClassName='loginDrawer'
        containerStyle={ styles.loginDrawer }
        width={ isMobile() ? '100%' : styles.loginDrawerWidth }
        open={ drawerIsOpen }
        openSecondary={ true }
      >
        <div
          onClick={ this.closeDrawer }
          className='x'
          style={ styles.closeDrawerButton }
        />
        <LoginOrRegister />
      </Drawer>
    ]
  }
}

export const HomeComponent = Home


const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , login: params => dispatch(login(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
    , postMessage: params => dispatch(postMessage(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Home))
