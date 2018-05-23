import React, { Component } from 'react'
import ContactForm from '../ContactForm'

const styles = {
  homePageThree: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
    , backgroundColor: '#765C9F'
    , marginTop: '-2vw'
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

export default class ContactSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
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
    )
  }
}
