import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { closeModal, login, putProfile, getProfileDetails, changePassword } from '../actions'
import withRouter from 'react-router-dom/withRouter'
import { SubmissionError } from 'redux-form'
import slides from './slides'
import withoutMainNavigation from '../hocs/withoutMainNavigation'

import StudentOnboardingForm from './StudentOnboardingForm'

class StudentOnboarding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
    }
  }

  static propTypes = {
    closeSideNav: T.func.isRequired,
    closeTopBar: T.func.isRequired,
    openSideNav: T.func.isRequired,
    openTopBar: T.func.isRequired,
    closeModal: T.func.isRequired,
    getProfileDetails: T.func.isRequired,
    changePassword: T.func.isRequired,
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.userId !== this.props.userId) {
      nextProps.getProfileDetails({ userId: nextProps.userId })
    }
  }

  onFinalSlideSubmit = () => {
    this.props.closeModal()
  }

  onLoginSubmit = async v => {
    const { login } = this.props
    const { username, tempPassword } = v
    try {
      await login({ username, password: tempPassword })
    } catch(e) {
      console.error(e)
      if(JSON.stringify(e).includes('invalid_grant')) {
        throw { message: `That's the wrong username or password! If you're unsure, try again or ask your parent!.` }
      }
      throw e
    }
  }

  onChangeUsernameSubmit = async v => {
    const { putProfile, userId, profile } = this.props
    const { newUsername } = v
    await putProfile({ _id: userId, username: newUsername, v: profile.v })
  }

  onChangePasswordSubmit = async v => {
    const { changePassword, userId } = this.props
    const { newPassword, tempPassword } = v
    await changePassword({ _id: userId, currentPassword: tempPassword, newPassword })
  }

  handleSubmit = async v => {
    const { activeSlideIndex } = this.state
    const actionName = slides[activeSlideIndex].submitFunc
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
  const { auth: { userId }, profiles: { profilesById } } = state
  const profile = profilesById[userId]

  return {
    userId,
    profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putProfile: params => dispatch(putProfile(params))
    , getProfileDetails: params => dispatch(getProfileDetails(params))
    , changePassword: params => dispatch(changePassword(params))
    , login: params => dispatch(login(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

StudentOnboarding = withoutMainNavigation(StudentOnboarding)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentOnboarding))
