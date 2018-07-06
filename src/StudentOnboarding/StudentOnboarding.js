import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeSideNav, closeTopBar, openSideNav, openTopBar, putProfile } from '../actions'
import withRouter from 'react-router-dom/withRouter'
import { SubmissionError } from 'redux-form'

import StudentOnboardingForm from './StudentOnboardingForm'

class StudentOnboarding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
    }
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  handleSubmit = async v => {
    const { activeSlideIndex } = this.state
    const actionName = `slide${activeSlideIndex}Submit`
    try {
      if (this[actionName]) {
        const result = await this[actionName](v)
      }
      this.goToNextSlide()
    } catch(err) {
      console.log(err)
      throw new SubmissionError({ _error: err.message })
    }
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })

  render() {
    const { activeSlideIndex } = this.state
    return (
      <StudentOnboardingForm
        onSubmit={ this.handleSubmit }
        activeSlideIndex={ activeSlideIndex }
      />
    )
  }
}


const mapStateToProps = (state) => {
  const { } = state

  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putProfile: params => dispatch(putProfile(params))
    , openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentOnboarding))
