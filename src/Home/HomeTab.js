import React, { Component } from 'react'
import * as T from 'prop-types'
import Add from 'material-ui-icons/Add'
import Extension from 'material-ui-icons/Extension'
import LaptopMac from 'material-ui-icons/LaptopMac'
import MonetizationOn from 'material-ui-icons/MonetizationOn'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import { styles as sharedStyles } from './sharedStyles'
import ContactForm from './ContactForm'

import '../close.css'
import './overrides.css'

const laptopImageUrl = 'http://res.cloudinary.com/kiwi-stage/image/upload/v1516730490/landing-mock_1_yldeln.png'

const styles = {
  homeContentContainer: {
    width: '100%'
    , backgroundColor: '#3E2E61'
    , color: '#FFFFFF'
    , fontFamily: 'Arvo'
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
    , zIndex: 20
  },
  homePageThree: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
    , backgroundColor: '#765C9F'
    , marginTop: '-2vw'
  },
  salesBox: {
    backgroundColor: '#FFFFFF'
    , position: 'relative'
    , left: '50%'
    , width: '80%'
    , height: '100vh'
    , marginLeft: '-40%'
    , color: '#2F2864'
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
    , paddingTop: '10%'
    , paddingBottom: '2.5%'
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
    , width: '30vw'
    , height: 'calc(30vw * 0.736667)' // maintains aspect ratio
    , marginLeft: '5vw'
    , marginTop: '20px'
  },
  bulletPoints: {
    position: 'relative'
    , top: 'calc(-30vw * 0.736667)'
    , left: '55vw'
    , width: '30vw'
    , marginLeft: '-10vw'
    , height: 'calc(44.2vw)'
  },
  bulletPointContainer: {
    width: '100%'
    , marginTop: '1vw'
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
    , paddingBottom: '2px'
  },
  loginButtonContainer: {
    position: 'absolute'
    , top: '20px'
    , right: '0'
    , width: '60px'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '15px'
    , zIndex: 20
  },
  loginButton: {
    borderBottom: '2px #FFFFFF solid'
    , paddingBottom: '3px'
    , cursor: 'pointer'
    , fontSize: '16pt'
  },
  learnMore: {
    cursor: 'pointer'
    , fontWeight: 'bold'
    , fontSize: 'calc(12pt + 0.4vw)'
    , position: 'absolute'
    , width: '200px'
    , bottom: 0
    , left: '50%'
    , marginLeft: '-100px'
    , zIndex: 1000
    , textAlign: 'center'
  },
  learnMoreArrow: {
    height: '4vw'
    , width: '4vw'
  }
}

export default class HomeTab extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    openDrawer: T.func
    , scrollTo: T.func
    , handleMessageSubmit: T.func
  }

  render() {
    return (
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
            <span style={ styles.titleStyle }>start your coding<br />adventure today.</span>
            <div style={ sharedStyles.buttonContainer }>
              <div
                className='greenButton hvr-grow'
                onClick={ this.props.openDrawer }
              >
                Let's go!
              </div>
            </div>
          </div>

          <div
            style={ styles.learnMore }
            className='hvr-wobble-vertical'
            onClick={ () => this.props.scrollTo(window.innerHeight) }
          >
            <div>Learn More</div>
            <KeyboardArrowDown
              color='#9AC045'
              style={ styles.learnMoreArrow }
            />
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

            <div
              style={ styles.learnMore }
              className='hvr-wobble-vertical'
              onClick={ () => this.props.scrollTo(window.innerHeight * 2) }
            >
              <div>Get in touch</div>
              <KeyboardArrowDown
                color='#9AC045'
                style={ styles.learnMoreArrow }
              />
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
            onSubmit={ this.props.handleMessageSubmit }
          />
        </div>

        <div style={ styles.loginButtonContainer } >
          <span
            onClick={ this.props.openDrawer }
            style={ styles.loginButton }
          >
            log in
          </span>
        </div>



      </div>
    )
  }
}
