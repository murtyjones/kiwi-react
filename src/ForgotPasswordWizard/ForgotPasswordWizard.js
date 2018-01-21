import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Transition from 'react-transition-group'

import { checkPasswordRecoveryCorrectness, resetPassword, openSideNav, closeSideNav, openTopBar, closeTopBar } from '../actions'
import ForgotPasswordWizardForm  from './ForgotPasswordWizardForm'
import slides from './slides'

class ForgotPasswordWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , recoveryCode: '' 
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

  saveRecoveryCode = success =>
    this.setState({ recoveryCode: params.recoveryCode })

  handleSubmit = async (v) => {
    const actionType = slides[this.state.activeSlideIndex].action
    const successHandlerType = slides[this.state.activeSlideIndex].handleSuccessMethod
    const { recoveryCode } = this.state
    const params = { ...v }
    if(recoveryCode) params.recoveryCode = recoveryCode
    if(actionType) {
      const success = await this.props[actionType](v)
      if(successHandlerType) {
        this[successHandlerType](success)
      }
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
      <ForgotPasswordWizardForm
        activeSlideIndex={ activeSlideIndex }
        onSubmit={ this.handleSubmit }
        goToPrevSlide={ this.goToPrevSlide }
        goToNextSlide={ this.goToNextSlide }
      />
    )
  }
}


export const ForgotPasswordWizardComponent = ForgotPasswordWizard

const mapDispatchToProps = (dispatch) => {
  return {
    openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
    , checkPasswordRecoveryCorrectness: params => dispatch(checkPasswordRecoveryCorrectness(params))
    , resetPassword: params => dispatch(resetPassword(params))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ForgotPasswordWizard))