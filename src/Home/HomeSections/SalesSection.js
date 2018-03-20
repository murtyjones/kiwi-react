import React, { Component } from 'react'
import Extension from 'material-ui-icons/Extension'
import LaptopMac from 'material-ui-icons/LaptopMac'
import MonetizationOn from 'material-ui-icons/MonetizationOn'
import Add from 'material-ui-icons/Add'
import NextArrow from './NextArrow'

const laptopImageUrl = 'http://res.cloudinary.com/kiwi-stage/image/upload/v1516730490/landing-mock_1_yldeln.png'

const styles = {
  homePageTwo: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
    , zIndex: 20
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
    , fontSize: 'calc(10px + 1vw)'
    , fontWeight: 'bold'
    , width: 'calc(100% - 10px - 2vw)'
  },
  sellingPointIconColor: '#93B846',
  bulletPointIconColor: '#93B846'
}

export default class SalesSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
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

          <NextArrow
            to={ window.innerHeight * 2 }
            text='Get In Touch'
            textColor='#624F8F'
          />

        </div>
      </div>
    )
  }
}
