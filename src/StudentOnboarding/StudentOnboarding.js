import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { SubmissionError } from 'redux-form'

import slides from './slides'
import './slides/slideImages' // preloads
import { closeModal, login, putProfile, getProfileDetails, changePassword } from '../actions'
import withoutMainNavigation from '../hocs/withoutMainNavigation'

import StudentOnboardingForm from './StudentOnboardingForm'

class StudentOnboarding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , submittedLogin: false
    }
  }

  static propTypes = {
    closeTopBar: T.func.isRequired,
    openTopBar: T.func.isRequired,
    closeModal: T.func.isRequired,
    getProfileDetails: T.func.isRequired,
    changePassword: T.func.isRequired,
    isLoggedIn: T.bool.isRequired,
    profile: T.object.isRequired,
    isProvider: T.bool.isRequired,
    history: T.object.isRequired,
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.setState({ activeSlideIndex: 1 })
      this.props.getProfileDetails({
        userId: this.props.userId
      })
    }
    if (this.props.isProvider) {
      // providers should not come here.
      this.props.history.push('/provider/dashboard')
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.submittedLogin !== this.state.submittedLogin) {
      nextProps.getProfileDetails({ userId: nextProps.userId })
    }
  }

  onFinalSlideSubmit = () => {
    this.props.history.push('/lessons')
  }

  goBack = () => {
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })
  }

  onLoginSubmit = async v => {
    const { login } = this.props
    const { username, tempPassword } = v
    try {
      await login({ username, password: tempPassword })
      this.setState({ submittedLogin: true })
    } catch(e) {
      console.error(e)
      if (JSON.stringify(e).includes('invalid_grant')) {
        throw { message: `That's the wrong username or password! If you're unsure, try again or ask your parent!.` }
      }
      throw e
    }
  }

  onChangeUsernameSubmit = async v => {
    const { putProfile, userId, profile } = this.props
    const { newUsername } = v
    try {
      await putProfile({ _id: userId, username: newUsername, v: profile.v })
    } catch(e) {
      console.error(e)
      if (JSON.stringify(e).toLocaleLowerCase().includes('specified new email')) {
        throw { message: 'That username is taken!' }
      }
      throw e
    }
  }

  onChangePasswordSubmit = async v => {
    const { changePassword, userId, profile } = this.props
    const { newPassword } = v
    // set new password
    await changePassword({
      _id: userId,
      currentPassword: profile.temporaryPassword,
      newPassword
    })
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
        goBack={ this.goBack }
        activeSlideIndex={ activeSlideIndex }
      />
    )
  }
}


const mapStateToProps = (state) => {
  const { auth: { userId, isLoggedIn, isProvider }, profiles: { profilesById } } = state
  const profile = profilesById[userId]

  return {
    userId,
    profile,
    isLoggedIn,
    isProvider
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
