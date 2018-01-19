import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { openSideNav, closeSideNav, openTopBar, closeTopBar, signout, login } from '../actions'

import WelcomeWizardForm from './WelcomeWizardForm'

const styles = {
  container: {
    width: '100%'
    , height: '100%'
    , position: 'relative'
    , backgroundColor: '#765C9F'
  },
  imageContainer: {
    position: 'absolute'
    , height: '500px'
    , width: '520px'
    , top: '50%'
    , left: '50%'
    , marginTop: '-250px'
    , marginLeft: '-250px'
  },
  image: {
    width: '90px'
    , padding: '30px'
    , backgroundColor: '#FFFFFF'
    , margin: '10px'
    , borderRadius: '5px'
  }
}

class WelcomeWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
    }
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

  handleSubmit = (v) => {
    //this.props.updateUserProfile({})
  }

  goToNextSlide = () => {
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })
  }

  goToPrevSlide = () => {
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })
  }

  render() {
    const { activeSlideIndex } = this.state
    return (
      <WelcomeWizardForm
        activeSlideIndex={ activeSlideIndex }
        onSubmit={ this.handleSubmit }
        goToPrevSlide={ this.goToPrevSlide }
        goToNextSlide={ this.goToNextSlide }
      />
    )
  }
}


export const WelcomeWizardComponent = WelcomeWizard


const mapDispatchToProps = (dispatch) => {
  return {
    openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(WelcomeWizard))