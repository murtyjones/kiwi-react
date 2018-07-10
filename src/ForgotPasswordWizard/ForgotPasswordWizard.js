import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import Transition from 'react-transition-group'

import { checkPasswordRecoveryCorrectness, resetPassword, login } from '../actions'
import ForgotPasswordWizardForm  from './ForgotPasswordWizardForm'
import slides from './slides'
import withoutMainNavigation from '../hocs/withoutMainNavigation'

class ForgotPasswordWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , recoveryCode: ''
      , attemptsRemaining: null
      , guessFailed: false
    }
  }

  handleRecoveryCheckResponse = response => {
    if(response.message.includes('fail')) {
      this.setState({
        activeSlideIndex: 1
        , attemptsRemaining: response.attemptsRemaining
        , guessFailed: true
      })
    } else {
      this.setState({
        recoveryCode: response.recoveryCode
        , guessFailed: false
      })
    }
  }

  handleResetPassword = async (response, v) => {
    try {
      const success = await this.props.login({ username: v.username, password: v.password })
      this.props.history.push("/lessons")
    } catch(e) {
      console.log(e)
    }
  }

  handleSubmit = async v => {
    const { activeSlideIndex: i, recoveryCode } = this.state
    const actionType = slides[i].action
    const params = { ...v }
    if(recoveryCode) params.recoveryCode = recoveryCode
    if(actionType) {
      const success = await this.props[actionType](params)
      const successHandlerType = slides[i].handleSuccessMethod
      if(successHandlerType) this[successHandlerType](success, v)
    }
  }

  goToNextSlide = () =>
    this.state.activeSlideIndex !== slides.length - 1 && this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.state.activeSlideIndex !== 0 && this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })

  render() {
    const { activeSlideIndex, attemptsRemaining, guessFailed } = this.state

    return (
      <ForgotPasswordWizardForm
        activeSlideIndex={ activeSlideIndex }
        onSubmit={ this.handleSubmit }
        goToPrevSlide={ this.goToPrevSlide }
        goToNextSlide={ this.goToNextSlide }
        attemptsRemaining={ attemptsRemaining }
        guessFailed={ guessFailed }
      />
    )
  }
}


export const ForgotPasswordWizardComponent = ForgotPasswordWizard

const mapDispatchToProps = (dispatch) => {
  return {
    checkPasswordRecoveryCorrectness: params => dispatch(checkPasswordRecoveryCorrectness(params))
    , resetPassword: params => dispatch(resetPassword(params))
    , login: params => dispatch(login(params))
  }
}

ForgotPasswordWizard = withoutMainNavigation(ForgotPasswordWizard)

export default withRouter(connect(null, mapDispatchToProps)(ForgotPasswordWizard))
