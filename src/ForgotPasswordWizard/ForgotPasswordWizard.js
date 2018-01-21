import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Transition from 'react-transition-group'

import { checkPasswordRecoveryCorrectness, openSideNav, closeSideNav, openTopBar, closeTopBar } from '../actions'
import ForgotPasswordWizardForm, { slides } from './ForgotPasswordWizardForm'

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

class ForgotPasswordWizard extends Component {
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
    const { userId } = this.props
    const actionType = slides[this.state.activeSlideIndex].action
    if(actionType) {
      const params = {
        userId
        , ...v
      }
      return await this.props[actionType](params)
    }
    this.props.history.push("/lessons")
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

const mapStateToProps = (state) => {
  const { auth: { userId } } = state

  return {
    userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
    , checkPasswordRecoveryCorrectness: params => dispatch(checkPasswordRecoveryCorrectness(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordWizard))