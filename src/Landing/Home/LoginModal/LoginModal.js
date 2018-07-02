import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import has from 'lodash/has'

import { getError, genericLoginFailure } from '../../../utils/httpErrorUtils'

import LoginModalForm from './LoginModalForm'
import ProviderRegisterModal from '../ProviderRegisterModal/ProviderRegisterModal'
import {
  login, register, resetPasswordRequest, openModal, closeModal
} from '../../../actions'
import { choosePathSlide, studentSlides, providerSlides } from './slides'

import '../../../close.css'

const styles = theme => ({
  root: {
    height: '100%',
    minHeight: '400px'
  },
  leftSide: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px',
    borderRight: '1px solid #CCC'
  }
})


class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , isStudentSignIn: true
    }
  }

  static propTypes = {
    register: T.func.isRequired
    , login: T.func.isRequired
    , resetPasswordRequest: T.func.isRequired
    , openModal: T.func.isRequired
    , closeModal: T.func.isRequired
  }

  // choose type
  slide0Submit = async isStudentSignIn => {
    this.setState({ isStudentSignIn })
  }

  // log in
  slide1Submit = async params => {
    const { isStudentSignIn } = this.state
    if (params.redirectToProviderSignUp) {
      this.props.history.push('/onboarding')
      return this.props.openModal({
        className: 'providerRegisterModal',
        children: (
          <ProviderRegisterModal
            fromLogin={ true }
            wasStudentSignIn={ isStudentSignIn }
          />
        )
      })
    }
    await this.props.login(params)
    const pushPath = this.state.isStudentSignIn
      ? '/lessons'
      : '/provider/dashboard'
    this.props.closeModal()
    this.props.history.push(pushPath)
  }

  // send reset password email
  slide2Submit = async resetPasswordRequest => {
    await this.props.resetPasswordRequest(resetPasswordRequest)
  }

  handleSubmit = async v => {
    const { activeSlideIndex, isStudentSignIn } = this.state
    const slide = (
      isStudentSignIn ? studentSlides : providerSlides
    )[activeSlideIndex]
    const action = this[`slide${activeSlideIndex}Submit`]
    try {
      if (action) {
        const result = await action(v)
      }
      if (has(slide, 'progress') && !slide.progress) {
        return
      }
      this.goToNextSlide()
    } catch(err) {
      console.log(err)
      throw new SubmissionError({ _error: genericLoginFailure(getError(err)) })
    }
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })

  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })

  goToSlide = i =>
    this.setState({ activeSlideIndex: i })

  render() {
    const { classes, switchModals } = this.props
    const { activeSlideIndex, isStudentSignIn } = this.state

    const slide = activeSlideIndex === 0
      ? choosePathSlide
      : isStudentSignIn
      ? studentSlides[activeSlideIndex]
      : providerSlides[activeSlideIndex]

    return (
      <Grid container className={ classes.root }>
        { activeSlideIndex > 0 &&
          <Grid item
            sm={ 5 }
            className={ classes.leftSide }
            style={ {
              display: activeSlideIndex > 0 ? 'inline-block' : 'none',
              backgroundImage: isStudentSignIn
                ? 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/KidCarl_xly3ot.svg)'
                : 'url(http://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/PapaCarl_cehuft.svg)'
            } }
          />
        }
        <Grid item xs={ 12 }
          sm={ activeSlideIndex > 0 ? 7 : 12 }
          className='loginModalFormContainer'
        >
          <LoginModalForm
            onSubmit={ this.handleSubmit }
            slide={ slide }
            activeSlideIndex={ activeSlideIndex }
            goToPrevSlide={ this.goToPrevSlide }
            goToNextSlide={ this.goToNextSlide }
            goToSlide={ this.goToSlide }
            switchModals={ switchModals }
          />
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: params => dispatch(register(params))
    , login: params => dispatch(login(params))
    , resetPasswordRequest: params => dispatch(resetPasswordRequest(params))
    , openModal: params => dispatch(openModal(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

LoginModal = withStyles(styles, { withTheme: true })(LoginModal)

export default withRouter(connect(null, mapDispatchToProps)(LoginModal))
