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
    this.setState({ recoveryCode: success.recoveryCode })

  handleSubmit = async (v) => {
    const { activeSlideIndex: i, recoveryCode } = this.state
    const actionType = slides[i].action
    const params = { ...v }
    if(recoveryCode) params.recoveryCode = recoveryCode
    if(actionType) {
      const success = await this.props[actionType](params)
      const successHandlerType = slides[i].handleSuccessMethod
      if(successHandlerType) {
        this[successHandlerType](success)
      }
    }
    if(slides.length - 1 === i) {
      this.props.history.push("/lessons")
    }
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })

  render() {
    const { activeSlideIndex } = this.state
    console.log(this.state.recoveryCode)
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