import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import NextArrow from './NextArrow'
import DynamicCTA from './DynamicCTA/DynamicCTA'

const styles = theme => ({
  homePageOne: {
    height: '100vh'
    , width: '100%'
    , position: 'relative'
    , overflow: 'hidden'
    , backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1533305498/Landing%20Page/Landing_Page_Final_v3.svg)'
    , backgroundPosition: 'center bottom'
    , backgroundRepeat: 'no-repeat'
    , backgroundSize: '100%'
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
          text='start your coding adventure today.'
          smallText='start coding today.'
          fixPoint={ 2.32 }
          onClick={ this.props.openModal }
        />

        <NextArrow
          to={ window.innerHeight - 60 }
          textColor='#FFFFFF'
        />

      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(WelcomeSection)