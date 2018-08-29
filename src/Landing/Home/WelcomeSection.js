import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { animateScroll as scroll } from 'react-scroll'

const scrollTo = to => scroll.scrollTo(to)

import DynamicCTA from './DynamicCTA/DynamicCTA'

const styles = theme => ({
  homePageOne: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
    , backgroundColor: '#F1F9F3'
    , backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1535579992/Green_Man_wwftpu.svg)'
    , backgroundPosition: '80% bottom'
    , backgroundRepeat: 'no-repeat'
    , backgroundSize: '35%',
    [theme.breakpoints.down('sm')]: {
      backgroundPosition: 'center bottom'
      , backgroundRepeat: 'no-repeat'
      , backgroundSize: 'auto 40%',
    }
  },
  titleContainer: {
    textAlign: 'center'
    , position: 'absolute'
    , top: '35%'
    , width: '100%'
  },
  titleStyle: {
    fontSize: 'calc(10px + 3.6vw)'
    , fontWeight: 'bold'
    , borderBottom: '3px #9AC045 solid'
    , paddingBottom: '2px'
  }
})

class WelcomeSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
      <div key='homePageOne' className={ classes.homePageOne }>
        <DynamicCTA
          text='Learn the Hard Parts of Coding.'
          subtext='Prepare your middle schooler for the digital world.'
          fixPoint={ 2.32 }
          onSignUpClick={ this.props.openModal }
          onLearnMoreClick={ () => scrollTo(window.innerHeight - 60) }
        />

      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WelcomeSection)