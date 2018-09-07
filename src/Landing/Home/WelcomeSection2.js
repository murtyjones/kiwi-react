import React, { Component } from 'react'
import * as T from 'prop-types'
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
    , backgroundColor: '#F2F2F2'
    // }
  },
  background: {
    height: '100vh'
    , width: '100vw'
    , opacity: 0.3
    , backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1536266320/Landing%20Page/mom_and_son.png)'
    , backgroundPosition: 'center'
    , backgroundRepeat: 'no-repeat'
    , backgroundSize: 'cover'
    , position: 'absolute'
    , top: 0
    , left: 0
    , zIndex: 50
  },
  image: {
    minHeight: '100vh'
    , minWidth: '100vw'
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

class WelcomeSection2 extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    classes: T.object,
    openModal: T.func
  }

  render() {
    const { classes } = this.props
    return (
      <div key='homePageOne' className={ classes.homePageOne }>
        <DynamicCTA
          text={ `Learn the Hard Parts <nobr>of Coding.</nobr>` }
          subtext={
            `Master the basics of programming language through guided lessons and projects. Explore and create with Kiwi! <nobr>Ages 10+</nobr>`
          }
          onSignUpClick={ this.props.openModal }
          onLearnMoreClick={ () => scrollTo(window.innerHeight - 60) }
        />
        <div className={ classes.background } />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WelcomeSection2)