import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Transition from 'react-transition-group'

import { openSideNav, closeSideNav, openTopBar, closeTopBar, upsertPasswordRecoveryImages, signout, login } from '../actions'
import WelcomeWizardForm from './WelcomeWizardForm'

import slides from './slides'

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

  handleSubmit = async (v) => {
    const { username } = this.props
    const actionType = slides[this.state.activeSlideIndex].action
    if(actionType) {
      const params = { username, ...v }
      return await this.props[actionType](params)
    }
    if(slides.length - 1 === this.state.activeSlideIndex) {
      this.props.history.push("/lessons")
    }
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })


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

const mapStateToProps = (state) => {
  const { auth: { username } } = state

  return {
    username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
    , upsertPasswordRecoveryImages: params => dispatch(upsertPasswordRecoveryImages(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeWizard))